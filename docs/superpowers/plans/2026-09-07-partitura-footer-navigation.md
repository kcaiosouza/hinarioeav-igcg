# Navegação por Rodapé na Tela de Partituras Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um rodapé fixo minimalista com setas nas extremidades na tela de partituras (`app/partitura.tsx`), permitindo transição para o hino anterior e próximo no hinário selecionado.

**Architecture:** A lógica de navegação entre hinos adjacentes e limites do livro é isolada em um módulo utilitário (`utils/partituraNavigation.ts`) testado via testes unitários. A tela de visualização (`app/partitura.tsx`) consome essa lógica para atualizar os parâmetros de rota via Expo Router, resetar a posição de rolagem para o topo da partitura e renderizar a barra de rodapé com acessibilidade e estados desabilitados.

**Tech Stack:** React Native, Expo Router (~57.0.19), TypeScript (~6.0.3), react-native-svg (15.15.4), Node test runner.

## Global Constraints

- Seguir diretrizes do Expo v57.
- Manter paleta de cores `THEME_COLORS` e tipografia `THEME_FONTS`.
- Garantir `npm run typecheck` com 0 erros de compilação.
- Não introduzir dependências externas desnecessárias.

---

### Task 1: Criar utilitário de navegação com TDD

**Files:**
- Create: `utils/partituraNavigation.ts`
- Create: `utils/__tests__/partituraNavigation.test.mjs`

**Interfaces:**
- Produces:
  ```ts
  export interface AdjacentHymnResult {
    numero: number;
    titulo: string;
  }
  export function getAdjacentHymn(bookKey: string, currentNumber: number | string, direction: 'prev' | 'next'): AdjacentHymnResult | null;
  export function canNavigate(bookKey: string, currentNumber: number | string, direction: 'prev' | 'next'): boolean;
  ```

- [ ] **Step 1: Escrever teste unitário inicial**

Criar `utils/__tests__/partituraNavigation.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getAdjacentHymn, canNavigate } from '../partituraNavigation.ts';

test('canNavigate deve retornar false para hino 1 ao navegar para trás em hinos', () => {
  assert.equal(canNavigate('hinos', 1, 'prev'), false);
  assert.equal(canNavigate('hinos', '1', 'prev'), false);
});

test('canNavigate deve retornar true para hino 2 ao navegar para trás', () => {
  assert.equal(canNavigate('hinos', 2, 'prev'), true);
});

test('getAdjacentHymn prev a partir do hino 2 retorna hino 1', () => {
  const result = getAdjacentHymn('hinos', 2, 'prev');
  assert.ok(result);
  assert.equal(result.numero, 1);
  assert.ok(result.titulo.length > 0);
});

test('getAdjacentHymn next a partir do hino 1 retorna hino 2', () => {
  const result = getAdjacentHymn('hinos', 1, 'next');
  assert.ok(result);
  assert.equal(result.numero, 2);
  assert.ok(result.titulo.length > 0);
});

test('canNavigate next no último hino retorna false', () => {
  // Hinário Novo possui 21 hinos
  assert.equal(canNavigate('novo', 21, 'next'), false);
  assert.equal(getAdjacentHymn('novo', 21, 'next'), null);
});
```

- [ ] **Step 2: Executar o teste para verificar falha**

Executar: `node --test utils/__tests__/partituraNavigation.test.mjs`
Resultado esperado: FAIL (Cannot find module `../partituraNavigation.ts`)

- [ ] **Step 3: Implementar `utils/partituraNavigation.ts`**

Criar `utils/partituraNavigation.ts`:
```ts
import { getBookTitles, getHino } from '../data/hinosRepository';

export interface AdjacentHymnResult {
  numero: number;
  titulo: string;
}

export function getAdjacentHymn(
  bookKey: string,
  currentNumber: number | string,
  direction: 'prev' | 'next'
): AdjacentHymnResult | null {
  const num = typeof currentNumber === 'string' ? parseInt(currentNumber, 10) : currentNumber;
  if (isNaN(num)) return null;

  const targetNum = direction === 'prev' ? num - 1 : num + 1;
  if (targetNum < 1) return null;

  const hino = getHino(bookKey, targetNum);
  if (!hino) return null;

  return {
    numero: targetNum,
    titulo: hino.titulo,
  };
}

export function canNavigate(
  bookKey: string,
  currentNumber: number | string,
  direction: 'prev' | 'next'
): boolean {
  return getAdjacentHymn(bookKey, currentNumber, direction) !== null;
}
```

- [ ] **Step 4: Executar os testes unitários**

Executar: `node --test utils/__tests__/partituraNavigation.test.mjs`
Resultado esperado: PASS em todos os 5 testes.

- [ ] **Step 5: Typecheck e Commit**

