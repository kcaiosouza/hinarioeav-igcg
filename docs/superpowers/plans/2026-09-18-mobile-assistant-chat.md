# Mobile Hymnal AI Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Hymnal AI Assistant into the mobile app (`igcghinario`) with a SideDrawer entry, interactive chat screen (`app/assistant.tsx`), real-time streaming, clickable hymn cards, multiline textarea, session resets, and empathetic error handling, connected to the production endpoint `https://igrejaemcampinagrande.com.br/api/hinario/ask-ai`.

**Architecture:** A dedicated network client (`services/assistantService.ts`) connects to the production Vercel API supporting streaming SSE and JSON fallback. The UI is built in `app/assistant.tsx` adopting the visual design system from `hinario_chat.html` (forest green, soft gold, cream, Fraunces + Inter typography). The SideDrawer is updated with an "IA" badge item.

**Tech Stack:** React Native, Expo Router, TypeScript, Tailwind/NativeWind, `react-native-safe-area-context`, `react-native-svg`.

## Global Constraints

* **Design Palette:** Forest background (`#263a30`), surface (`#344E41`), surface raised (`#3A5A40`), soft gold (`#A3B18A`), cream (`#DAD7CD`), muted text (`#b7c2ab`), ink text (`#12201A`).
* **Typography:** `Fraunces_600SemiBold` for title, `Inter` for body and bubbles.
* **Production Endpoint:** `https://igrejaemcampinagrande.com.br/api/hinario/ask-ai`.
* **Input Bar:** Multiline `TextInput` (textarea) expanding up to 4 lines, allowing `\n` line breaks with Enter key.
* **Graceful In-Chat Errors:** Offline, rate-limit, and server issues MUST render calm in-chat bubbles, never throwing unhandled errors or raw alerts.
* **Code Cleanliness:** Run `npm run typecheck` on every task.

---

### Task 1: Assistant API Client Service

**Files:**
- Create: `services/assistantService.ts`
- Test: `scripts/test_assistant_service.js`

**Interfaces:**
- Produces:
  ```typescript
  export interface SuggestedHymn {
    id: string;
    number: number;
    title: string;
    section: string;
    similarity?: number;
    firstStanza?: string;
  }

  export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    hymns?: SuggestedHymn[];
    isStreaming?: boolean;
    isError?: boolean;
  }

  export interface AssistantHistoryItem {
    role: 'user' | 'assistant';
    content: string;
    suggestedHymnIds?: string[];
  }

  export interface SendAssistantQueryParams {
    query: string;
    sessionId: string;
    history?: AssistantHistoryItem[];
    onHymns?: (hymns: SuggestedHymn[]) => void;
    onDelta?: (delta: string) => void;
    onDone?: () => void;
    onError?: (error: Error) => void;
  }

  export function sendAssistantQuery(params: SendAssistantQueryParams): Promise<{ answer: string; hymns: SuggestedHymn[] }>;
  ```

- [ ] **Step 1: Implement `services/assistantService.ts`**

Create `services/assistantService.ts`:

