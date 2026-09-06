import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { MOCK_HINOS } from '../../data/mockHinos';
import { Hino } from '../../types/hino';
import { Toast } from '../../components/ui/Toast';

export default function HinoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [hino, setHino] = useState<Hino | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);

  useEffect(() => {
    const found = MOCK_HINOS.find((h) => h.id === id || String(h.numero) === id);
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
  }, [id, router]);

  if (!hino) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-gray-500">Carregando hino...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Hino ${hino.numero}`,
          headerBackTitle: 'Voltar',
          headerRight: () => (
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => setFontSize((s) => Math.max(14, s - 2))}
                className="px-2 py-1 bg-gray-100 rounded"
              >
                <Text className="text-sm font-bold text-gray-700">A-</Text>
              </Pressable>
              <Pressable
                onPress={() => setFontSize((s) => Math.min(28, s + 2))}
                className="px-2 py-1 bg-gray-100 rounded"
              >
                <Text className="text-sm font-bold text-gray-700">A+</Text>
              </Pressable>
            </View>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-white p-5">
        <View className="mb-6 pb-4 border-b border-gray-200">
          <Text className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-1">
            {hino.categoria}
          </Text>
          <Text className="text-2xl font-bold text-gray-900">
            {hino.numero}. {hino.titulo}
          </Text>
        </View>

        {hino.estrofes.map((estrofe, idx) => (
          <View key={idx} className="mb-6">
            <Text className="text-xs font-bold text-gray-400 mb-1">Estrofe {idx + 1}</Text>
            <Text
              style={{ fontSize, lineHeight: fontSize * 1.5 }}
              className="text-gray-800"
            >
              {estrofe}
            </Text>
            {hino.coro && idx === 0 && (
              <View className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                <Text className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">
                  Coro
                </Text>
                <Text
                  style={{ fontSize, lineHeight: fontSize * 1.5 }}
                  className="italic text-blue-900 font-medium"
                >
                  {hino.coro}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </>
  );
}
