# Hymn Options Bottom Sheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the top-right A+/A- buttons in `app/hino/[id].tsx` with a single options icon (`⋮`) that opens an animated bottom drawer with font size stepper, favorite toggle, sheet music action, and prominent "Ouça esse hino no IGCGMusic" banner.

**Architecture:** Custom animated bottom sheet using React Native's `Modal`, `Animated`, and `PanResponder` for slide up/down gestures.

**Tech Stack:** React Native, Expo Router, TypeScript, Google Fonts (`Fraunces` & `Inter`), Native theme tokens.

---

### Task 1: Create `HymnOptionsSheet` Component

**Files:**
- Create: `components/hinario/HymnOptionsSheet.tsx`

**Requirements:**
- Props:
  ```typescript
  export interface HymnOptionsSheetProps {
    visible: boolean;
    onClose: () => void;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onOpenSheetMusic: () => void;
    onOpenIGCGMusic: () => void;
  }
  ```
- Animated slide from bottom (`translateY` from screen height to 0) + fade on backdrop.
- Drag handle at top + Header with "Opções do Hino" and "X" close button.
- Font size adjustment row with current size ("18 pt") and `A-` / `A+` buttons (limits 14-28).
- Favorite toggle row with star icon (filled ⭐ or outline ☆) and label.
- Sheet music row with score icon 🎼 and label "Ver Partitura".
- Prominent IGCGMusic card in `goldSoft` (`#A3B18A`) with headline "Ouça esse hino no IGCGMusic" and subtitle.

- [ ] **Step 1: Create `components/hinario/HymnOptionsSheet.tsx`**
- [ ] **Step 2: Run typecheck**
Run: `npm run typecheck`  
Expected: PASS with 0 errors.
- [ ] **Step 3: Commit changes**
```bash
git add components/hinario/HymnOptionsSheet.tsx
git commit -m "feat: implement HymnOptionsSheet bottom drawer"
```

---

### Task 2: Integrate `HymnOptionsSheet` into `app/hino/[id].tsx`

**Files:**
- Modify: `app/hino/[id].tsx`

**Requirements:**
- Replace the `A-` and `A+` buttons in the topbar with a single 38x38 button with vertical three dots icon (`⋮`).
- Add state `isOptionsOpen` and `isFavorite`.
- Render `<HymnOptionsSheet ... />` wired to font size, favorite toggle, sheet music alert/modal, and IGCGMusic alert/link.

- [ ] **Step 1: Update `app/hino/[id].tsx`**
- [ ] **Step 2: Run typecheck**
Run: `npm run typecheck`  
Expected: PASS with 0 errors.
- [ ] **Step 3: Commit changes**
```bash
git add app/hino/[id].tsx
git commit -m "feat: replace A+/A- with three-dots button and connect HymnOptionsSheet"
```

---

### Task 3: Final Verification

**Files:**
- Review: `components/hinario/HymnOptionsSheet.tsx`, `app/hino/[id].tsx`

**Requirements:**
- Run `npm run typecheck` (0 errors).
- Run `npx expo export --platform web` (0 errors).

- [ ] **Step 1: Run typecheck and web export**
- [ ] **Step 2: Commit final verification**
```bash
git commit --allow-empty -m "chore: verify HymnOptionsSheet build"
```