```typescript
export interface SuggestedHymn {
  id: string;
  number: number;
  title: string;
  section: string;
  similarity?: number;
  firstStanza?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hymns?: SuggestedHymn[];
  isStreaming?: boolean;
  isError?: boolean;
}

export interface AssistantHistoryItem {
  role: 'user' | 'assistant';
  content: string;
  suggestedHymnIds?: string[];
}

export interface SendAssistantQueryParams {
  query: string;
  sessionId: string;
  history?: AssistantHistoryItem[];
  onHymns?: (hymns: SuggestedHymn[]) => void;
  onDelta?: (delta: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

export const ASSISTANT_API_URL = 'https://igrejaemcampinagrande.com.br/api/hinario/ask-ai';

/**
 * Sends a query to the Hymnal AI Assistant with streaming support and seamless JSON fallback.
 */
export async function sendAssistantQuery({
  query,
  sessionId,
  history = [],
  onHymns,
  onDelta,
  onDone,
  onError,
}: SendAssistantQueryParams): Promise<{ answer: string; hymns: SuggestedHymn[] }> {
  try {
    const response = await fetch(ASSISTANT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream, application/json',
      },
      body: JSON.stringify({
        query,
        sessionId,
        stream: true,
        limit: 3,
        history,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedMessage = errText;
      try {
        const json = JSON.parse(errText);
        parsedMessage = json.error?.message || json.error?.code || errText;
      } catch {
        // use raw text
      }
      const err = new Error(parsedMessage);
      if (onError) onError(err);
      throw err;
    }

    const contentType = response.headers.get('content-type') || '';

    // Handle Server-Sent Events (SSE) streaming if reader is available
    if (contentType.includes('text/event-stream') && response.body && typeof response.body.getReader === 'function') {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullAnswer = '';
      let collectedHymns: SuggestedHymn[] = [];
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let currentEvent = '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) {
            currentEvent = '';
            continue;
          }

          if (trimmed.startsWith('event: ')) {
            currentEvent = trimmed.slice(7).trim();
            continue;
          }

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              if (onDone) onDone();
              return { answer: fullAnswer, hymns: collectedHymns };
            }

            try {
              const data = JSON.parse(dataStr);
              if (currentEvent === 'hymns' || data.hymns) {
                collectedHymns = data.hymns || [];
                if (onHymns) onHymns(collectedHymns);
              } else if (currentEvent === 'text-delta' || data.delta) {
                const delta = data.delta || '';
                fullAnswer += delta;
                if (onDelta) onDelta(delta);
              } else if (currentEvent === 'done' || data.finishReason) {
                if (onDone) onDone();
                return { answer: fullAnswer, hymns: collectedHymns };
              }
            } catch {
              // Ignore partial JSON parsing errors
            }
          }
        }
      }

      if (onDone) onDone();
      return { answer: fullAnswer, hymns: collectedHymns };
    } else {
      // Fallback: Non-streaming JSON response
      const json = await response.json();
      const answer = json.data?.answer || '';
      const hymns = json.data?.hymns || [];

      if (onHymns) onHymns(hymns);
      if (onDelta) onDelta(answer);
      if (onDone) onDone();

      return { answer, hymns };
    }
  } catch (error: any) {
    if (onError) onError(error);
    throw error;
  }
}
```

- [ ] **Step 2: Create test script to verify connection to production**

Create `scripts/test_assistant_service.js`:

```javascript
import assert from 'node:assert/strict';
import { sendAssistantQuery } from '../services/assistantService.js';

console.log('Testing sendAssistantQuery against production API...');

let receivedHymns = false;
let receivedDelta = false;

const result = await sendAssistantQuery({
  query: 'Hinos sobre a cruz e redencao',
  sessionId: 'test_client_session',
  onHymns: (hymns) => {
    console.log('Received hymns event. Total hymns:', hymns.length);
    assert.ok(hymns.length > 0);
    receivedHymns = true;
  },
  onDelta: (delta) => {
    receivedDelta = true;
  },
  onDone: () => {
    console.log('Stream completed.');
  },
});

assert.ok(receivedHymns, 'Should have received hymns');
assert.ok(receivedDelta, 'Should have received delta tokens');
assert.ok(result.answer.length > 20, 'Should have received substantive answer');
assert.ok(result.hymns.length > 0, 'Should have received hymn suggestions');

console.log('All assistant service tests passed successfully!');
```

- [ ] **Step 3: Run test script and typecheck**

Run:
```powershell
node scripts/test_assistant_service.js
npm run typecheck
```
Expected: PASS (`All assistant service tests passed successfully!`).

- [ ] **Step 4: Commit Task 1**

```powershell
git add services/assistantService.ts scripts/test_assistant_service.js
git commit -m "feat(assistant): adicionar servico de cliente para a API do assistente de IA"
```

---

### Task 2: SideDrawer Navigation Item with Badge

**Files:**
- Modify: `components/hinario/SideDrawer.tsx`

