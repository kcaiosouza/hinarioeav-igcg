# Hinario Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the exact layout, color palette, typography, and interactive components from `hinario_app_v2.html` in the React Native Expo app.

**Architecture:** A fullscreen React Native application using Expo Router, NativeWind/Tailwind custom tokens, and Google Fonts (`Fraunces` & `Inter`). Modular components for the topbar, segmented book selector, active book indicator with inline renaming, 56px serif display area, 3x4 custom keypad, pill CTA search button, and dynamic result cards with book fallback suggestions.

**Tech Stack:** React Native (0.86), Expo (~57.0), Expo Router (~57.0), NativeWind (4.2), `@expo-google-fonts/fraunces`, `@expo-google-fonts/inter`, TypeScript.

## Global Constraints

- Replicate the exact design from `hinario_app_v2.html`.
- Color tokens: `bg: #263a30`, `bg-page: #0e1712`, `surface: #344E41`, `surface-raised: #3A5A40`, `gold: #5C7650`, `gold-soft: #A3B18A`, `ink: #12201a`, `cream: #DAD7CD`, `muted: #b7c2ab`, `muted-dim: #5c6c5f`, `line: rgba(218,215,205,0.12)`.
- Typography: `Fraunces` (SemiBold 600, Bold 700) for wordmark, tab letters, 56px display number, book names, hymn titles. `Inter` (Regular 400, Medium 500, SemiBold 600, Bold 700) for keypad, labels, CTA, status.
- Keep lyrics mocked for now as requested.

---

### Task 1: Theme Tokens, Font Dependencies & Typecheck Baseline

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Create: `constants/theme.ts`
- Modify: `components/ExternalLink.tsx`

**Interfaces:**
- Produces: `THEME_COLORS`, `THEME_FONTS` exported from `constants/theme.ts`.

- [ ] **Step 1: Install `@expo-google-fonts/fraunces` and `@expo-google-fonts/inter`**

Run command:
```powershell
npx expo install @expo-google-fonts/fraunces @expo-google-fonts/inter
```

- [ ] **Step 2: Create `constants/theme.ts`**

```typescript
export const THEME_COLORS = {
  bg: '#263a30',
  bgPage: '#0e1712',
  surface: '#344E41',
  surfaceRaised: '#3A5A40',
  gold: '#5C7650',
  goldSoft: '#A3B18A',
  ink: '#12201a',
  cream: '#DAD7CD',
  muted: '#b7c2ab',
  mutedDim: '#5c6c5f',
  line: 'rgba(218, 215, 205, 0.12)',
  sage: '#DAD7CD',
  shadow: 'rgba(0,0,0,0.5)',
} as const;

export const THEME_FONTS = {
  fraunces: {
    semiBold: 'Fraunces_600SemiBold',
    bold: 'Fraunces_700Bold',
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
} as const;
```

