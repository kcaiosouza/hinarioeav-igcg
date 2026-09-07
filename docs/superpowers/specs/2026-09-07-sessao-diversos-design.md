# Especificação de Design: Seção de Hinos "Diversos"

**Data:** 2026-09-07  
**Branch:** `feat/sessao-diversos`  
**Status:** Aprovado  

---

## 1. Visão Geral e Objetivo

Adicionar uma nova seção de hinos chamada **"Diversos"** ao aplicativo. A seção reunirá hinos avulsos/especiais que:
1. **NÃO devem aparecer no teclado numérico principal** (ou seja, a tela inicial com as abas H, C, S, N permanece inalterada).
2. **Devem aparecer na barra de pesquisa (`/search`)**, permitindo busca por número, título, trechos de letras e pelo nome da categoria "Diversos".
3. **Devem ser visualizados na tela de detalhes (`/hino/[id]?book=diversos`)**, com título de navegação no formato `D1`, `D2`, etc., suporte a gestos de swipe (próximo/anterior dentro de Diversos) e suporte a favoritos.
4. **Possuem estrutura de dados pronta** para que os hinos definitivos sejam cadastrados assim que fornecidos pelo usuário.

---

## 2. Decisões de Arquitetura

### 2.1 Modelo de Dados (`types/hinario.ts`)
Estender a união `BookKey`:
```ts
export type BookKey = 'hinos' | 'canticos' | 'suplemento' | 'novo' | 'diversos';
```

### 2.2 Estrutura do JSON (`data/hinosData.json`)
Adicionar a chave `"diversos"` no nível raiz:
```json
{
  "hinos": { ... },
  "canticos": { ... },
  "suplemento": { ... },
  "novo": { ... },
  "diversos": {
    "1": {
      "id": "1",
      "numero": 1,
      "titulo": "Hino Exemplo Diversos",
      "categoria": "Diversos",
      "estrofes": [
        "Primeira estrofe do hino de exemplo...",
        "Segunda estrofe do hino de exemplo..."
      ],
      "coro": "Coro de exemplo..."
    }
  }
}
```

### 2.3 Repositório de Hinos (`data/hinosRepository.ts`)
* Atualizar os arrays estáticos de livros para incluir `'diversos'`:
  * `findHinoAnyBook(numberOrId)`: iterar sobre `['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]`.
  * `getAllHymnsList()`: iterar sobre `['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]`.
* As funções `getHino(bookKey, numberOrId)` e `getBookTitles(bookKey)` passam a funcionar naturalmente para `"diversos"`.

### 2.4 Catálogo de Livros (`data/mockHinario.ts`)
* Adicionar `diversos` em `INITIAL_BOOKS`:
  ```ts
  diversos: {
    key: 'diversos',
    label: 'D',
    name: 'Diversos',
    data: getBookTitles('diversos'),
  },
  ```
* `OLD_BOOKS_ORDER` permanece apenas com `['hinos', 'canticos', 'suplemento']` (as sugestões do teclado do Hinário Novo não devem puxar Diversos automaticamente).

### 2.5 Isolamento da UI do Teclado (`components/hinario/BookSelect.tsx`)
* A constante `BOOK_KEYS` permanece restrita aos 4 hinários da tela inicial:
  ```ts
  const BOOK_KEYS: BookKey[] = ['hinos', 'canticos', 'suplemento', 'novo'];
  ```
* Desta forma, a tela inicial mantém exatamente os mesmos botões `H`, `C`, `S`, `N`, sem poluição visual ou alterações no teclado.

### 2.6 Busca Global (`app/search.tsx`)
* `catalog` deriva de `getAllHymnsList()`, incluindo automaticamente os hinos de Diversos.
* O badge no card de busca exibirá: `Diversos · nº {numero}`.
* A busca continuará funcionando por correspondência de número (ex: digitando "1"), título, estrofes, coro ou categoria "diversos".
* Ao selecionar um resultado de Diversos, o router navega para `/hino/[id]` com `{ id: item.number, book: 'diversos', title: item.title }`.

### 2.7 Exibição e Navegação (`utils/hymnDisplay.ts` e `app/hino/[id].tsx`)
* **Barra superior (`getHymnNavTitle`):**
  Quando `normalizedKey === "diversos"`, retorna `D${numero}` (ex: `D1`, `D2`).
* **Navegação Próximo / Anterior:**
  `handleNext` e `handlePrev` usam `getHino(currentBookKey, targetNum)`. Com `currentBookKey === 'diversos'`, o usuário navega sequencialmente entre os hinos de Diversos cadastrados.
* **Favoritos:**
  `favoritesService.ts` armazena o id composto `${bookKey}-${number}` (ex: `diversos-1`). Ao favoritar um hino de Diversos, ele aparecerá na tela de Favoritos com o livro "Diversos".
* **Partituras:**
  `hasPartitura('diversos', ...)` retorna `false` seguramente via fallback existente, ocultando o botão de partitura quando não houver partitura disponível.

---

## 3. Plano de Verificação e Testes

1. **Tipagem TypeScript:**
   Executar verificação de tipos (`npx tsc --noEmit`) garantindo ausência de erros em `BookKey`.
2. **Exclusão do Teclado:**
   Verificar que a tela inicial renderiza apenas as 4 abas (`H`, `C`, `S`, `N`) e não exibe nenhuma aba referente a Diversos.
3. **Indexação na Busca:**
   Verificar que os hinos de Diversos aparecem na tela de pesquisa (`/search`) com a badge correta (`Diversos · nº 1`) e que a pesquisa por termo/letra encontra o hino.
4. **Navegação e Detalhes:**
   Verificar que ao abrir o hino da seção Diversos:
   - A barra superior exibe `D1`.
   - As estrofes e coro são renderizados corretamente.
   - O botão de favoritar funciona e persiste o hino.
   - O swipe ou avanço de hino busca o próximo número dentro de Diversos.
