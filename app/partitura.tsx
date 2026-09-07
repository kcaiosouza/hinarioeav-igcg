import { useAssets } from "expo-asset";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { WebView } from "react-native-webview";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";

// Arquivo PDF original da partitura
const SAMPLE_PDF = require("../assets/pdfs/exemple-file.pdf");

// Páginas de alta resolução para plataformas sem visualizador nativo de PDF
const FALLBACK_PAGES: { page: number; source: ImageSourcePropType }[] = [
  { page: 1, source: require("../assets/pdfs/pages/page-1.png") },
  { page: 2, source: require("../assets/pdfs/pages/page-2.png") },
  { page: 3, source: require("../assets/pdfs/pages/page-3.png") },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PAGE_ASPECT_RATIO = 612 / 792;

export default function PartituraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";

  // Carrega o asset do PDF real
  const [assets, error] = useAssets([SAMPLE_PDF]);
  const pdfAsset = assets?.[0];
  const pdfUri = pdfAsset?.localUri || pdfAsset?.uri;

  // No iOS, o WebKit possui renderizador vetorial nativo de PDF (PDFKit).
  // Abrindo o arquivo diretamente via URI local, a qualidade do zoom é vetorial (infinita).
  const isApple = Platform.OS === "ios";

  const renderViewer = () => {
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Erro ao carregar o arquivo PDF: {error.message}
          </Text>
        </View>
      );
    }

    if (!pdfUri) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={THEME_COLORS.cream} />
          <Text style={styles.loadingText}>Abrindo documento PDF...</Text>
        </View>
      );
    }

    if (isApple) {
      return (
        <WebView
          source={{ uri: pdfUri }}
          originWhitelist={["*"]}
          allowingReadAccessToURL={pdfUri}
          allowFileAccess
          allowUniversalAccessFromFileURLs
          scalesPageToFit
          bounces={false}
          scrollEnabled
          style={styles.webview}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={THEME_COLORS.cream} />
              <Text style={styles.loadingText}>Renderizando partitura em PDF...</Text>
            </View>
          )}
        />
      );
    }

    // Android / Web: visualizador contínuo com suporte a zoom nativo
    const cardWidth = Math.min(SCREEN_WIDTH - 24, 700);
    const cardHeight = Math.round(cardWidth / PAGE_ASPECT_RATIO);

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        maximumZoomScale={3}
        minimumZoomScale={1}
        showsVerticalScrollIndicator
      >
        {FALLBACK_PAGES.map((item) => (
          <View
            key={item.page}
            style={[styles.pageCard, { width: cardWidth, height: cardHeight }]}
          >
            <Image
              source={item.source}
              style={styles.pageImage}
              resizeMode="contain"
            />
            <View style={styles.pageBadge}>
              <Text style={styles.pageBadgeText}>
                Página {item.page} de {FALLBACK_PAGES.length}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
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

        {/* Formato indicator */}
        <View style={styles.formatBadge}>
          <Text style={styles.formatText}>PDF</Text>
        </View>
      </View>

      {/* Viewer Area */}
      <View style={styles.viewerContainer}>{renderViewer()}</View>
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
  formatText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 11,
    color: THEME_COLORS.cream,
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  loadingText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: THEME_COLORS.muted,
  },
  errorText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: "#f87171",
    textAlign: "center",
  },
  webview: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  scrollView: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 40,
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
    bottom: 6,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pageBadgeText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 10,
    color: "#ffffff",
  },
});