Executar: `npm run typecheck`
Resultado esperado: 0 erros.

Executar:
```bash
git add utils/partituraNavigation.ts utils/__tests__/partituraNavigation.test.mjs
git commit -m "feat(navigation): add adjacent hymn helper for partituras"
```

---

### Task 2: Integrar rodapé de navegação em `app/partitura.tsx`

**Files:**
- Modify: `app/partitura.tsx`

**Interfaces:**
- Consumes:
  - `getAdjacentHymn` e `canNavigate` de `../utils/partituraNavigation`
  - `THEME_COLORS` de `../constants/theme`
  - `useRef`, `useCallback` de `react`
  - `useRouter`, `useLocalSearchParams` de `expo-router`

- [ ] **Step 1: Adicionar refs, lógica de navegação e componentes no `app/partitura.tsx`**

1. Importar `useCallback`, `useRef` de `react`.
2. Importar `getAdjacentHymn`, `canNavigate` de `../utils/partituraNavigation`.
3. Criar `scrollViewRef = useRef<ScrollView>(null)`.
4. Calcular `canGoPrev = canNavigate(book, numero, 'prev')` e `canGoNext = canNavigate(book, numero, 'next')`.
5. Criar funções de navegação:
```ts
const handlePrevHymn = useCallback(() => {
  const prev = getAdjacentHymn(book, numero, 'prev');
  if (!prev) return;
  scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  router.setParams({
    hinoNumero: String(prev.numero),
    hinoTitulo: prev.titulo,
    book,
  });
}, [book, numero, router]);

const handleNextHymn = useCallback(() => {
  const next = getAdjacentHymn(book, numero, 'next');
  if (!next) return;
  scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  router.setParams({
    hinoNumero: String(next.numero),
    hinoTitulo: next.titulo,
    book,
  });
}, [book, numero, router]);
```
6. Conectar `ref={scrollViewRef}` ao `ScrollView` da partitura.
7. Renderizar a barra de rodapé `<View style={styles.footerBar}>` logo após `viewerContainer`:
```tsx
{/* Bottom Navigation Footer */}
<View style={styles.footerBar}>
  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Hino anterior"
    disabled={!canGoPrev}
    onPress={handlePrevHymn}
    style={({ pressed }) => [
      styles.navBtn,
      !canGoPrev && styles.btnDisabled,
      pressed && canGoPrev && styles.btnPressed,
    ]}
  >
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19l-7-7 7-7"
        stroke={canGoPrev ? THEME_COLORS.cream : THEME_COLORS.mutedDim}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </Pressable>

  <View style={styles.footerSpacer} />

  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Próximo hino"
    disabled={!canGoNext}
    onPress={handleNextHymn}
    style={({ pressed }) => [
      styles.navBtn,
      !canGoNext && styles.btnDisabled,
      pressed && canGoNext && styles.btnPressed,
    ]}
  >
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5l7 7-7 7"
        stroke={canGoNext ? THEME_COLORS.cream : THEME_COLORS.mutedDim}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </Pressable>
</View>
```
8. Adicionar os estilos correspondentes em `StyleSheet.create`:
```ts
footerBar: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 56,
  paddingHorizontal: 20,
  backgroundColor: THEME_COLORS.surface,
  borderTopWidth: 1,
  borderTopColor: THEME_COLORS.line,
},
footerSpacer: {
  flex: 1,
},
navBtn: {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: THEME_COLORS.surfaceRaised,
  borderWidth: 1,
  borderColor: THEME_COLORS.line,
  alignItems: "center",
  justifyContent: "center",
},
btnDisabled: {
  opacity: 0.25,
},
```

- [ ] **Step 2: Executar typecheck**

Executar: `npm run typecheck`
Resultado esperado: 0 erros.

- [ ] **Step 3: Commit das alterações**

Executar:
```bash
git add app/partitura.tsx
git commit -m "feat(partitura): add footer navigation with prev/next arrows"
```

---

### Task 3: Verificação End-to-End e Validação Final

**Files:**
- Verify: `app/partitura.tsx`
- Verify: `utils/partituraNavigation.ts`

- [ ] **Step 1: Rodar os testes unitários da navegação**

Executar: `node --test utils/__tests__/partituraNavigation.test.mjs`
Resultado esperado: PASS

- [ ] **Step 2: Rodar o typecheck completo do projeto**

Executar: `npm run typecheck`
Resultado esperado: 0 erros

- [ ] **Step 3: Testar com script de validação de casos de borda**

Criar script temporário para validar transição em todos os livros (Hinos, Cânticos, Suplemento, Hinário Novo) e confirmar que o comportamento de `canNavigate` e `getAdjacentHymn` respeita primeiro e último hino de cada livro.
Executar: `node -e "..."`
Resultado esperado: 0 falhas em todos os livros.
