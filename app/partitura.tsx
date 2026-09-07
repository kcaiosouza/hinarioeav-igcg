import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import Pdf from "react-native-pdf";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";

// PDF fixo de exemplo — substituir futuramente pelo arquivo correto do hino
const SAMPLE_PDF = require("../assets/pdfs/exemple-file.pdf");

export default function PartituraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
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

        {/* Spacer to balance the back button */}
        <View style={styles.spacer} />
      </View>

      {/* PDF Viewer */}
      <View style={styles.pdfContainer}>
        <Pdf
          source={SAMPLE_PDF}
          style={styles.pdf}
          trustAllCerts={false}
          renderActivityIndicator={() => (
            <ActivityIndicator size="large" color={THEME_COLORS.cream} />
          )}
          onError={(error) => {
            console.error("Erro ao carregar PDF:", error);
          }}
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
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
  spacer: {
    width: 38,
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
});
