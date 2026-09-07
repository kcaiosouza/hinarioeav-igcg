import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";

// Páginas de alta resolução da partitura (exemple-file.pdf)
const SCORE_PAGES: { page: number; source: ImageSourcePropType }[] = [
  { page: 1, source: require("../assets/pdfs/pages/page-1.png") },
  { page: 2, source: require("../assets/pdfs/pages/page-2.png") },
  { page: 3, source: require("../assets/pdfs/pages/page-3.png") },
];

// Proporção exata da página do documento PDF (612 x 792 - Formato Padrão)
const PAGE_ASPECT_RATIO = 612 / 792;
const HORIZONTAL_MARGIN = 12;

export default function PartituraScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";

  const [activePage, setActivePage] = useState(1);
  const [zoomScale, setZoomScale] = useState(1.0);
  const lastTapRef = useRef<number>(0);

  // Largura base ajustada perfeitamente à tela do dispositivo
  const basePageWidth = Math.min(windowWidth - HORIZONTAL_MARGIN * 2, 720);
  const basePageHeight = Math.round(basePageWidth / PAGE_ASPECT_RATIO);

  const cardWidth = Math.round(basePageWidth * zoomScale);
  const cardHeight = Math.round(basePageHeight * zoomScale);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      setZoomScale((prev) => (prev > 1.05 ? 1.0 : 1.5));
    }
    lastTapRef.current = now;
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(2.5, Number((prev + 0.25).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(1.0, Number((prev - 0.25).toFixed(2))));
  };

  const handleResetZoom = () => {
    setZoomScale(1.0);
  };

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
            {numero ? `Partitura — Hino ${numero}` : "Partitura"}
          </Text>
          {titulo && titulo !== "Partitura" && (
            <Text style={styles.navSubtitle} numberOfLines={1}>
              {titulo}
            </Text>
          )}
        </View>

        {/* Page counter badge */}
        <View style={styles.pageBadge}>
          <Text style={styles.pageBadgeText}>
            {activePage}/{SCORE_PAGES.length}
          </Text>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.viewerWrapper}>
        <ScrollView
          style={styles.verticalScrollView}
          contentContainerStyle={[
            styles.verticalScrollContent,
            { alignItems: zoomScale > 1 ? "flex-start" : "center" },
          ]}
          showsVerticalScrollIndicator={true}
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            const totalHeight = e.nativeEvent.contentSize.height;
            const pageHeight = totalHeight / SCORE_PAGES.length;
            const currentPage = Math.min(
              SCORE_PAGES.length,
              Math.max(1, Math.floor(offsetY / pageHeight) + 1),
            );
            if (currentPage !== activePage) {
              setActivePage(currentPage);
            }
          }}
          scrollEventThrottle={16}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100%",
              paddingHorizontal: HORIZONTAL_MARGIN,
            }}
          >
            <Pressable onPress={handleDoubleTap} style={styles.pagesContainer}>
              {SCORE_PAGES.map((item) => (
                <View
                  key={item.page}
                  style={[
                    styles.pageCard,
                    {
                      width: cardWidth,
                      height: cardHeight,
                    },
                  ]}
                >
                  <Image
                    source={item.source}
                    style={styles.pageImage}
                    resizeMode="contain"
                  />
                  <View style={styles.pageFooterBadge}>
                    <Text style={styles.pageFooterText}>
                      Página {item.page} de {SCORE_PAGES.length}
                    </Text>
                  </View>
                </View>
              ))}
            </Pressable>
          </ScrollView>
        </ScrollView>

        {/* Floating Zoom Controls Bar */}
        <View style={styles.floatingControls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Diminuir zoom"
            onPress={handleZoomOut}
            disabled={zoomScale <= 1.0}
            style={({ pressed }) => [
              styles.zoomBtn,
              zoomScale <= 1.0 && styles.zoomBtnDisabled,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 12h14"
                stroke={zoomScale <= 1.0 ? THEME_COLORS.mutedDim : THEME_COLORS.cream}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ajustar à tela"
            onPress={handleResetZoom}
            style={({ pressed }) => [
              styles.zoomLabelBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Text style={styles.zoomText}>{Math.round(zoomScale * 100)}%</Text>
            {zoomScale !== 1.0 && (
              <Text style={styles.zoomResetHint}>ajustar</Text>
            )}
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Aumentar zoom"
            onPress={handleZoomIn}
            disabled={zoomScale >= 2.5}
            style={({ pressed }) => [
              styles.zoomBtn,
              zoomScale >= 2.5 && styles.zoomBtnDisabled,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 5v14M5 12h14"
                stroke={zoomScale >= 2.5 ? THEME_COLORS.mutedDim : THEME_COLORS.cream}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>
        </View>
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
  pageBadge: {
    minWidth: 38,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  pageBadgeText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    color: THEME_COLORS.cream,
  },
  viewerWrapper: {
    flex: 1,
    position: "relative",
  },
  verticalScrollView: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  verticalScrollContent: {
    paddingTop: 12,
    paddingBottom: 80, // espaço para não sobrepor o botão flutuante
  },
  pagesContainer: {
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
  pageFooterBadge: {
    position: "absolute",
    bottom: 6,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pageFooterText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 10,
    color: "#ffffff",
  },
  floatingControls: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    gap: 4,
  },
  zoomBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomBtnDisabled: {
    opacity: 0.4,
  },
  zoomLabelBtn: {
    paddingHorizontal: 10,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 13,
    color: THEME_COLORS.cream,
  },
  zoomResetHint: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 9,
    color: THEME_COLORS.muted,
    marginTop: -2,
  },
});
