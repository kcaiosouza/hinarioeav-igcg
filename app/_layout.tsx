import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="hino/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
    </>
  );
}
