# Implementação da Seção de Hinos "Diversos" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar a nova seção de hinos "Diversos" (`BookKey = 'diversos'`) ao aplicativo, acessível via barra de pesquisa e leitor de hinos (com prefixo "D1"), mantendo-a totalmente oculta do teclado numérico da tela inicial.

**Architecture:** A seção "Diversos" é integrada como uma opção de primeira classe em `BookKey`, indexada no catálogo JSON `hinosData.json` e no repositório de hinos `hinosRepository.ts`. A lista de abas do seletor do teclado (`BookSelect.tsx`) permanece inalterada com apenas os 4 hinários principais (`hinos`, `canticos`, `suplemento`, `novo`), enquanto a tela de pesquisa (`search.tsx`) e o leitor (`hino/[id].tsx`) consomem a lista global e suportam navegação sequencial, favoritos e identificador "D{n}" via `hymnDisplay.ts`.

**Tech Stack:** React Native, Expo 57, TypeScript 6.0, Node.js Test Runner com `tsx`.

## Global Constraints

- **Não alterar a interface visual do teclado**: O seletor `BOOK_KEYS` em `components/hinario/BookSelect.tsx` deve manter exclusivamente `['hinos', 'canticos', 'suplemento', 'novo']`.
- **Formato da barra de navegação**: Hinos de Diversos devem exibir `D${numero}` (ex: `D1`, `D2`) na barra superior do leitor.
- **Badge de busca**: No card de resultados de `/search`, deve ser exibido `Diversos · nº ${numero}`.
- **Tipagem estrita**: `npm run typecheck` (`tsc --noEmit`) deve passar com 0 erros após cada tarefa.

---

### Task 1: Adicionar `'diversos'` em `BookKey` e suporte de título em `hymnDisplay.ts`

**Files:**
- Modify: `types/hinario.ts:1-2`
- Modify: `utils/hymnDisplay.ts:1-35`
- Test: `utils/__tests__/hymnDisplay.test.ts`

**Interfaces:**
- Consumes: `BookKey` em `types/hinario.ts`
- Produces: `getHymnNavTitle(bookKey: BookKey | string, numero: number)` retornando `'D1'` para `bookKey === 'diversos'`

- [ ] **Step 1: Escrever teste com falha em `utils/__tests__/hymnDisplay.test.ts`**

Adicionar caso de teste verificando que `getHymnNavTitle('diversos', 1)` retorna `'D1'` e `getHymnNavTitle('diversos', 12)` retorna `'D12'`:

```ts
test('getHymnNavTitle formata Diversos como D{numero}', () => {
  assert.equal(getHymnNavTitle('diversos', 1), 'D1');
  assert.equal(getHymnNavTitle('diversos', 12), 'D12');
});
```

- [ ] **Step 2: Executar teste para verificar que falha**

Run: `npx tsx --test utils/__tests__/hymnDisplay.test.ts`  
Expected: FAIL com `assert.equal('H1', 'D1')` (pois o fallback atual retorna H1)

- [ ] **Step 3: Implementar código mínimo para passar o teste**

1. Em `types/hinario.ts`:
```ts
export type BookKey = 'hinos' | 'canticos' | 'suplemento' | 'novo' | 'diversos';
```

2. Em `utils/hymnDisplay.ts`:
```ts
  if (normalizedKey === "novo") {
    return `Hino ${numero}`;
  }

  if (normalizedKey === "diversos" || normalizedKey === "diverso") {
    return `D${numero}`;
  }
```

- [ ] **Step 4: Executar testes e typecheck**

Run: `npx tsx --test utils/__tests__/hymnDisplay.test.ts`  
Expected: PASS (todos os 6 testes passando)  
Run: `npm run typecheck`  
Expected: PASS com 0 erros

- [ ] **Step 5: Commit**

