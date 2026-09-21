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
import { getAllHymnsList, subscribeToCatalogUpdates } from '../data/hinosRepository';
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
      prev.onSelect === next.onSelect &&
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
  const flatListRef = useRef<FlatList<ScoredHymnResult>>(null);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [catalogVersion, setCatalogVersion] = useState(0);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  // Invalida catálogo caso receba atualizações remotas de hinos
  useEffect(() => {
    return subscribeToCatalogUpdates(() => {
      setCatalogVersion((v) => v + 1);
    });
  }, []);

  // Catálogo pré-computado
  const catalog = useMemo<SearchHymnItem[]>(() => {
    const list = getAllHymnsList();
    return buildSearchCatalog(list);
  }, [catalogVersion]);

  // Filtragem e pontuação executada em segundo plano via deferredQuery
  const filteredResults = useMemo(() => {
    return filterAndScoreHymns(catalog, deferredQuery);
  }, [catalog, deferredQuery]);

  // Sempre que o termo deferido mudar, reseta a paginação e a rolagem para o topo
  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
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
            ref={flatListRef}
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
