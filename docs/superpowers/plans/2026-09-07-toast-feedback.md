# Toast Feedback & Keyboard Area Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move hymn search suggestions and warning messages to an interactive top toast notification and completely clear the area below the keypad in `app/index.tsx`.

**Architecture:** Extend `ToastNotice` to support interactive suggestions with an action button and custom auto-dismiss duration. Update `app/index.tsx` to trigger suggestion toasts on search, delete `<ResultArea />` from below the keypad, and delete `ResultArea.tsx`.

**Tech Stack:** React Native (0.86), Expo (~57.0), Expo Router (~57.0), TypeScript, NativeWind.

## Global Constraints

- Never render any result cards or warning banners below the numeric keypad in `app/index.tsx`.
- Toast must float above content at the top safe area (`position: 'absolute'`, `top: 56`, `zIndex: 999`).
- Toast with suggestions must display the warning message, the found book & title, and a pill action button to switch to that book and navigate to the hymn.
- Maintain existing visual tokens: `THEME_COLORS` and `THEME_FONTS`.
- Run `npm run typecheck` to verify TypeScript integrity after changes.

---

### Task 1: Enhance `ToastNotice` with Suggestion Support & Action Button

**Files:**
- Modify: `components/hinario/ToastNotice.tsx`

**Interfaces:**
- Consumes: `THEME_COLORS`, `THEME_FONTS` from `../../constants/theme`
- Produces: `ToastSuggestion` interface and updated `ToastNoticeProps` exported from `components/hinario/ToastNotice.tsx`

- [ ] **Step 1: Update `ToastNotice.tsx` interface and implementation**

Update `components/hinario/ToastNotice.tsx` to:
1. Define and export `ToastSuggestion`:
   ```typescript
   export interface ToastSuggestion {
     title: string;
     actionLabel: string;
     onAction: () => void;
   }
   ```
2. Add optional `suggestion?: ToastSuggestion` to `ToastNoticeProps`.
3. Set default duration to 4000ms for simple notices, and 7000ms when `suggestion` is present.
4. Render the suggestion block when `suggestion` exists:
   - Suggestion card with background `rgba(218, 215, 205, 0.08)` and border `rgba(218, 215, 205, 0.35)`.
   - Text with `suggestion.title`.
   - Pressable action button with `suggestion.actionLabel` that triggers `suggestion.onAction()` and closes the toast.

```typescript
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface ToastSuggestion {
  title: string;
  actionLabel: string;
  onAction: () => void;
}

export interface ToastNoticeProps {
  visible: boolean;
  bookName: string;
  message: string;
  suggestion?: ToastSuggestion;
  onClose: () => void;
  duration?: number;
}

export function ToastNotice({
  visible,
  bookName,
  message,
  suggestion,
  onClose,
  duration,
}: ToastNoticeProps) {
  const effectiveDuration = duration ?? (suggestion ? 7000 : 4000);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDismiss = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleActionPress = () => {
    if (suggestion) {
      handleDismiss();
      suggestion.onAction();
    }
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(-12);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, effectiveDuration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      opacity.setValue(0);
      translateY.setValue(-12);
    }
  }, [visible, message, suggestion, effectiveDuration]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy < -5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy <= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -25 || gestureState.vy < -0.4) {
          handleDismiss();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toastWrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.bookLabel}>{bookName}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar aviso"
            hitSlop={12}
            onPress={handleDismiss}
            style={({ pressed }) => [
              styles.closeBtn,
              pressed && styles.closeBtnPressed,
            ]}
          >
            <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <Path
                d="M2 2L12 12M12 2L2 12"
                stroke={THEME_COLORS.muted}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>
        </View>
        <Text style={styles.messageText}>{message}</Text>

        {suggestion && (
          <View style={styles.suggestionBox}>
            <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={suggestion.actionLabel}
              onPress={handleActionPress}
              style={({ pressed }) => [
                styles.actionBtn,
                pressed && styles.actionBtnPressed,
              ]}
            >
              <Text style={styles.actionBtnText}>{suggestion.actionLabel}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bookLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  closeBtn: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  closeBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  messageText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: THEME_COLORS.cream,
    lineHeight: 20,
  },
  suggestionBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.line,
    gap: 8,
  },
  suggestionTitle: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 13,
    color: THEME_COLORS.goldSoft,
    lineHeight: 18,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: THEME_COLORS.goldSoft,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  actionBtnPressed: {
    backgroundColor: 'rgba(218, 215, 205, 0.12)',
  },
  actionBtnText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    color: THEME_COLORS.goldSoft,
  },
});
```

- [ ] **Step 2: Run typecheck to verify `ToastNotice.tsx` changes**

Run command:
```powershell
npm run typecheck
```
Expected: PASS (0 errors)

- [ ] **Step 3: Commit `ToastNotice.tsx` changes**

Run commands:
```powershell
git add components/hinario/ToastNotice.tsx
git commit -m "feat: add suggestion support and action button to ToastNotice"
```

---

### Task 2: Clean `app/index.tsx` & Route Suggestions Through `ToastNotice`

**Files:**
- Modify: `app/index.tsx`

**Interfaces:**
- Consumes: `ToastNotice`, `ToastSuggestion` from `../components/hinario/ToastNotice`
- Produces: Clean layout without `ResultArea`, suggestion feedback displayed as toast

- [ ] **Step 1: Update `app/index.tsx`**

1. Remove `ResultArea` import and component usage.
2. Update `toast` state to hold optional `suggestion?: ToastSuggestion`.
3. In `handleSearch`:
   - If `result.type === "empty"`: show toast notice with no suggestion.
   - If `result.type === "found"`: clear toast and navigate to `/hino/[id]`.
   - If `result.type === "suggestion"`: show toast with:
     - `bookName`: `result.activeBookName`
     - `message`: `O hino nº ${result.number} ainda não está no ${result.activeBookName}.`
     - `suggestion`:
       - `title`: `Encontramos no ${result.suggestedBookName}: “${result.title}”`
       - `actionLabel`: `Ver no ${result.suggestedBookName}`
       - `onAction`: calls `handleGoToBook(result.suggestedBookKey, result.number)`
4. Update `handleGoToBook` to accept target book and hymn number, set activeKey, and navigate directly to `/hino/[id]` with the found hymn's data.
5. In `handleDigitPress`, `handleBackPress`, and `handleSelectBook`, dismiss any active toast so typing dismisses previous feedback.
6. Keep `<ScrollView>` containing solely `<DisplayArea />` and `<Keypad />`.

- [ ] **Step 2: Run typecheck to verify `app/index.tsx`**

Run command:
```powershell
npm run typecheck
```
Expected: PASS (0 errors)

- [ ] **Step 3: Commit `app/index.tsx` changes**

Run commands:
```powershell
git add app/index.tsx
git commit -m "feat: route hymn search suggestions to top toast and clean keypad area"
```

---

### Task 3: Delete Obsolete `ResultArea.tsx` & Verify Whole Project

**Files:**
- Delete: `components/hinario/ResultArea.tsx`

- [ ] **Step 1: Delete `components/hinario/ResultArea.tsx`**

Remove the unused component file.

- [ ] **Step 2: Run typecheck to ensure no dangling references**

Run command:
```powershell
npm run typecheck
```
Expected: PASS (0 errors)

- [ ] **Step 3: Commit deletion**

Run commands:
```powershell
git add components/hinario/ResultArea.tsx
git commit -m "refactor: remove obsolete ResultArea component"
```