```bash
git add types/hinario.ts utils/hymnDisplay.ts utils/__tests__/hymnDisplay.test.ts
git commit -m "feat(types): adicionar diversos a BookKey e formato de titulo D{numero}"
```

---

### Task 2: Estruturar dados em `hinosData.json`, `hinosRepository.ts` e `mockHinario.ts`

**Files:**
- Modify: `data/hinosData.json`
- Modify: `data/hinosRepository.ts`
- Modify: `data/mockHinario.ts`
- Test: `data/__tests__/diversosRepository.test.ts`

**Interfaces:**
- Consumes: `BookKey` de `types/hinario.ts`, `typedData` em `data/hinosRepository.ts`
- Produces: `getHino('diversos', 1)`, `findHinoAnyBook(1)`, `getAllHymnsList()`, `INITIAL_BOOKS.diversos`

- [ ] **Step 1: Escrever teste com falha em `data/__tests__/diversosRepository.test.ts`**

Criar `data/__tests__/diversosRepository.test.ts`:

```ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getHino, getAllHymnsList, findHinoAnyBook, getBookTitles } from '../hinosRepository';
import { INITIAL_BOOKS } from '../mockHinario';

test('diversos deve estar registrado em INITIAL_BOOKS', () => {
  assert.ok(INITIAL_BOOKS.diversos);
  assert.equal(INITIAL_BOOKS.diversos.key, 'diversos');
  assert.equal(INITIAL_BOOKS.diversos.name, 'Diversos');
  assert.equal(INITIAL_BOOKS.diversos.label, 'D');
});

test('getHino deve carregar hino da secao diversos', () => {
  const hino = getHino('diversos', 1);
  assert.ok(hino, 'Hino 1 de diversos deve existir');
  assert.equal(hino?.categoria, 'Diversos');
  assert.equal(hino?.numero, 1);
});

test('getAllHymnsList deve incluir hinos da secao diversos', () => {
  const all = getAllHymnsList();
  const diversosHinos = all.filter((h) => h.bookKey === 'diversos');
  assert.ok(diversosHinos.length > 0, 'Deve conter ao menos um hino de diversos');
});

test('getBookTitles deve retornar titulos de diversos', () => {
  const titles = getBookTitles('diversos');
  assert.ok(titles['1']);
});
```

- [ ] **Step 2: Executar teste para verificar que falha**

Run: `npx tsx --test data/__tests__/diversosRepository.test.ts`  
Expected: FAIL com `assert.ok(INITIAL_BOOKS.diversos)` indefinido

- [ ] **Step 3: Implementar suporte a diversos em dados e repositório**

1. Em `data/hinosData.json`, adicionar a chave `"diversos"`:
```json
  "diversos": {
    "1": {
      "id": "1",
      "numero": 1,
      "titulo": "Hino Exemplo Diversos",
      "categoria": "Diversos",
      "estrofes": [
        "Primeira estrofe do hino de exemplo da seção Diversos.",
        "Segunda estrofe com mais louvor e gratidão."
      ],
      "coro": "Coro do hino de exemplo."
    }
  }
```

2. Em `data/hinosRepository.ts`:
Atualizar os arrays de busca para incluir `'diversos'`:
```ts
export function findHinoAnyBook(numberOrId: string | number): { hino: Hino; bookKey: BookKey } | null {
  const key = String(numberOrId);
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    if (typedData[bKey]?.[key]) {
      return { hino: typedData[bKey][key], bookKey: bKey };
    }
  }
  return null;
}
```
e em `getAllHymnsList`:
```ts
export function getAllHymnsList(): Array<Hino & { bookKey: BookKey }> {
  const list: Array<Hino & { bookKey: BookKey }> = [];
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    const book = typedData[bKey] || {};
    for (const hino of Object.values(book)) {
      list.push({ ...hino, bookKey: bKey });
    }
  }
  return list;
}
```

