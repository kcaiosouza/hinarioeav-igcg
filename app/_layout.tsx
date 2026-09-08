import '../global.css';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { THEME_COLORS } from '../constants/theme';
import { TopProgressBar } from '../components/ui/TopProgressBar';
import { initCatalogFromStorage } from '../data/hinosRepository';
import { checkAndSyncCatalog } from '../services/catalogSyncService';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    (async () => {
      try {
        await initCatalogFromStorage();
        checkAndSyncCatalog();
      } catch (err) {
        // Silently preserve offline bundled catalog
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <TopProgressBar />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME_COLORS.bg },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
        <Stack.Screen name="favorites" />
        <Stack.Screen
          name="hino/[id]"
          options={{
            presentation: 'card',
            animation: 'none',
            gestureEnabled: true,
            fullScreenGestureEnabled: false,
            gestureResponseDistance: { start: 0, end: 32 },
          }}
        />
        <Stack.Screen
          name="partitura"
          options={{
            presentation: 'card',
            animation: 'none',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
    </>
  );
}