**Interfaces:**
- Updates `MENU_ITEMS` array with `assistant` key, `Assistente do Hinário` label, `✨` icon, `/assistant` route, and `IA` badge.
- Updates layout styling to render the right-aligned soft-gold pill badge.

- [ ] **Step 1: Update `components/hinario/SideDrawer.tsx`**

1. In `components/hinario/SideDrawer.tsx`, extend `MenuItem` interface:
```typescript
interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route: string;
  badge?: string;
}
```

2. Update `MENU_ITEMS`:
```typescript
const MENU_ITEMS: MenuItem[] = [
  { key: 'hinario', label: 'Hinário', icon: '📖', route: '/' },
  { key: 'search', label: 'Buscar', icon: '🔍', route: '/search' },
  { key: 'favorites', label: 'Favoritos', icon: '⭐', route: '/favorites' },
  {
    key: 'assistant',
    label: 'Assistente do Hinário',
    icon: '✨',
    route: '/assistant',
    badge: 'IA',
  },
];
```

3. In the `.map((item) => ...)` render function, display the badge when present:
```tsx
<Pressable
  key={item.key}
  accessibilityRole="button"
  accessibilityLabel={item.label}
  accessibilityState={{ selected: isActive }}
  onPress={() => handleNavigate(item.route)}
  style={({ pressed }) => [
    styles.menuItem,
    isActive && styles.menuItemActive,
    pressed && styles.menuItemPressed,
  ]}
>
  <View style={styles.menuItemLeft}>
    <Text style={styles.menuIcon}>{item.icon}</Text>
    <Text
      style={[
        styles.menuLabel,
        isActive && styles.menuLabelActive,
      ]}
    >
      {item.label}
    </Text>
  </View>
  {item.badge && (
    <View style={styles.badgePill}>
      <Text style={styles.badgePillText}>{item.badge}</Text>
    </View>
  )}
</Pressable>
```

4. Add styles:
```typescript
menuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 13,
  paddingHorizontal: 16,
  borderRadius: 14,
  marginBottom: 4,
},
menuItemLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},
badgePill: {
  backgroundColor: THEME_COLORS.goldSoft,
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 100,
  marginLeft: 8,
},
badgePillText: {
  color: THEME_COLORS.ink,
  fontFamily: THEME_FONTS.sansSemiBold,
  fontSize: 10.5,
  fontWeight: '700',
  letterSpacing: 0.5,
},
```

- [ ] **Step 2: Run typecheck to verify SideDrawer changes**

Run:
```powershell
npm run typecheck
```
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit Task 2**

```powershell
git add components/hinario/SideDrawer.tsx
git commit -m "feat(drawer): adicionar item do assistente com badge IA no menu lateral"
```

---

### Task 3: Interactive Hymn Card and Chat Components

**Files:**
- Create: `components/assistant/HymnCard.tsx`
- Create: `components/assistant/TypingBubble.tsx`

**Interfaces:**
- `HymnCard`:
  ```typescript
  interface HymnCardProps {
    hymn: SuggestedHymn;
    onPress: (hymn: SuggestedHymn) => void;
  }
  ```
- `TypingBubble`: renders 3 bouncing dots indicator.

- [ ] **Step 1: Implement `components/assistant/HymnCard.tsx`**

Create `components/assistant/HymnCard.tsx`:

```tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { SuggestedHymn } from '../../services/assistantService';

interface HymnCardProps {
  hymn: SuggestedHymn;
  onPress: (hymn: SuggestedHymn) => void;
}

export const HymnCard = React.memo(function HymnCard({ hymn, onPress }: HymnCardProps) {
  const cleanSnippet = (hymn.firstStanza || '')
    .split('\n')
    .slice(0, 2)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Hino ${hymn.number} ${hymn.title}`}
      onPress={() => onPress(hymn)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.badgeRow}>
          <Text style={styles.musicNote}>🎵</Text>
          <Text style={styles.badgeText}>
            Hino {hymn.number}
          </Text>
        </View>
        <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <Path
            d="M5 2.5L9.5 7L5 11.5"
            stroke={THEME_COLORS.goldSoft}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {hymn.title}
      </Text>

      {cleanSnippet ? (
        <Text style={styles.stanza} numberOfLines={2}>
          "{cleanSnippet}"
        </Text>
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME_COLORS.surfaceRaised,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
  },
  cardPressed: {
    backgroundColor: '#43684B',
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  musicNote: {
    fontSize: 13,
  },
  badgeText: {
    fontFamily: THEME_FONTS.sansSemiBold,
    fontSize: 12,
    color: THEME_COLORS.goldSoft,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: THEME_FONTS.serifSemiBold,
    fontSize: 15,
    color: THEME_COLORS.cream,
    fontWeight: '600',
    marginBottom: 4,
  },
  stanza: {
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 12.5,
    lineHeight: 17,
    color: THEME_COLORS.muted,
    fontStyle: 'italic',
  },
});
```

- [ ] **Step 2: Implement `components/assistant/TypingBubble.tsx`**

Create `components/assistant/TypingBubble.tsx`:

```tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { THEME_COLORS } from '../../constants/theme';

export function TypingBubble() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounce = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -4,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.delay(500 - delay),
        ])
      );
    };

    const a1 = createBounce(dot1, 0);
    const a2 = createBounce(dot2, 160);
    const a3 = createBounce(dot3, 320);

    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.bubble}>
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME_COLORS.surface,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    borderWidth: 1,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME_COLORS.muted,
  },
});
```

- [ ] **Step 3: Run typecheck**

Run:
```powershell
npm run typecheck
```
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit Task 3**

```powershell
git add components/assistant/HymnCard.tsx components/assistant/TypingBubble.tsx
git commit -m "feat(assistant): criar componentes de card de hino e indicador de digitacao"
```

---

### Task 4: Assistant Screen Route Implementation (`app/assistant.tsx` and `app/_layout.tsx`)

**Files:**
- Create: `app/assistant.tsx`
- Modify: `app/_layout.tsx`

**Interfaces:**
- Implements complete chat screen adhering to `hinario_chat.html`:
  - Back button (`<`) & New Session button (🔄).
  - Status dot indicator.
  - Suggestion chips: *"🌾 Hinos para a semana"*, *"🌍 Hinos sobre a criação"*, *"🍞 Hinos para a ceia do Senhor"*.
  - Multiline `TextInput` supporting `\n`.
  - Send button.
  - Hymn card press navigation to `/hino/[id]`.
  - Gentle in-chat error bubble on failures.

- [ ] **Step 1: Register route in `app/_layout.tsx`**

In `app/_layout.tsx`, add the Stack.Screen for `assistant`:

```tsx
<Stack.Screen
  name="assistant"
  options={{
    presentation: 'card',
    animation: 'slide_from_right',
  }}
/>
```

- [ ] **Step 2: Implement `app/assistant.tsx`**

Create `app/assistant.tsx`:

```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../constants/theme';
import { HymnCard } from '../components/assistant/HymnCard';
import { TypingBubble } from '../components/assistant/TypingBubble';
import {
  ChatMessage,
  sendAssistantQuery,
  SuggestedHymn,
} from '../services/assistantService';

const SUGGESTION_CHIPS = [
  '🌾 Hinos para a semana',
  '🌍 Hinos sobre a criação',
  '🍞 Hinos para a ceia do Senhor',
];

const INITIAL_GREETING =
  'Olá! Sou o assistente do Hinário. Posso encontrar hinos por temas, sentimentos ou ocasiões.';

