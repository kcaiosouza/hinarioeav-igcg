# Otimização de Performance e Paginação Virtual da Busca - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar completamente o delay na tela de busca (`app/search.tsx`), desacoplando a digitação do teclado via `useDeferredValue`, corrigindo o `keyExtractor` para estabilidade das Views nativas, implementando paginação incremental de 50 itens e extraindo a lógica de busca para um módulo testável de alta performance.

**Architecture:** A lógica pura de pontuação, normalização e extração de trechos contextuais é isolada em `utils/searchHymns.ts`, garantindo execução em menos de 15ms para o acervo completo de 1.830 hinos. Na UI (`app/search.tsx`), o input permanece em 120Hz com `setQuery` imediato, enquanto `useDeferredValue` agenda a filtragem em background e a `FlatList` consome lotes paginados de 50 itens com chave única `${item.bookKey}-${item.id}` e fechamento do teclado preservado ao tocar fora ou rolar.

**Tech Stack:** React 19 (`useDeferredValue`, `useMemo`, `useCallback`, `memo`), React Native 0.86 (`FlatList`, `TextInput`, `TouchableWithoutFeedback`), Expo SDK 57, TypeScript, Node.js Test Runner (`node:test`, `tsx`).

## Global Constraints

- **Preservação de UX:** O fechamento do teclado ao tocar fora ou ao rolar a lista (`keyboardDismissMode="on-drag"`, toques no container, topbar e footer spacer) deve permanecer 100% funcional.
- **Tamanho da Página:** `PAGE_SIZE = 50` itens por página.
- **Chave Estável:** `keyExtractor` DEVE ser `(item) => `${item.bookKey}-${item.id}`` sem conter o índice da lista.
- **Sem Regressões:** O formato do `SearchItemCard` (título, insígnia de livro/número, categoria e trecho destacado) deve ser estritamente preservado.
- **Cobertura de Tipagem:** `npm run typecheck` deve rodar com 0 erros após cada tarefa.

---

### Task 1: Módulo Puro de Busca e Pontuação de Hinos (`utils/searchHymns.ts`)

**Files:**
- Create: `utils/searchHymns.ts`
- Test: `utils/__tests__/searchHymns.test.ts`

**Interfaces:**
- Consumes:
  - `Hino` de `types/hino.ts`
  - `BookKey` de `types/hinario.ts`
  - `normalizeSearchText` de `utils/textNormalize.ts`
- Produces:
  - `interface Section { raw: string; norm: string; }`
  - `interface SearchHymnItem { id: string; number: string; title: string; bookName: string; bookKey: BookKey; category?: string; defaultSnippet?: string; normNumber: string; normTitle: string; normBook: string; normLyrics: string; sections: Section[]; }`
  - `interface ScoredHymnResult extends SearchHymnItem { snippet?: string; score: number; }`
  - `function buildSearchCatalog(rawList: Array<Hino & { bookKey: BookKey }>): SearchHymnItem[]`
  - `function filterAndScoreHymns(catalog: SearchHymnItem[], rawQuery: string): ScoredHymnResult[]`

- [ ] **Step 1: Escrever o teste unitário para o motor de busca**

Criar o arquivo `utils/__tests__/searchHymns.test.ts`:

