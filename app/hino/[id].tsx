import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { HymnOptionsSheet } from "../../components/hinario/HymnOptionsSheet";
import { Toast } from "../../components/ui/Toast";
import { THEME_COLORS, THEME_FONTS } from "../../constants/theme";
import { INITIAL_BOOKS } from "../../data/mockHinario";
import { MOCK_HINOS } from "../../data/mockHinos";
import { BookKey } from "../../types/hinario";
import { Hino } from "../../types/hino";

import {
  findHinoAnyBook,
  getAllHymnsList,
  getHino,
} from "../../data/hinosRepository";
import {
  isFavorite as checkIsFavorite,
  subscribeFavorites,
  toggleFavorite,
} from "../../services/favoritesService";
import { normalizeSearchText } from "../../utils/textNormalize";

const EDGE_BACK_ZONE_WIDTH = 32; // Limite em pontos da extremidade esquerda reservado exclusivamente para o gesto nativo de voltar do iOS
const HORIZONTAL_SWIPE_MIN_DISTANCE = 40; // Distância mínima para mudar de hino

function resolveHino(
  id?: string,
  bookParam?: string,
  titleParam?: string,
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

  // 3. Search by title if provided (ignoring accents & punctuation)
  if (titleParam) {
    const all = getAllHymnsList();
    const titleNorm = normalizeSearchText(titleParam);
    const match = all.find((h) => normalizeSearchText(h.titulo) === titleNorm);
    if (match) return match;
  }

  // 4. Check MOCK_HINOS as fallback
  const mockFound = MOCK_HINOS.find(
    (h) => h.id === id || String(h.numero) === id,
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
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";
  const book =
    typeof params.book === "string"
      ? params.book
      : Array.isArray(params.book)
        ? params.book[0]
        : undefined;
  const title =
    typeof params.title === "string"
      ? params.title
      : Array.isArray(params.title)
        ? params.title[0]
        : undefined;

  const [hino, setHino] = useState<Hino | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const currentBookKey: BookKey = useMemo(() => {
    if (book && book in INITIAL_BOOKS) {
      return book as BookKey;
    }
    if (hino?.categoria) {
      const lower = hino.categoria.toLowerCase();
      if (lower.includes("cantico")) return "canticos";
      if (lower.includes("supl")) return "suplemento";
    }
    return "hinos";
  }, [book, hino?.categoria]);

  const goToNextHymn = useCallback(() => {
    if (!hino || hino.numero <= 0) return;
    const targetNum = hino.numero + 1;
    const targetHino = getHino(currentBookKey, targetNum);
    if (!targetHino) {
      Toast.show("Você já está no último hino deste hinário");
      return;
    }
    setHino(targetHino);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    router.setParams({
      id: String(targetNum),
      book: currentBookKey,
      title: targetHino.titulo,
    });
  }, [hino, currentBookKey, router]);

  const goToPreviousHymn = useCallback(() => {
    if (!hino || hino.numero <= 0) return;
    const targetNum = hino.numero - 1;
    if (targetNum < 1) {
      Toast.show("Você já está no primeiro hino deste hinário");
      return;
    }
    const targetHino = getHino(currentBookKey, targetNum);
    if (!targetHino) {
      Toast.show("Você já está no primeiro hino deste hinário");
      return;
    }
    setHino(targetHino);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    router.setParams({
      id: String(targetNum),
      book: currentBookKey,
      title: targetHino.titulo,
    });
  }, [hino, currentBookKey, router]);

  const touchStartXRef = useRef<number>(0);

  const getStartX = useCallback(
    (
      evt: GestureResponderEvent,
      gestureState: PanResponderGestureState,
    ): number => {
      if (touchStartXRef.current > 0) {
        return touchStartXRef.current;
      }
      if (gestureState.x0 > 0) {
        return gestureState.x0;
      }
      if (gestureState.moveX > 0) {
        return gestureState.moveX - gestureState.dx;
      }
      return evt.nativeEvent.pageX ?? 0;
    },
    [],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: (evt) => {
          touchStartXRef.current = evt.nativeEvent.pageX;
          return false;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          if (gestureState.numberActiveTouches > 1) {
            return false;
          }

          const startX = getStartX(evt, gestureState);

          // Se o gesto iniciou na extremidade esquerda (<= 32px) e o usuário está arrastando para a direita,
          // LIBERA para o gesto nativo de voltar do iOS (interactivePopGestureRecognizer)
          if (startX <= EDGE_BACK_ZONE_WIDTH && gestureState.dx > 0) {
            return false;
          }

          // Arrasto predominantemente horizontal
          return (
            Math.abs(gestureState.dx) > 20 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.3
          );
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          if (gestureState.numberActiveTouches > 1) {
            return false;
          }

          const startX = getStartX(evt, gestureState);

          // Se o gesto iniciou na extremidade esquerda (<= 32px) e o usuário está arrastando para a direita,
          // NÃO captura: permite que o gesto nativo do iOS faça o pop da tela
          if (startX <= EDGE_BACK_ZONE_WIDTH && gestureState.dx > 0) {
            return false;
          }

          return (
            Math.abs(gestureState.dx) > 20 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.3
          );
        },
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
          const startX = getStartX(evt, gestureState);
          touchStartXRef.current = 0;

          // Se iniciou na extremidade e foi para a direita, o iOS já tratou o voltar da tela
          if (startX <= EDGE_BACK_ZONE_WIDTH && gestureState.dx > 0) {
            return;
          }

          const isSignificantDistance =
            Math.abs(gestureState.dx) >= HORIZONTAL_SWIPE_MIN_DISTANCE;
          const isFlick =
            Math.abs(gestureState.dx) >= 20 && Math.abs(gestureState.vx) >= 0.3;

          if (gestureState.dx > 0 && (isSignificantDistance || isFlick)) {
            // Arrastar da esquerda para a direita no corpo da tela: hino anterior
            goToPreviousHymn();
          } else if (
            gestureState.dx < 0 &&
            (isSignificantDistance || isFlick)
          ) {
            // Arrastar da direita para a esquerda: próximo hino
            goToNextHymn();
          }
        },
        onPanResponderTerminate: () => {
          touchStartXRef.current = 0;
        },
        onPanResponderReject: () => {
          touchStartXRef.current = 0;
        },
      }),
    [getStartX, goToPreviousHymn, goToNextHymn],
  );

  // Sincroniza o status de favorito com o armazenamento local
  useEffect(() => {
    let isMounted = true;
    if (hino && hino.numero > 0) {
      checkIsFavorite(currentBookKey, hino.numero).then((fav) => {
        if (isMounted) {
          setIsFavorite(fav);
        }
      });
    }

    const unsubscribe = subscribeFavorites((favList) => {
      if (!isMounted || !hino || hino.numero <= 0) return;
      const isFav = favList.some(
        (f) =>
          f.bookKey === currentBookKey &&
          String(f.number) === String(hino.numero),
      );
      setIsFavorite(isFav);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [hino, currentBookKey]);

  const handleToggleFavorite = async () => {
    if (!hino || hino.numero <= 0) return;
    const bookName = INITIAL_BOOKS[currentBookKey]?.name || "Hinos";
    const result = await toggleFavorite({
      number: String(hino.numero),
      title: hino.titulo,
      bookKey: currentBookKey,
      bookName,
    });
    setIsFavorite(result.isFav);
  };

  const handleOpenSheetMusic = () => {
    router.push({
      pathname: "/partitura" as any,
      params: {
        hinoNumero: String(hino?.numero ?? ""),
        hinoTitulo: hino?.titulo ?? "",
        book: currentBookKey,
      },
    });
  };

  const handleOpenIGCGMusic = () => {
    Alert.alert(
      "IGCGMusic",
      `Ouvir "${hino?.titulo}" no app IGCGMusic. Você será redirecionado para a plataforma.`,
      [
        {
          text: "Ouvir Agora",
          onPress: () => {
            Linking.openURL("https://beta.igcgmusic.com.br").catch((err) => {
              console.error("Erro ao abrir IGCGMusic:", err);
            });
          },
        },
        { text: "Fechar", style: "cancel" },
      ],
    );
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [id]);

  useEffect(() => {
    // Se o hino atual em memória já é o hino requisitado, não recarrega
    if (hino && String(hino.numero) === id) {
      return;
    }

    const found = resolveHino(id, book, title);
    if (!found) {
      Toast.show("Hino não encontrado");
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    } else {
      setHino(found);
    }
  }, [id, book, title, router, hino]);

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
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          gestureEnabled: true,
          fullScreenGestureEnabled: false,
          gestureResponseDistance: { start: 0, end: EDGE_BACK_ZONE_WIDTH },
        }}
      />
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
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
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
            {hino.numero > 0 ? `Hino ${hino.numero}` : hino.categoria || "Hino"}
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
          ref={scrollViewRef}
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
    width: "100%",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 16,
    color: THEME_COLORS.muted,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "center",
  },
  btnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  navTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  optionsBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: "center",
    justifyContent: "center",
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
    textTransform: "uppercase",
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
    textTransform: "uppercase",
    letterSpacing: 1,
    color: THEME_COLORS.goldSoft,
    marginBottom: 6,
  },
  chorusText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontStyle: "italic",
    color: THEME_COLORS.cream,
  },
});
