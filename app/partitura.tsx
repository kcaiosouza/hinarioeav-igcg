import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";
import { getPartitura } from "../data/partiturasManifest";
import { canNavigate, getAdjacentHymn } from "../utils/partituraNavigation";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PAGE_ASPECT_RATIO = 612 / 792;

export default function PartituraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
    book?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";
  const book = params.book ?? "hinos";

  const scrollViewRef = useRef<ScrollView>(null);

  const canGoPrev = canNavigate(book, numero, "prev");
  const canGoNext = canNavigate(book, numero, "next");

  const handlePrevHymn = useCallback(() => {
    const prev = getAdjacentHymn(book, numero, "prev");
    if (!prev) return;
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    router.setParams({
      hinoNumero: String(prev.numero),
      hinoTitulo: prev.titulo,
      book,
    });
  }, [book, numero, router]);

  const handleNextHymn = useCallback(() => {
    const next = getAdjacentHymn(book, numero, "next");
    if (!next) return;
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    router.setParams({
      hinoNumero: String(next.numero),
      hinoTitulo: next.titulo,
      book,
    });
  }, [book, numero, router]);

  const partitura = getPartitura(book, numero);

  const getBookLabel = () => {
    const b = book.toLowerCase();
    if (b.includes("cantico")) return "Cântico";
    if (b.includes("suplemento")) return "Suplemento";
    return "Hino";
  };

  const bookLabel = getBookLabel();
  const cardWidth = Math.min(SCREEN_WIDTH - 24, 720);
  const cardHeight = Math.round(cardWidth / PAGE_ASPECT_RATIO);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
          gestureEnabled: true,
        }}
      />

      {/* Top Bar */}
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

        <View style={styles.titleArea}>
          <Text style={styles.navTitle} numberOfLines={1}>
            {numero ? `Partitura — ${bookLabel} ${numero}` : "Partitura"}
          </Text>
          {titulo && titulo !== "Partitura" && (
            <Text style={styles.navSubtitle} numberOfLines={1}>
              {titulo}
            </Text>
          )}
        </View>

        {/* Page Count Badge */}
        {partitura ? (
          <View style={styles.formatBadge}>
            <Text style={styles.formatText}>
              {partitura.pageCount} {partitura.pageCount === 1 ? "pág" : "págs"}
            </Text>
          </View>
        ) : (
          <View style={{ width: 38 }} />
        )}
      </View>

      {/* Viewer Area */}
      <View style={styles.viewerContainer}>
        {partitura ? (
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            maximumZoomScale={4}
            minimumZoomScale={1}
            showsVerticalScrollIndicator
            bounces={false}
          >
            {partitura.pages.map((source, index) => (
              <View
                key={index}
                style={[
                  styles.pageCard,
                  { width: cardWidth, height: cardHeight },
                ]}
              >
                <Image
                  source={source}
                  style={styles.pageImage}
                  resizeMode="contain"
                />
                {partitura.pageCount > 1 && (
                  <View style={styles.pageBadge}>
                    <Text style={styles.pageBadgeText}>
                      Página {index + 1} de {partitura.pageCount}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>♫</Text>
            <Text style={styles.emptyTitle}>Partitura não disponível</Text>
            <Text style={styles.emptySubtitle}>
              Ainda não há partitura cadastrada para este {bookLabel.toLowerCase()} no hinário.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.emptyButton,
                pressed && styles.btnPressed,
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.emptyButtonText}>Voltar</Text>
            </Pressable>
          </View>
        )}

        {/* Floating Navigation Buttons */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Hino anterior"
          disabled={!canGoPrev}
          onPress={handlePrevHymn}
          style={({ pressed }) => [
            styles.floatingNavBtn,
            styles.floatingBtnLeft,
            !canGoPrev && styles.btnDisabled,
            pressed && canGoPrev && styles.btnPressed,
          ]}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 19l-7-7 7-7"
              stroke={canGoPrev ? THEME_COLORS.cream : THEME_COLORS.mutedDim}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Próximo hino"
          disabled={!canGoNext}
          onPress={handleNextHymn}
          style={({ pressed }) => [
            styles.floatingNavBtn,
            styles.floatingBtnRight,
            !canGoNext && styles.btnDisabled,
            pressed && canGoNext && styles.btnPressed,
          ]}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 5l7 7-7 7"
              stroke={canGoNext ? THEME_COLORS.cream : THEME_COLORS.mutedDim}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.line,
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
  titleArea: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  navTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 16,
    color: THEME_COLORS.cream,
    textAlign: "center",
  },
  navSubtitle: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.muted,
    textAlign: "center",
    marginTop: 2,
  },
  formatBadge: {
    minWidth: 46,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  formatText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 11,
    color: THEME_COLORS.cream,
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
    position: "relative",
  },
  scrollView: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 88,
    alignItems: "center",
    gap: 16,
  },
  pageCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    position: "relative",
  },
  pageImage: {
    width: "100%",
    height: "100%",
  },
  pageBadge: {
    position: "absolute",
    bottom: 8,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pageBadgeText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 11,
    color: "#ffffff",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    color: THEME_COLORS.muted,
    marginBottom: 8,
  },
  emptyTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 14,
    color: THEME_COLORS.muted,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
  emptyButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
  },
  emptyButtonText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 14,
    color: THEME_COLORS.cream,
  },
  floatingNavBtn: {
    position: "absolute",
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  floatingBtnLeft: {
    left: 20,
  },
  floatingBtnRight: {
    right: 20,
  },
  btnDisabled: {
    opacity: 0.25,
  },
});
