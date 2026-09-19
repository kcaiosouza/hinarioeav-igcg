# Design Doc: Mobile Hymnal AI Assistant (`/assistant`)

**Date:** 2026-09-18  
**Status:** Draft / Review  
**Target Route:** `app/assistant.tsx` (`/assistant`)  
**Visual Reference:** [hinario_chat.html](file:///C:/IGCGDev/igcghinario/hinario_chat.html)  
**Backend API:** `https://igrejaemcampinagrande.com.br/api/hinario/ask-ai`

---

## 1. Executive Summary & Goals

This document specifies the implementation of the **Hymnal AI Assistant** inside the mobile application (`igcghinario`). The feature gives believers an intelligent, conversational interface to discover hymns by spiritual themes, biblical moments, or emotional needs, complete with real-time streaming, interactive hymn cards, session management, and cohesive church branding.

### Key Decisions:
* **Entry Point in Sidebar:** Add a 4th navigation item to [components/hinario/SideDrawer.tsx](file:///C:/IGCGDev/igcghinario/components/hinario/SideDrawer.tsx): `"Assistente do Hinário"` with an icon (✨) and a dedicated `"IA"` badge/pill aligned to the right edge.
* **Dedicated Screen (`app/assistant.tsx`):** Registered in [app/_layout.tsx](file:///C:/IGCGDev/igcghinario/app/_layout.tsx) with smooth stack transition.
* **Design System Fidelity:** Directly adopts the aesthetic from [hinario_chat.html](file:///C:/IGCGDev/igcghinario/hinario_chat.html) using Fraunces and Inter typography, with forest and soft-gold color tokens (`#263a30`, `#344E41`, `#3A5A40`, `#A3B18A`, `#DAD7CD`, `#12201A`).
* **Header with New Session:** Replaces the three-dots placeholder with a dedicated **New Session (🔄)** button that resets the conversation, generates a fresh `sessionId`, and restores initial suggestion chips.
* **Multiline Input (`textarea`):** Expanding `TextInput` supporting multi-line typing and line breaks (`\n`), paired with an iOS/Android `KeyboardAvoidingView`.
* **Interactive Hymn Cards:** Assistant messages render tappable hymn cards showing number, title, and first stanza. Tapping a card immediately routes to the lyrics reader (`/hino/[id]`).
* **Graceful In-Chat Error Handling:** All errors (offline, rate limit, server timeout) are presented as calm, empathetic in-chat messages without jarring crash dialogs or raw error dumps.

---

## 2. Navigation & Layout Architecture

### 2.1 SideDrawer Menu Item (`components/hinario/SideDrawer.tsx`)
* **Menu Definition:**
  ```typescript
  {
    key: 'assistant',
    label: 'Assistente do Hinário',
    icon: '✨',
    route: '/assistant',
    badge: 'IA'
  }
  ```
* **Badge Styling:** Pill capsule positioned at the far right of the menu row, with background `THEME_COLORS.goldSoft` (`#A3B18A`), text `THEME_COLORS.ink` (`#12201A`, 11px bold, uppercase).

### 2.2 Stack Navigation (`app/_layout.tsx`)
* Add `<Stack.Screen name="assistant" options={{ animation: 'slide_from_right', headerShown: false }} />`.

---

## 3. Screen Structure (`app/assistant.tsx`)

### 3.1 Header (TopBar)
* **Back Button:** Standard icon button (`<`) executing `router.back()`.
* **Agent Avatar:** Circular icon container with sparkle icon in soft gold.
* **Agent Identity:**
  * Title: *"Assistente do Hinário"* (Fraunces 600 SemiBold, 16px, Cream `#DAD7CD`).
  * Status line: Animated pulsating dot + dynamic status label (*"Pronto para ajudar"*, *"Buscando hinos..."*, *"Digitando..."*).
* **New Session Action Button (🔄):**
  * Icon button with refresh/new-chat icon.
  * Tapping clears the current messages, generates a new `sessionId`, and resets suggestions.

### 3.2 Chat Body
* **Scrollable Message List:** Uses `ScrollView` or `FlatList` with `ref` for automatic scroll-to-bottom on new tokens.
* **Message Bubbles:**
  * **User:** Background `THEME_COLORS.goldSoft` (`#A3B18A`), text `THEME_COLORS.ink` (`#12201A`), right-aligned, rounded corners (`16px 16px 4px 16px`).
  * **Assistant:** Background `THEME_COLORS.surface` (`#344E41`), border `THEME_COLORS.line`, text `THEME_COLORS.cream` (`#DAD7CD`), left-aligned, rounded corners (`16px 16px 16px 4px`).
* **Typing Bubble Indicator:** 3 bouncing animated dots displayed while awaiting response stream.
* **Suggestion Chips:**
  * Rendered below the welcome message when the chat is fresh:
    * *"🌾 Hinos para a semana"*
    * *"🌍 Hinos sobre a criação"*
    * *"🍞 Hinos para a ceia do Senhor"*
  * Tapping a chip immediately sends the query and hides the chips container.

### 3.3 Interactive Hymn Cards
When the assistant returns recommended hymns, they appear as structured cards under the message:
```text
┌───────────────────────────────────────────────────────────┐
│ 🎵 Hino 756 · Sua comunhão                            >   │
│ "Bendito o amor, Que une os corações..."                  │
└───────────────────────────────────────────────────────────┘
```
* **Card Attributes:**
  * Number and title with section badge.
  * First stanza excerpt in muted green (`#b7c2ab`).
  * Right chevron icon (`>`).
  * Tapping navigates to `/hino/[id]?book=[section]&title=[title]`.

### 3.4 Input Bar
* **Container:** Pinned to bottom, wrapped with `KeyboardAvoidingView` (behavior `padding` on iOS, `height` on Android).
* **Textarea:**
  * Multiline `TextInput` (`multiline={true}`).
  * Min height: 40px, Max height: 110px.
  * Placeholder: *"Pergunte sobre um hino..."* in muted color.
  * Allows free line breaking via Enter key.
* **Send Button:**
  * Circular button with arrow-up icon.
  * Inactive state: Subtle raised surface (`#3A5A40`), muted icon.
  * Active state (when text > 0): Highlighted in `THEME_COLORS.goldSoft` (`#A3B18A`) with dark icon.

---

## 4. API Communication & Streaming Protocol

### 4.1 Client Service (`services/assistantService.ts`)
* **Endpoint:** `https://igrejaemcampinagrande.com.br/api/hinario/ask-ai`
* **Request Flow:**
  1. Sets status to *"Buscando hinos..."*.
  2. Dispatches `POST` with `{ sessionId, query, stream: true, limit: 3, history }`.
  3. Parses incoming SSE chunks:
     - `event: hymns`: Parses JSON metadata array and attaches cards to the assistant message.
     - `event: text-delta`: Appends incremental text tokens, updating state and setting status to *"Digitando..."*.
     - `event: done`: Marks message complete and resets status to *"Pronto para ajudar"*.
  4. **Fallback:** If streaming is interrupted or unsupported on the platform, seamlessly handles non-streaming JSON response.

### 4.2 Graceful Error Handling
* Instead of native alerts or red banners, any failure renders an empathetic assistant message:
  * **Offline/Network error:**
    > *"Parece que você está sem conexão com a internet no momento. O assistente precisa de conexão para buscar recomendações na nuvem."*
  * **Rate limit (429):**
    > *"Muitas perguntas foram enviadas recentemente. Por favor, aguarde alguns instantes antes de enviar a próxima."*
  * **General server/AI error:**
    > *"Não foi possível processar essa busca agora. Que tal tentar perguntar de outra forma ou escolher outro tema?"*

---

## 5. Verification & Testing Plan

1. **SideDrawer Verification:**
   * Open drawer, confirm "Assistente do Hinário" row exists with ✨ icon and "IA" pill.
   * Tap row, verify navigation to `/assistant`.
2. **Conversation Flow Verification:**
   * Verify opening greeting and 3 suggestion chips.
   * Tap *"Hinos para a ceia do Senhor"*, verify user bubble appears and chips disappear.
   * Confirm hymns event renders clickable hymn cards.
   * Confirm text streams token by token.
3. **Card Navigation Verification:**
   * Tap on a recommended hymn card (e.g. Hino 756).
   * Verify app opens `/hino/756` with proper title, lyrics, and back navigation.
4. **New Session Verification:**
   * Tap 🔄 icon in topbar.
   * Verify conversation resets to initial state with fresh `sessionId` and suggestions.
5. **Multiline & Keyboard Verification:**
   * Type multiline text with line breaks, verify input grows up to max height without clipping.
   * Verify keyboard dismiss and view offset behavior.
6. **Graceful Error Verification:**
   * Disable Wi-Fi/data, submit message, verify gentle in-chat message appears without crashing.