```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchCatalog, filterAndScoreHymns } from '../searchHymns';
import { BookKey } from '../../types/hinario';
import { Hino } from '../../types/hino';

const mockHymns: Array<Hino & { bookKey: BookKey }> = [
  {
    id: '15',
    numero: 15,
    titulo: 'Graça Divina',
    categoria: 'Hinos',
    bookKey: 'hinos',
    estrofes: ['Maravilhosa graça de Jesus', 'Que perdoa todo pecador'],
    coro: 'Graça, graça, graça divina',
  },
  {
    id: '150',
    numero: 150,
    titulo: 'O Amor de Deus',
    categoria: 'Hinos',
    bookKey: 'hinos',
    estrofes: ['O amor de Deus é tão sublime'],
    coro: null,
  },
  {
    id: '1',
    numero: 1,
    titulo: 'Ao Findar o Dia',
    categoria: 'Hinário Novo',
    bookKey: 'novo',
    estrofes: ['Quando o sol se põe no horizonte', 'A graça nos sustenta sempre'],
    coro: null,
  },
];

test('buildSearchCatalog deve mapear hinos com secoes e letras normalizadas', () => {
  const catalog = buildSearchCatalog(mockHymns);
  assert.equal(catalog.length, 3);
  assert.equal(catalog[0].normNumber, '15');
  assert.equal(catalog[0].normTitle, 'graca divina');
  assert.equal(catalog[0].sections.length, 3); // 2 estrofes + 1 coro
});

test('filterAndScoreHymns deve retornar catalogo completo quando a query for vazia', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, '');
  assert.equal(results.length, 3);
});

test('filterAndScoreHymns deve priorizar correspondencia exata de numero com score maximo', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, '15');
  assert.ok(results.length >= 1);
  assert.equal(results[0].id, '15');
  assert.equal(results[0].score, 100);
});

test('filterAndScoreHymns deve priorizar correspondencia de titulo sobre letra', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, 'graça');
  assert.ok(results.length >= 2);
  // 'Graça Divina' tem 'graça' no título (score 70+)
  assert.equal(results[0].id, '15');
  // 'Ao Findar o Dia' tem 'graça' apenas na estrofe (score 50)
  assert.equal(results[1].id, '1');
});

test('filterAndScoreHymns deve gerar snippet contextual do trecho correspondente da letra', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, 'horizonte');
  assert.equal(results.length, 1);
  assert.equal(results[0].id, '1');
  assert.ok(results[0].snippet?.includes('horizonte'));
});

test('filterAndScoreHymns deve executar teste de performance em menos de 15ms para acervo grande', () => {
  // Simular acervo de 1.830 hinos duplicando a base
  const largeMockList: Array<Hino & { bookKey: BookKey }> = [];
  for (let i = 0; i < 610; i++) {
    for (const h of mockHymns) {
      largeMockList.push({
        ...h,
        id: `${h.bookKey}-${h.id}-${i}`,
        numero: i + 1,
      });
    }
  }
  const largeCatalog = buildSearchCatalog(largeMockList);
  assert.equal(largeCatalog.length, 1830);

  const start = performance.now();
  const results = filterAndScoreHymns(largeCatalog, 'graça');
  const duration = performance.now() - start;

  assert.ok(results.length > 0);
  assert.ok(duration < 15, `Duracao esperada < 15ms, obtido: ${duration.toFixed(2)}ms`);
});
```

- [ ] **Step 2: Executar o teste e verificar que falha**

Run: `npx tsx --test utils/__tests__/searchHymns.test.ts`  
Expected: FAIL com erro de módulo `searchHymns` inexistente.

- [ ] **Step 3: Implementar `utils/searchHymns.ts`**

Criar o arquivo `utils/searchHymns.ts`:

```typescript
import { BookKey } from '../types/hinario';
import { Hino } from '../types/hino';
import { normalizeSearchText } from './textNormalize';

export interface Section {
  raw: string;
  norm: string;
}

export interface SearchHymnItem {
  id: string;
  number: string;
  title: string;
  bookName: string;
  bookKey: BookKey;
  category?: string;
  defaultSnippet?: string;
  normNumber: string;
  normTitle: string;
  normBook: string;
  normLyrics: string;
  sections: Section[];
}

export interface ScoredHymnResult extends SearchHymnItem {
  snippet?: string;
  score: number;
}

export function buildSearchCatalog(
  rawList: Array<Hino & { bookKey: BookKey }>
): SearchHymnItem[] {
  return rawList.map((hino) => {
    const rawSections: string[] = [];
    if (hino.estrofes && hino.estrofes.length > 0) {
      rawSections.push(...hino.estrofes);
    }
    if (hino.coro) {
      rawSections.push(hino.coro);
    }

    const sections: Section[] = rawSections.map((raw) => ({
      raw,
      norm: normalizeSearchText(raw),
    }));

    const firstLyrics = (hino.estrofes && hino.estrofes[0]) || hino.coro || '';
    const defaultSnippet = firstLyrics
      ? firstLyrics.replace(/\r?\n/g, ' ').slice(0, 80) + '...'
      : undefined;

    const allLyrics = [
      hino.titulo,
      ...(hino.estrofes || []),
      hino.coro || '',
    ].join(' ');

    return {
      id: hino.id,
      number: String(hino.numero),
      title: hino.titulo,
      bookName: hino.categoria,
      bookKey: hino.bookKey,
      category: hino.categoria,
      defaultSnippet,
      normNumber: normalizeSearchText(String(hino.numero)),
      normTitle: normalizeSearchText(hino.titulo),
      normBook: normalizeSearchText(hino.categoria),
      normLyrics: normalizeSearchText(allLyrics),
      sections,
    };
  });
}

export function filterAndScoreHymns(
  catalog: SearchHymnItem[],
  rawQuery: string
): ScoredHymnResult[] {
  const normalizedQuery = normalizeSearchText(rawQuery);
  if (!normalizedQuery) {
    return catalog.map((item) => ({
      ...item,
      snippet: item.defaultSnippet,
      score: 0,
    }));
  }

  const isNumericQuery = /^\d+$/.test(normalizedQuery);
  const scoredItems: ScoredHymnResult[] = [];

  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    let score = 0;

    // Regras de pontuação:
    if (item.normNumber === normalizedQuery) {
      score = 100;
    } else if (item.normNumber.startsWith(normalizedQuery)) {
      score = 80;
    } else if (item.normTitle === normalizedQuery) {
      score = 90;
    } else if (item.normTitle.includes(normalizedQuery)) {
      score = 70;
    } else if (!isNumericQuery && item.normLyrics.includes(normalizedQuery)) {
      score = 50;
    } else if (item.normBook.includes(normalizedQuery)) {
      score = 20;
    }

    if (score > 0) {
      let matchingSnippet = item.defaultSnippet;

      // Se bateu na letra, busca a estrofe ou coro específica para o snippet
      if (score === 50) {
        for (let s = 0; s < item.sections.length; s++) {
          if (item.sections[s].norm.includes(normalizedQuery)) {
            matchingSnippet =
              item.sections[s].raw.replace(/\r?\n/g, ' ').slice(0, 80) + '...';
            break;
          }
        }
      }

      scoredItems.push({
        ...item,
        snippet: matchingSnippet,
        score,
      });
    }
  }

  scoredItems.sort(
    (a, b) => b.score - a.score || Number(a.number) - Number(b.number)
  );

  return scoredItems;
}
```

