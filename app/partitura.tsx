import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { WebView } from "react-native-webview";
import { THEME_COLORS, THEME_FONTS } from "../constants/theme";

// PDF fixo de exemplo configurado no projeto
const SAMPLE_PDF_ASSET = require("../assets/pdfs/exemple-file.pdf");

function getPdfJsHtml(base64: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=4.0, minimum-scale=0.5, user-scalable=yes" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: ${THEME_COLORS.bg};
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 6px 32px 6px;
      -webkit-user-select: none;
      user-select: none;
    }
    #loading {
      color: ${THEME_COLORS.cream};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 15px;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(218, 215, 205, 0.2);
      border-top-color: ${THEME_COLORS.cream};
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    #pages-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    canvas {
      width: 100% !important;
      max-width: 900px;
      height: auto !important;
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.45);
      background-color: #ffffff;
    }
    #error-msg {
      color: #f87171;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      margin-top: 40px;
      text-align: center;
      padding: 16px;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    <span>Carregando partitura...</span>
  </div>
  <div id="pages-container"></div>
  <div id="error-msg" style="display: none;"></div>

  <script>
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const base64Data = "${base64}";
      const rawData = atob(base64Data);
      const uint8Array = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; i++) {
        uint8Array[i] = rawData.charCodeAt(i);
      }

      pdfjsLib.getDocument({ data: uint8Array }).promise.then(async function(pdf) {
        document.getElementById('loading').style.display = 'none';
        const container = document.getElementById('pages-container');

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2.0 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: viewport }).promise;

          container.appendChild(canvas);
        }
      }).catch(function(err) {
        document.getElementById('loading').style.display = 'none';
        const errEl = document.getElementById('error-msg');
        errEl.style.display = 'block';
        errEl.innerText = 'Erro ao processar partitura: ' + err.message;
      });
    } catch (e) {
      document.getElementById('loading').style.display = 'none';
      const errEl = document.getElementById('error-msg');
      errEl.style.display = 'block';
      errEl.innerText = 'Falha ao inicializar leitor: ' + e.message;
    }
  </script>
</body>
</html>`;
}

export default function PartituraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    hinoNumero?: string;
    hinoTitulo?: string;
  }>();

  const numero = params.hinoNumero ?? "";
  const titulo = params.hinoTitulo ?? "Partitura";

  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        const [asset] = await Asset.loadAsync(SAMPLE_PDF_ASSET);
        if (!asset) {
          throw new Error("Não foi possível carregar o arquivo da partitura.");
        }

        let base64 = "";

        if (asset.localUri) {
          base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        } else if (asset.uri) {
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = (reader.result as string) || "";
              const cleanBase64 = result.split(",")[1] || result;
              resolve(cleanBase64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }

        if (isMounted) {
          if (!base64) {
            throw new Error("Arquivo vazio ou ilegível.");
          }
          setPdfBase64(base64);
        }
      } catch (err: any) {
        console.error("Erro ao carregar PDF:", err);
        if (isMounted) {
          setError(err?.message || "Erro ao abrir partitura.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, []);

  const htmlSource = useMemo(() => {
    if (!pdfBase64) return null;
    return getPdfJsHtml(pdfBase64);
  }, [pdfBase64]);

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

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={THEME_COLORS.cream} />
            <Text style={styles.statusText}>Carregando partitura...</Text>
          </View>
        )}

        {error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && pdfBase64 && htmlSource && (
          Platform.OS === "web" ? (
            <iframe
              src={`data:application/pdf;base64,${pdfBase64}`}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Visualizador de Partitura"
            />
          ) : (
            <WebView
              originWhitelist={["*"]}
              source={
                Platform.OS === "ios"
                  ? { uri: `data:application/pdf;base64,${pdfBase64}` }
                  : { html: htmlSource }
              }
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
              allowFileAccess
              allowUniversalAccessFromFileURLs
              scalesPageToFit={Platform.OS === "ios"}
              bounces={false}
            />
          )
        )}
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
  contentContainer: {
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
  statusText: {
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
});
