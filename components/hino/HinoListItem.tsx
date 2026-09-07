import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Hino } from '../../types/hino';

interface HinoListItemProps {
  hino: Hino;
}

export function HinoListItem({ hino }: HinoListItemProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/hino/${hino.id}` as any)}
      className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50 bg-white"
    >
      <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
        <Text className="text-blue-600 font-bold text-sm">{hino.numero}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{hino.titulo}</Text>
        <Text className="text-xs text-gray-500 mt-0.5">{hino.categoria}</Text>
      </View>
      <Text className="text-gray-400 text-lg">›</Text>
    </Pressable>
  );
}