export default function AssistantScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [sessionId, setSessionId] = useState<string>(() => `sess_${Date.now()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: INITIAL_GREETING,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [statusText, setStatusText] = useState('Pronto para ajudar');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleNewSession = () => {
    const newSession = `sess_${Date.now()}`;
    setSessionId(newSession);
    setMessages([
      {
        id: `greeting_${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING,
      },
    ]);
    setShowSuggestions(true);
    setStatusText('Pronto para ajudar');
    setIsTyping(false);
    setInputText('');
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  const handleSelectHymn = useCallback(
    (hymn: SuggestedHymn) => {
      router.push({
        pathname: '/hino/[id]',
        params: {
          id: String(hymn.number),
          book: hymn.section || 'novo',
          title: hymn.title,
        },
      });
    },
    [router]
  );

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText ?? inputText).trim();
    if (!textToSend || isTyping) return;

    setShowSuggestions(false);
    setInputText('');
    Keyboard.dismiss();

    const userMessageId = `user_${Date.now()}`;
    const assistantMessageId = `asst_${Date.now()}`;

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);
    setStatusText('Buscando hinos...');
    scrollToBottom();

    // Prepare history payload (last 6 messages)
    const historyPayload = newMessages
      .filter((m) => m.id !== 'greeting' && !m.isError)
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content,
        suggestedHymnIds: m.hymns?.map((h) => h.id),
      }));

    let streamAnswer = '';
    let streamHymns: SuggestedHymn[] = [];

    try {
      await sendAssistantQuery({
        query: textToSend,
        sessionId,
        history: historyPayload,
        onHymns: (hymns) => {
          streamHymns = hymns;
          setStatusText('Digitando...');
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId);
            if (!exists) {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: streamAnswer,
                  hymns: streamHymns,
                  isStreaming: true,
                },
              ];
            }
            return prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, hymns: streamHymns }
                : m
            );
          });
          scrollToBottom();
        },
        onDelta: (delta) => {
          streamAnswer += delta;
          setStatusText('Digitando...');
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId);
            if (!exists) {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: streamAnswer,
                  hymns: streamHymns,
                  isStreaming: true,
                },
              ];
            }
            return prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: streamAnswer }
                : m
            );
          });
          scrollToBottom();
        },
        onDone: () => {
          setIsTyping(false);
          setStatusText('Pronto para ajudar');
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, isStreaming: false }
                : m
            )
          );
          scrollToBottom();
        },
      });
    } catch (error: any) {
      setIsTyping(false);
      setStatusText('Pronto para ajudar');

      let gentleMessage =
        'Não foi possível processar essa busca agora. Que tal tentar perguntar de outra forma ou escolher outro tema?';
      const msg = (error?.message || '').toLowerCase();

      if (msg.includes('network') || msg.includes('failed to fetch') || msg.includes('offline')) {
        gentleMessage =
          'Parece que você está sem conexão com a internet no momento. O assistente precisa de conexão para buscar recomendações na nuvem.';
      } else if (msg.includes('rate_limited') || msg.includes('too many requests') || msg.includes('429')) {
        gentleMessage =
          'Muitas perguntas foram enviadas recentemente. Por favor, aguarde alguns instantes antes de enviar a próxima.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: gentleMessage,
          isError: true,
        },
      ]);
      scrollToBottom();
    }
  };

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';

    return (
      <View style={[styles.messageRow, isUser ? styles.rowUser : styles.rowAgent]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
          <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextAgent]}>
            {item.content}
          </Text>

          {item.hymns && item.hymns.length > 0 ? (
            <View style={styles.hymnsContainer}>
              {item.hymns.map((hymn) => (
                <HymnCard key={hymn.id} hymn={hymn} onPress={handleSelectHymn} />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Chat TopBar */}
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={10}
          onPress={handleBack}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <Svg width={9} height={16} viewBox="0 0 9 15" fill="none">
            <Path
              d="M8 1L1.5 7.5L8 14"
              stroke={THEME_COLORS.cream}
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>

        <View style={styles.avatarCircle}>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path
              d="M9 1.5L10.4 6.6L15.5 8L10.4 9.4L9 14.5L7.6 9.4L2.5 8L7.6 6.6L9 1.5Z"
              fill={THEME_COLORS.ink}
            />
          </Svg>
        </View>

        <View style={styles.agentInfo}>
          <Text style={styles.agentTitle} numberOfLines={1}>
            Assistente do Hinário
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, isTyping && styles.statusDotActive]} />
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nova sessão"
          hitSlop={10}
          onPress={handleNewSession}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
            <Path
              d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 005.64 5.64L1 10M23 14L18.36 18.36A9 9 0 013.51 15"
              stroke={THEME_COLORS.cream}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>

      {/* Messages List & Keyboard Avoiding */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <>
              {isTyping && !messages.some((m) => m.isStreaming) ? (
                <TypingBubble />
              ) : null}

              {showSuggestions ? (
                <View style={styles.chipsWrap}>
                  {SUGGESTION_CHIPS.map((chipText) => (
                    <Pressable
                      key={chipText}
                      onPress={() => handleSend(chipText)}
                      style={({ pressed }) => [
                        styles.chipBtn,
                        pressed && styles.chipBtnPressed,
                      ]}
                    >
                      <Text style={styles.chipText}>{chipText}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </>
          }
        />

        {/* Input Bar */}
        <SafeAreaView edges={['bottom']} style={styles.inputSafeArea}>
          <View style={styles.inputBar}>
            <View style={styles.inputPill}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Pergunte sobre um hino..."
                placeholderTextColor={THEME_COLORS.mutedDim}
                style={styles.textInput}
                multiline
                maxLength={1000}
                returnKeyType="default"
              />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enviar mensagem"
              disabled={!inputText.trim() || isTyping}
              onPress={() => handleSend()}
              style={({ pressed }) => [
                styles.sendBtn,
                inputText.trim().length > 0 && !isTyping && styles.sendBtnActive,
                pressed && styles.sendBtnPressed,
              ]}
            >
              <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
                  stroke={inputText.trim().length > 0 ? THEME_COLORS.ink : THEME_COLORS.mutedDim}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 215, 205, 0.12)',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    backgroundColor: THEME_COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME_COLORS.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentInfo: {
    flex: 1,
    minWidth: 0,
  },
  agentTitle: {
    fontFamily: THEME_FONTS.serifSemiBold,
    fontSize: 16,
    color: THEME_COLORS.cream,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME_COLORS.goldSoft,
  },
  statusDotActive: {
    backgroundColor: '#8CE096',
  },
  statusText: {
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAgent: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  bubbleUser: {
    backgroundColor: THEME_COLORS.goldSoft,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  bubbleAgent: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
  },
  bubbleText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  bubbleTextUser: {
    fontFamily: THEME_FONTS.sansMedium,
    color: THEME_COLORS.ink,
    fontWeight: '500',
  },
  bubbleTextAgent: {
    fontFamily: THEME_FONTS.sansRegular,
    color: THEME_COLORS.cream,
  },
  hymnsContainer: {
    marginTop: 6,
    width: '100%',
  },
  chipsWrap: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 10,
    marginBottom: 8,
  },
  chipBtn: {
    alignSelf: 'flex-start',
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  chipText: {
    fontFamily: THEME_FONTS.sansSemiBold,
    fontSize: 13.5,
    color: THEME_COLORS.goldSoft,
    fontWeight: '600',
  },
  inputSafeArea: {
    backgroundColor: THEME_COLORS.bg,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(218, 215, 205, 0.08)',
  },
  inputPill: {
    flex: 1,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    minHeight: 42,
    maxHeight: 110,
    justifyContent: 'center',
  },
  textInput: {
    color: THEME_COLORS.cream,
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 14.5,
    lineHeight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 32,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME_COLORS.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: THEME_COLORS.goldSoft,
  },
  sendBtnPressed: {
    transform: [{ scale: 0.94 }],
  },
});
```

- [ ] **Step 3: Run typecheck to verify route and layout**

Run:
```powershell
npm run typecheck
```
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit Task 4**

```powershell
git add app/assistant.tsx app/_layout.tsx
git commit -m "feat(assistant): implementar tela de chat do assistente com streaming e cards"
```

---

### Task 5: End-to-End Typecheck & Polish

**Files:**
- All modified files

- [ ] **Step 1: Run full typescript check**

Run:
```powershell
npm run typecheck
```
Expected: PASS with 0 errors.

- [ ] **Step 2: Verify git status is clean**

Run:
```powershell
git status -s
```
Expected: Clean working tree.
