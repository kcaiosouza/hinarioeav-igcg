import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { MOCK_HINOS } from '../../data/mockHinos';
import { INITIAL_BOOKS } from '../../data/mockHinario';
import { BookKey } from '../../types/hinario';
import { Hino } from '../../types/hino';
import { Toast } from '../../components/ui/Toast';
import { HymnOptionsSheet } from '../../components/hinario/HymnOptionsSheet';

import { getHino, findHinoAnyBook, getAllHymnsList } from '../../data/hinosRepository';

function resolveHino(
  id?: string,
  bookParam?: string,
  titleParam?: string
): Hino | null {
  if (!id) return null;

  // 1. Resolve directly by book and number/id
  if (bookParam) {
    const found = getHino(bookParam, id);
    if (found) return found;
  }

  // 2. Search across books by number
  const across = findHinoAnyBook(id);
  if (across) {
    return across.hino;
  }

  // 3. Search by title if provided
  if (titleParam) {
    const all = getAllHymnsList();
    const titleLower = titleParam.trim().toLowerCase();
    const match = all.find(
      (h) => h.titulo.toLowerCase() === titleLower
    );
    if (match) return match;
  }

  // 4. Check MOCK_HINOS as fallback
  const mockFound = MOCK_HINOS.find(
    (h) => h.id === id || String(h.numero) === id
  );
  if (mockFound) {
    return mockFound;
  }

  return null;
}

export default function HinoDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    book?: string | string[];
    title?: string | string[];
  }>();
  const router = useRouter();

  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';
  const book =
    typeof params.book === 'string'
      ? params.book
      : Array.isArray(params.book)
      ? params.book[0]
      : undefined;
  const title =
    typeof params.title === 'string'
      ? params.title
      : Array.isArray(params.title)
      ? params.title[0]
      : undefined;

  const [hino, setHino] = useState<Hino | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      Toast.show(next ? 'Hino adicionado aos favoritos!' : 'Hino removido dos favoritos');
      return next;
    });
  };

  const handleOpenSheetMusic = () => {
    Alert.alert(
      'Partitura',
      `A partitura do hino ${hino?.numero} - "${hino?.titulo}" estará disponível para download e visualização em breve!`,
      [{ text: 'OK' }]
    );
  };

  const handleOpenIGCGMusic = () => {
    Alert.alert(
      'IGCGMusic',
      `Ouvir "${hino?.titulo}" no app IGCGMusic. Redirecionamento para a plataforma de música da igreja.`,
      [{ text: 'Ouvir Agora', onPress: () => {} }, { text: 'Fechar', style: 'cancel' }]
    );
  };

  useEffect(() => {
    const found = resolveHino(id, book, title);
    if (!found) {
      Toast.show('Hino não encontrado');
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    } else {
      setHino(found);
    }
  }, [id, book, title, router]);

  if (!hino) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando hino...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <HymnOptionsSheet
        visible={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onOpenSheetMusic={handleOpenSheetMusic}
        onOpenIGCGMusic={handleOpenIGCGMusic}
      />
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 19l-7-7 7-7"
                stroke={THEME_COLORS.cream}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>

          <Text style={styles.navTitle} numberOfLines={1}>
            {hino.numero > 0 ? `Hino ${hino.numero}` : hino.categoria || 'Hino'}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Opções do hino"
            onPress={() => setIsOptionsOpen(true)}
            style={({ pressed }) => [
              styles.optionsBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                stroke={THEME_COLORS.cream}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>

        {/* Lyrics & Stanzas ScrollArea */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hymn Header Area */}
          <View style={styles.headerArea}>
            <Text style={styles.categoryBadge}>{hino.categoria}</Text>
            <Text style={styles.hymnTitle}>
              {hino.numero}. {hino.titulo}
            </Text>
            <View style={styles.divider} />
          </View>

          {/* Stanzas & Chorus */}
          {hino.estrofes.map((estrofe, idx) => (
            <View key={idx} style={styles.stanzaBlock}>
              <Text style={styles.stanzaLabel}>Estrofe {idx + 1}</Text>
              <Text
                style={[
                  styles.stanzaText,
                  { fontSize, lineHeight: Math.round(fontSize * 1.6) },
                ]}
              >
                {estrofe}
              </Text>
              {hino.coro && idx === 0 && (
                <View style={styles.chorusCard}>
                  <Text style={styles.chorusLabel}>CORO</Text>
                  <Text
                    style={[
                      styles.chorusText,
                      { fontSize, lineHeight: Math.round(fontSize * 1.6) },
                    ]}
                  >
                    {hino.coro}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
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
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 16,
    color: THEME_COLORS.muted,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  navTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  optionsBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerArea: {
    marginBottom: 8,
  },
  categoryBadge: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: THEME_COLORS.goldSoft,
    marginBottom: 6,
  },
  hymnTitle: {
    fontFamily: THEME_FONTS.fraunces.bold,
    fontSize: 24,
    lineHeight: 32,
    color: THEME_COLORS.cream,
  },
  divider: {
    height: 1,
    backgroundColor: THEME_COLORS.line,
    marginTop: 16,
    marginBottom: 20,
  },
  stanzaBlock: {
    marginBottom: 20,
  },
  stanzaLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginBottom: 6,
  },
  stanzaText: {
    fontFamily: THEME_FONTS.inter.regular,
    color: THEME_COLORS.cream,
  },
  chorusCard: {
    backgroundColor: THEME_COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: THEME_COLORS.goldSoft,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  chorusLabel: {
    fontFamily: THEME_FONTS.inter.bold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: THEME_COLORS.goldSoft,
    marginBottom: 6,
  },
  chorusText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontStyle: 'italic',
    color: THEME_COLORS.cream,
  },
});
