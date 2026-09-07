import React, { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { MOCK_HINOS } from '../../data/mockHinos';
import { HinoListItem } from '../../components/hino/HinoListItem';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredHinos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return MOCK_HINOS;
    return MOCK_HINOS.filter((h) => {
      const matchNum = String(h.numero).includes(term);
      const matchTitle = h.titulo.toLowerCase().includes(term);
      const matchLetra = h.estrofes.some((e) => e.toLowerCase().includes(term));
      return matchNum || matchTitle || matchLetra;
    });
  }, [query]);

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200 bg-gray-50">
        <TextInput
          placeholder="Buscar por número, título ou letra..."
          value={query}
          onChangeText={setQuery}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-base text-gray-800"
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filteredHinos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HinoListItem hino={item} />}
        ListEmptyComponent={
          <View className="p-8 items-center justify-center">
            <Text className="text-gray-500 text-base">Nenhum hino encontrado para "{query}".</Text>
          </View>
        }
      />
    </View>
  );
}