- [ ] **Step 4: Executar o teste unitário e verificar que passa**

Run: `npx tsx --test utils/__tests__/searchHymns.test.ts`  
Expected: PASS com todos os testes (inclusive o teste de performance < 15ms).

- [ ] **Step 5: Executar typecheck**

Run: `npm run typecheck`  
Expected: 0 erros.

- [ ] **Step 6: Commitar a tarefa**

```bash
git add utils/searchHymns.ts utils/__tests__/searchHymns.test.ts
git commit -m "feat(search): criar utilitario puro e otimizado de busca e pontuacao de hinos"
```

---

### Task 2: Atualização de `app/search.tsx` com `useDeferredValue` e Paginação Virtual

**Files:**
- Modify: `app/search.tsx`

**Interfaces:**
- Consumes:
  - `buildSearchCatalog`, `filterAndScoreHymns`, `ScoredHymnResult`, `SearchHymnItem` de `utils/searchHymns.ts`
  - `useDeferredValue` do `react`
- Produces:
  - `SearchScreen` com rolagem paginada (`PAGE_SIZE = 50`), digitação assíncrona, chave estável `item.bookKey-item.id` e teclado fechável.

- [ ] **Step 1: Refatorar `app/search.tsx`**

Substituir o conteúdo de `app/search.tsx` por:

