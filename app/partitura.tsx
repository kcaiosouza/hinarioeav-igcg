import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";

// Páginas da partitura fixa (exemple-file.pdf)
const SCORE_PAGES: { page: number; source: ImageSourcePropType }[] = [
  { page: 1, source: require("../assets/pdfs/pages/page-1.png") },
  { page: 2, source: require("../assets/pdfs/pages/page-2.png") },
  { page: 3, source: require("../assets/pdfs/pages/page-3.png") },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PartituraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";

  const [activePage, setActivePage] = useState(1);

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

      {/* Sheet Music Pages ScrollView with Zoom Support */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        maximumZoomScale={3}
        minimumZoomScale={1}
        showsVerticalScrollIndicator={false}
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
        {SCORE_PAGES.map((item) => (
          <View key={item.page} style={styles.pageCard}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageLabel}>
                Página {item.page} de {SCORE_PAGES.length}
              </Text>
            </View>
            <Image
              source={item.source}
              style={styles.pageImage}
              resizeMode="contain"
            />
          </View>
        ))}

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Toque e faça movimento de pinça para dar zoom na partitura.
          </Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: "center",
  },
  pageCard: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  pageHeader: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    alignItems: "flex-end",
  },
  pageLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 11,
    color: "#666666",
  },
  pageImage: {
    width: "100%",
    aspectRatio: 612 / 792,
  },
  footerNote: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  footerText: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.muted,
    textAlign: "center",
  },
});