3. Em `data/mockHinario.ts`:
Registrar em `INITIAL_BOOKS`:
```ts
  diversos: {
    key: 'diversos',
    label: 'D',
    name: 'Diversos',
    data: getBookTitles('diversos'),
  },
```

- [ ] **Step 4: Executar testes e typecheck**

Run: `npx tsx --test data/__tests__/diversosRepository.test.ts`  
Expected: PASS (todos os 4 testes passando)  
Run: `npm run typecheck`  
Expected: PASS com 0 erros

- [ ] **Step 5: Commit**

```bash
git add data/hinosData.json data/hinosRepository.ts data/mockHinario.ts data/__tests__/diversosRepository.test.ts
git commit -m "feat(data): adicionar estrutura de dados e repositorio para sessao Diversos"
```

---

### Task 3: Garantir isolamento do teclado e integração na busca

**Files:**
- Test: `components/hinario/__tests__/diversosVisibility.test.ts`
- Check: `components/hinario/BookSelect.tsx`
- Check: `app/search.tsx`

**Interfaces:**
- Consumes: `BOOK_KEYS` de `components/hinario/BookSelect.tsx`, `getAllHymnsList()` de `data/hinosRepository.ts`
- Produces: Garantia de que `BOOK_KEYS` não contém `'diversos'` e que a busca indexa Diversos com categoria correta.

- [ ] **Step 1: Escrever teste de contrato em `components/hinario/__tests__/diversosVisibility.test.ts`**

```ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllHymnsList } from '../../../data/hinosRepository';
import { normalizeSearchText } from '../../../utils/textNormalize';
import * as fs from 'node:fs';
import * as path from 'node:path';

test('O seletor de livros do teclado nao deve conter a secao diversos', () => {
  const bookSelectContent = fs.readFileSync(
    path.resolve(__dirname, '../BookSelect.tsx'),
    'utf-8'
  );
  
  // Verifica que a constante BOOK_KEYS contem apenas os 4 hinarios tradicionais
  assert.match(
    bookSelectContent,
    /const BOOK_KEYS:\s*BookKey\[\]\s*=\s*\['hinos',\s*'canticos',\s*'suplemento',\s*'novo'\];/
  );
  assert.ok(!bookSelectContent.includes("'diversos'"), "BookSelect nao pode incluir 'diversos'");
});

test('A busca deve indexar hinos de Diversos com nome da categoria correspondente', () => {
  const all = getAllHymnsList();
  const diversosHymn = all.find((h) => h.bookKey === 'diversos');
  assert.ok(diversosHymn, 'Deve existir hino de diversos');
  assert.equal(diversosHymn?.categoria, 'Diversos');

  const normalizedCategory = normalizeSearchText(diversosHymn?.categoria || '');
  assert.equal(normalizedCategory, 'diversos');
});
```

- [ ] **Step 2: Executar teste para verificar aprovação**

Run: `npx tsx --test components/hinario/__tests__/diversosVisibility.test.ts`  
Expected: PASS

- [ ] **Step 3: Executar typecheck global**

Run: `npm run typecheck`  
Expected: PASS com 0 erros

- [ ] **Step 4: Commit**

```bash
git add components/hinario/__tests__/diversosVisibility.test.ts
git commit -m "test: adicionar testes de isolamento do teclado e indexacao na busca para Diversos"
```

---

### Task 4: Verificação Final e Limpeza

**Files:**
- All tests and TypeScript verification

- [ ] **Step 1: Rodar todos os testes de unidade**

Run: `npx tsx --test utils/__tests__/hymnDisplay.test.ts data/__tests__/diversosRepository.test.ts components/hinario/__tests__/diversosVisibility.test.ts`  
Expected: PASS (todos os testes com código 0)

- [ ] **Step 2: Rodar verificação de tipos completa**

Run: `npm run typecheck`  
Expected: PASS com 0 erros

- [ ] **Step 3: Verificar status do Git**

Run: `git status`  
Expected: Working tree clean na branch `feat/sessao-diversos`
