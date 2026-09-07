import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { MOCK_HINOS } from '../../data/mockHinos';
import { HinoListItem } from '../../components/hino/HinoListItem';

export default function HinosScreen() {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={MOCK_HINOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HinoListItem hino={item} />}
        ListHeaderComponent={
          <View className="p-4 bg-gray-50 border-b border-gray-200">
            <Text className="text-sm text-gray-500">
              Total de hinos disponíveis: {MOCK_HINOS.length}
            </Text>
          </View>
        }
      />
    </View>
  );
}
