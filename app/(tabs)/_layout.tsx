import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#94a3b8',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hinos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📖</Text>,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⭐</Text>,
        }}
      />
    </Tabs>
  );
}