- [ ] **Step 3: Update `tailwind.config.js` with theme tokens**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        hinario: {
          bg: '#263a30',
          'bg-page': '#0e1712',
          surface: '#344E41',
          'surface-raised': '#3A5A40',
          gold: '#5C7650',
          'gold-soft': '#A3B18A',
          ink: '#12201a',
          cream: '#DAD7CD',
          muted: '#b7c2ab',
          'muted-dim': '#5c6c5f',
          line: 'rgba(218, 215, 205, 0.12)',
          sage: '#DAD7CD',
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Fix `components/ExternalLink.tsx` typing**

Cast `href={props.href as any}` to satisfy Expo Router Href type.

- [ ] **Step 5: Verify TypeScript typecheck**

Run: `npm run typecheck`  
Expected: Exits with code 0 (no errors).

- [ ] **Step 6: Commit changes**

```bash
git add package.json package-lock.json constants/theme.ts tailwind.config.js components/ExternalLink.tsx
git commit -m "feat: configure fonts, theme tokens, and fix typecheck"
```

---

### Task 2: Hinário Data Models & Mock Service

**Files:**
- Create: `types/hinario.ts`
- Create: `data/mockHinario.ts`

**Interfaces:**
- Produces: `BookKey`, `BookCatalog`, `SearchResult`, `searchHinario()` in `data/mockHinario.ts`.

- [ ] **Step 1: Create `types/hinario.ts`**

```typescript
export type BookKey = 'hinos' | 'canticos' | 'suplemento' | 'novo';

export interface BookInfo {
  key: BookKey;
  label: string;
  name: string;
  data: Record<string, string>;
}

export interface SearchResultSuccess {
  type: 'found';
  bookKey: BookKey;
  bookName: string;
  number: string;
  title: string;
}

export interface SearchResultSuggestion {
  type: 'suggestion';
  activeBookName: string;
  number: string;
  suggestedBookKey: BookKey;
  suggestedBookName: string;
  title: string;
}

export interface SearchResultEmpty {
  type: 'empty';
  bookName: string;
  message: string;
}

export type SearchResult = SearchResultSuccess | SearchResultSuggestion | SearchResultEmpty;
```

- [ ] **Step 2: Create `data/mockHinario.ts`**

Implement mock books corresponding to `hinario_app_v2.html` and search logic:
```typescript
import { BookInfo, BookKey, SearchResult } from '../types/hinario';

export const INITIAL_BOOKS: Record<BookKey, BookInfo> = {
  hinos: {
    key: 'hinos',
    label: 'H',
    name: 'Hinos',
    data: {
      '1': 'Chuvas de Bênçãos',
      '124': 'Grande é o Senhor',
    },
  },
  canticos: {
    key: 'canticos',
    label: 'C',
    name: 'Cânticos',
    data: {
      '7': 'Deus é Amor',
      '200': 'Vaso de Barro',
    },
  },
  suplemento: {
    key: 'suplemento',
    label: 'S',
    name: 'Suplemento',
    data: {
      '45': 'Ainda que a Figueira',
      '82': 'Digno é o Senhor',
    },
  },
  novo: {
    key: 'novo',
    label: 'N',
    name: 'Hinário Novo',
    data: {
      '1': 'Chuvas de Bênçãos',
      '7': 'Deus é Amor',
      '124': 'Grande é o Senhor',
      '200': 'Vaso de Barro',
      '300': 'Ele é Fiel',
    },
  },
};

export const OLD_BOOKS_ORDER: BookKey[] = ['hinos', 'canticos', 'suplemento'];

export function searchHinario(
  books: Record<BookKey, BookInfo>,
  activeKey: BookKey,
  number: string
): SearchResult {
  const currentBook = books[activeKey];
  const trimmed = number.trim();

  if (!trimmed) {
    return {
      type: 'empty',
      bookName: currentBook.name,
      message: 'Digite o número do hino para buscar.',
    };
  }

  const title = currentBook.data[trimmed];
  if (title) {
    return {
      type: 'found',
      bookKey: activeKey,
      bookName: currentBook.name,
      number: trimmed,
      title,
    };
  }

  // If in "novo", check older books for suggestion
  if (activeKey === 'novo') {
    for (const oldKey of OLD_BOOKS_ORDER) {
      const oldTitle = books[oldKey].data[trimmed];
      if (oldTitle) {
        return {
          type: 'suggestion',
          activeBookName: currentBook.name,
          number: trimmed,
          suggestedBookKey: oldKey,
          suggestedBookName: books[oldKey].name,
          title: oldTitle,
        };
      }
    }
  }

  return {
    type: 'empty',
    bookName: currentBook.name,
    message: `Não encontramos o hino nº ${trimmed} neste hinário.`,
  };
}
```

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add types/hinario.ts data/mockHinario.ts
git commit -m "feat: add hinario types and mock search service"
```

---

### Task 3: TopBar, BookSelect & ActiveBookRow Components

**Files:**
- Create: `components/hinario/TopBar.tsx`
- Create: `components/hinario/BookSelect.tsx`
- Create: `components/hinario/ActiveBookRow.tsx`

**Interfaces:**
- `TopBar`: `{ onMenuPress?: () => void }`
- `BookSelect`: `{ activeKey: BookKey; onSelect: (key: BookKey) => void; books: Record<BookKey, BookInfo> }`
- `ActiveBookRow`: `{ activeKey: BookKey; bookName: string; onRename: (newName: string) => void }`

- [ ] **Step 1: Create `components/hinario/TopBar.tsx`**

Contains menu hamburger icon (SVG or View bars), "Hinário" wordmark in `Fraunces_600SemiBold` 21px, and 38x38 right ghost spacer.

- [ ] **Step 2: Create `components/hinario/BookSelect.tsx`**

Grid of 4 tabs (`H`, `C`, `S`, `N`). Active tab with background `goldSoft` (`#A3B18A`) and text `ink` (`#12201a`), inactive tab with transparent background and text `muted` (`#b7c2ab`). Font: `Fraunces_600SemiBold` 17px.

- [ ] **Step 3: Create `components/hinario/ActiveBookRow.tsx`**

Displays active book name in `Fraunces_600SemiBold` 15px `goldSoft`. If `activeKey === 'novo'`, shows a pencil edit button. When clicked, displays an inline TextInput with save/commit on blur or return key.

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS.

- [ ] **Step 5: Commit changes**

```bash
git add components/hinario/TopBar.tsx components/hinario/BookSelect.tsx components/hinario/ActiveBookRow.tsx
git commit -m "feat: implement TopBar, BookSelect, and ActiveBookRow"
```

---

### Task 4: DisplayArea & Keypad Components

**Files:**
- Create: `components/hinario/DisplayArea.tsx`
- Create: `components/hinario/Keypad.tsx`

**Interfaces:**
- `DisplayArea`: `{ value: string }`
- `Keypad`: `{ onDigitPress: (digit: string) => void; onBackPress: () => void }`

- [ ] **Step 1: Create `components/hinario/DisplayArea.tsx`**

Min-height 60px, center-aligned. If `value` is non-empty, renders `value` in `Fraunces_600SemiBold` 56px `cream`. If empty, renders `"Nº do hino"` in `Inter_500Medium` 19px `mutedDim`.

- [ ] **Step 2: Create `components/hinario/Keypad.tsx`**

3x4 grid:
Row 1: [1] [2] [3]  
Row 2: [4] [5] [6]  
Row 3: [7] [8] [9]  
Row 4: [0] [⌫] [spacer]  
Buttons have `borderRadius: 18`, aspect ratio ~1:0.82, background `surface` (`#344E41`), text `Inter_500Medium` 21px `cream`. Active state `surfaceRaised` (`#3A5A40`). Back button has dashed border and backspace arrow icon.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS.

- [ ] **Step 4: Commit changes**

```bash
git add components/hinario/DisplayArea.tsx components/hinario/Keypad.tsx
git commit -m "feat: implement DisplayArea and Keypad"
```

---

### Task 5: Search Button & ResultArea Components

**Files:**
- Create: `components/hinario/ResultArea.tsx`

**Interfaces:**
- `ResultArea`: `{ result: SearchResult | null; onSelectHymn: (hymnNumber: string, bookKey: BookKey) => void; onGoToBook: (bookKey: BookKey) => void }`

- [ ] **Step 1: Create `components/hinario/ResultArea.tsx`**

Renders:
1. `type === 'found'`: Card with `surface` background and `line` border, subtitle with book name + hymn number ("Hinos · hino 124"), title in `Fraunces_600SemiBold` 18px `cream`. Pressable to trigger `onSelectHymn`.
2. `type === 'suggestion'`: Card with empty notice ("O hino nº X ainda não está no [Nome].") + Suggestion box with `sage` highlight ("Encontramos no [Livro]: “[Título]”") and button "Ver no [Livro]" invoking `onGoToBook`.
3. `type === 'empty'`: Informative card with book name and message in `muted`.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS.

- [ ] **Step 3: Commit changes**

```bash
git add components/hinario/ResultArea.tsx
git commit -m "feat: implement ResultArea component"
```

---

### Task 6: Root Layout (Font Loading) & Main Screen Integration

**Files:**
- Modify: `app/_layout.tsx`
- Create / Modify: `app/index.tsx`
- Modify: `app/(tabs)/_layout.tsx` (or route setup)

**Interfaces:**
- Loads `Fraunces` and `Inter` font weights.
- Assembles `TopBar`, `BookSelect`, `ActiveBookRow`, `DisplayArea`, `Keypad`, CTA Button, `ResultArea`.

- [ ] **Step 1: Update `app/_layout.tsx`**

Load Google Fonts:
```typescript
import { useFonts, Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
```
Set StatusBar to `style="light"`, background `#263a30`, configure Stack with `headerShown: false` for `index`.

- [ ] **Step 2: Implement `app/index.tsx`**

Integrate state:
- `activeKey`: 'hinos' | 'canticos' | 'suplemento' | 'novo'
- `books`: state initialized with `INITIAL_BOOKS`
- `currentNumber`: string (up to 4 digits)
- `searchResult`: `SearchResult | null`
Connect keyboard handlers, tab selection, inline rename of Hinário Novo, search execution, and navigation to `/hino/[id]`.
Wrap in `SafeAreaView` with dark background `#263a30` and responsive max-width layout (matching the 390px phone mockup).

- [ ] **Step 3: Update `app/(tabs)/_layout.tsx` or route hierarchy**

Ensure root navigation routes directly to `app/index.tsx` without the bottom tabs.

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS.

- [ ] **Step 5: Commit changes**

```bash
git add app/_layout.tsx app/index.tsx
git commit -m "feat: assemble main screen layout and font loading"
```

---

### Task 7: Themed Hymn Reader Screen (`app/hino/[id].tsx`)

**Files:**
- Modify: `app/hino/[id].tsx`

- [ ] **Step 1: Update `app/hino/[id].tsx` with matching design tokens**

- Fundo `#263a30`.
- Topbar customizada com botão de voltar (`surface` com borda `line`) e controles `A-` / `A+`.
- Título do hino em `Fraunces_600SemiBold` `cream`.
- Categoria e numeração estilizados.
- Caixa de coro estilizada em tom `surface` com borda `gold-soft`.
- Suporte aos hinos mockados em `data/mockHinario.ts` e fallback para `mockHinos.ts`.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`  
Expected: PASS.

- [ ] **Step 3: Commit changes**

```bash
git add app/hino/[id].tsx
git commit -m "feat: style hymn reader screen with hinario theme"
```

---

### Task 8: Verification & Visual Fidelity Review

**Files:**
- Review: `app/index.tsx`, `hinario_app_v2.html`

- [ ] **Step 1: Run TypeScript typecheck**

Run: `npm run typecheck`  
Expected: 0 errors.

- [ ] **Step 2: Test bundling with Expo export or start**

Run: `npx expo export --platform web` (or metro check) to verify compilation without bundle errors.

- [ ] **Step 3: Visual inspection against `hinario_app_v2.html`**

Verify that all elements match the HTML mockup:
- Topbar menu icon & Fraunces wordmark
- Segmented book tabs (H, C, S, N) & active indicator
- Book title and rename functionality on N
- Large 56px display number / placeholder
- 3x4 keypad with backspace
- Pill CTA "Buscar"
- Found and suggestion result cards
- Themed hymn view navigation

- [ ] **Step 4: Final commit**

```bash
git commit -m "chore: verify layout and build fidelity"
```
