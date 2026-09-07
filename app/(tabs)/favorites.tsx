import React from 'react';
import { View, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-3xl mb-2">⭐</Text>
      <Text className="text-lg font-semibold text-gray-800 mb-1">Favoritos</Text>
      <Text className="text-sm text-gray-500 text-center">
        Seus hinos favoritos aparecerão aqui.
      </Text>
    </View>
  );
}