```tsx
import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../constants/theme';
import { getAllHymnsList } from '../data/hinosRepository';
import {
  buildSearchCatalog,
  filterAndScoreHymns,
  ScoredHymnResult,
  SearchHymnItem,
} from '../utils/searchHymns';

const PAGE_SIZE = 50;

const SearchItemCard = React.memo(
  function SearchItemCard({
    item,
    onSelect,
  }: {
    item: ScoredHymnResult;
    onSelect: (item: SearchHymnItem) => void;
  }) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.bookName} ${item.number} ${item.title}`}
        onPress={() => onSelect(item)}
        style={({ pressed }) => [
          styles.itemCard,
          pressed && styles.itemCardPressed,
        ]}
      >
        <View style={styles.itemHeader}>
          <Text style={styles.itemBadge}>
            {item.bookName} · nº {item.number}
          </Text>
          {item.category && (
            <Text style={styles.itemCategory}>{item.category}</Text>
          )}
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {item.snippet && (
          <Text style={styles.itemSnippet}>{item.snippet}</Text>
        )}
      </Pressable>
    );
  },
  (prev, next) => {
    return (
      prev.item.id === next.item.id &&
      prev.item.bookKey === next.item.bookKey &&
      prev.item.snippet === next.item.snippet &&
      prev.item.title === next.item.title
    );
  }
);

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  // Catálogo pré-computado uma única vez
  const catalog = useMemo<SearchHymnItem[]>(() => {
    const list = getAllHymnsList();
    return buildSearchCatalog(list);
  }, []);

  // Filtragem e pontuação executada em segundo plano via deferredQuery
  const filteredResults = useMemo(() => {
    return filterAndScoreHymns(catalog, deferredQuery);
  }, [catalog, deferredQuery]);

  // Sempre que o termo deferido mudar, reseta a paginação para o primeiro lote
  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
  }, [deferredQuery]);

  // Resultados paginados para renderização na FlatList
  const visibleResults = useMemo(() => {
    return filteredResults.slice(0, displayedCount);
  }, [filteredResults, displayedCount]);

  const handleLoadMore = useCallback(() => {
    setDisplayedCount((prev) => {
      if (prev < filteredResults.length) {
        return prev + PAGE_SIZE;
      }
      return prev;
    });
  }, [filteredResults.length]);

  const handleSelectHymn = useCallback(
    (item: SearchHymnItem) => {
      dismissKeyboard();
      router.push({
        pathname: '/hino/[id]',
        params: { id: item.number, book: item.bookKey, title: item.title },
      });
    },
    [dismissKeyboard, router]
  );

  const renderSearchItem = useCallback(
    ({ item }: { item: ScoredHymnResult }) => (
      <SearchItemCard item={item} onSelect={handleSelectHymn} />
    ),
    [handleSelectHymn]
  );

  const keyExtractor = useCallback(
    (item: ScoredHymnResult) => `${item.bookKey}-${item.id}`,
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <View style={styles.container}>
          {/* Header */}
          <Pressable style={styles.topbar} onPress={dismissKeyboard}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              hitSlop={8}
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M15 19l-7-7 7-7"
                  stroke={THEME_COLORS.cream}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
            <Text style={styles.headerTitle}>Buscar Hinos</Text>
            <View style={styles.ghostSpacer} />
          </Pressable>

          {/* Search Input Bar */}
          <View style={styles.inputContainer}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke={THEME_COLORS.muted}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Título, número ou trecho..."
              placeholderTextColor={THEME_COLORS.mutedDim}
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
              accessibilityLabel="Campo de busca"
            />
            {query.length > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Limpar busca"
                onPress={() => setQuery('')}
                hitSlop={8}
                style={styles.clearBtn}
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
            )}
          </View>

          {/* Results List */}
          <FlatList
            data={visibleResults}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            windowSize={7}
            removeClippedSubviews={Platform.OS !== 'web'}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <Pressable style={styles.emptyContainer} onPress={dismissKeyboard}>
                <Text style={styles.emptyTitle}>Nenhum hino encontrado</Text>
                <Text style={styles.emptySubtitle}>
                  Não encontramos correspondências para &quot;{query}&quot;.
                </Text>
              </Pressable>
            }
            ListFooterComponent={
              <Pressable style={styles.footerSpacer} onPress={dismissKeyboard} />
            }
            renderItem={renderSearchItem}
          />
        </View>
      </TouchableWithoutFeedback>
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
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  headerTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 20,
    color: THEME_COLORS.cream,
  },
  ghostSpacer: {
    width: 38,
    height: 38,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 15,
    color: THEME_COLORS.cream,
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
    gap: 10,
  },
  footerSpacer: {
    flex: 1,
    minHeight: 120,
  },
  itemCard: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemCardPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemBadge: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  itemCategory: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 11,
    color: THEME_COLORS.goldSoft,
    textTransform: 'uppercase',
  },
  itemTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 17,
    color: THEME_COLORS.cream,
  },
  itemSnippet: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 13,
    color: THEME_COLORS.mutedDim,
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 14,
    color: THEME_COLORS.muted,
    textAlign: 'center',
  },
});
```

- [ ] **Step 2: Executar typecheck**

Run: `npm run typecheck`  
Expected: 0 erros.

- [ ] **Step 3: Executar a suíte de testes unitários**

Run: `npx tsx --test utils/__tests__/searchHymns.test.ts data/__tests__/hinosRepositorySync.test.ts`  
Expected: PASS com todos os testes verdes.

- [ ] **Step 4: Commitar a tarefa**

```bash
git add app/search.tsx
git commit -m "feat(search): integrar useDeferredValue, paginacao virtual de 50 itens e chaves estaveis"
```

---

### Task 3: Verificação Final e Garantia de Qualidade

**Files:**
- None (apenas verificação completa da base e suíte de testes)

- [ ] **Step 1: Rodar a suíte completa de testes automatizados**

Run: `npx tsx --test utils/__tests__/searchHymns.test.ts data/__tests__/hinosRepositorySync.test.ts data/__tests__/diversosRepository.test.ts`  
Expected: PASS em 100% dos testes.

- [ ] **Step 2: Rodar verificação estrita de TypeScript**

Run: `npm run typecheck`  
Expected: 0 erros de compilação.

- [ ] **Step 3: Verificar status do Git**

Run: `git status`  
Expected: Working tree clean na branch `feat/search-performance-pagination`.
