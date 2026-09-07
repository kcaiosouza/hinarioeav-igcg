import React, { useMemo, useState } from 'react';
import {
  FlatList,
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
import { getAllHymnsList } from '../data/hinosRepository';
import { normalizeSearchText } from '../utils/textNormalize';

interface Section {
  raw: string;
  norm: string;
}

interface SearchItem {
  id: string;
  number: string;
  title: string;
  bookName: string;
  bookKey: string;
  category?: string;
  snippet?: string;
  defaultSnippet?: string;
  normNumber: string;
  normTitle: string;
  normBook: string;
  normLyrics: string;
  sections: Section[];
}

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Build searchable index from real parsed hymns catalog
  const catalog = useMemo<SearchItem[]>(() => {
    const list = getAllHymnsList();
    return list.map((hino) => {
      const rawSections: string[] = [];
      if (hino.estrofes) {
        rawSections.push(...hino.estrofes);
      }
      if (hino.coro) {
        rawSections.push(hino.coro);
      }

      const sections: Section[] = rawSections.map((raw) => ({
        raw,
        norm: normalizeSearchText(raw),
      }));

      const firstLyrics = hino.estrofes[0] || hino.coro || '';
      const defaultSnippet = firstLyrics
        ? firstLyrics.replace(/\r?\n/g, ' ').slice(0, 80) + '...'
        : undefined;

      const allLyrics = [hino.titulo, ...(hino.estrofes || []), hino.coro || ''].join(' ');

      return {
        id: hino.id,
        number: String(hino.numero),
        title: hino.titulo,
        bookName: hino.categoria,
        bookKey: hino.bookKey,
        category: hino.categoria,
        snippet: defaultSnippet,
        defaultSnippet,
        normNumber: normalizeSearchText(String(hino.numero)),
        normTitle: normalizeSearchText(hino.titulo),
        normBook: normalizeSearchText(hino.categoria),
        normLyrics: normalizeSearchText(allLyrics),
        sections,
      };
    });
  }, []);

  const filteredResults = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) return catalog;

    const queryWords = normalizedQuery.split(' ').filter(Boolean);

    const scoredItems: Array<{ item: SearchItem; score: number }> = [];

    for (const item of catalog) {
      let score = 0;
      let matchingSnippet = item.defaultSnippet;

      // Scoring rules:
      // 1. Exact number match
      if (item.normNumber === normalizedQuery) {
        score = 100;
      } else if (item.normNumber.startsWith(normalizedQuery)) {
        score = 80;
      } else if (item.normTitle === normalizedQuery) {
        score = 90;
      } else if (item.normTitle.includes(normalizedQuery)) {
        score = 70;
      } else if (item.normLyrics.includes(normalizedQuery)) {
        score = 50;
      } else if (
        queryWords.length > 1 &&
        queryWords.every((w) => item.normLyrics.includes(w))
      ) {
        score = 30;
      } else if (item.normBook.includes(normalizedQuery)) {
        score = 20;
      }

      if (score > 0) {
        // Look for the specific section that matched the query to show in snippet
        const matchSection = item.sections.find(
          (sec) =>
            sec.norm.includes(normalizedQuery) ||
            (queryWords.length > 1 && queryWords.every((w) => sec.norm.includes(w)))
        );
        if (matchSection) {
          matchingSnippet =
            matchSection.raw.replace(/\r?\n/g, ' ').slice(0, 80) + '...';
        }

        scoredItems.push({
          item: {
            ...item,
            snippet: matchingSnippet,
          },
          score,
        });
      }
    }

    scoredItems.sort((a, b) => b.score - a.score || Number(a.item.number) - Number(b.item.number));
    return scoredItems.map((entry) => entry.item);
  }, [catalog, query]);

  const handleSelectHymn = (item: SearchItem) => {
    router.push({
      pathname: '/hino/[id]',
      params: { id: item.number, book: item.bookKey, title: item.title },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.topbar}>
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
        </View>

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
          data={filteredResults}
          keyExtractor={(item, index) => `${item.bookKey}-${item.number}-${index}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhum hino encontrado</Text>
              <Text style={styles.emptySubtitle}>
                Não encontramos correspondências para &quot;{query}&quot;.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.bookName} ${item.number} ${item.title}`}
              onPress={() => handleSelectHymn(item)}
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
          )}
        />
      </View>
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
    paddingBottom: 24,
    gap: 10,
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
