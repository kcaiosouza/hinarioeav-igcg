import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../constants/theme';
import {
  FavoriteItem,
  getFavorites,
  removeFavorite,
  subscribeFavorites,
} from '../services/favoritesService';
import { Toast } from '../components/ui/Toast';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      getFavorites().then((list) => {
        if (isMounted) {
          setFavorites(list);
        }
      });
      return () => {
        isMounted = false;
      };
    }, [])
  );

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = subscribeFavorites((list) => {
      if (isMounted) {
        setFavorites(list);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSelectHymn = (item: FavoriteItem) => {
    router.push({
      pathname: '/hino/[id]',
      params: { id: item.number, book: item.bookKey, title: item.title },
    });
  };

  const handleRemoveFavorite = async (id: string) => {
    const updated = await removeFavorite(id);
    setFavorites(updated);
    Toast.show('Hino removido dos favoritos');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.topbar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            hitSlop={8}
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 19l-7-7 7-7"
                stroke={THEME_COLORS.cream}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
          <Text style={styles.headerTitle}>Favoritos</Text>
          <View style={styles.ghostSpacer} />
        </View>

        {/* Favorites List */}
        <FlatList
          data={favorites}
          keyExtractor={(item) => `${item.bookKey}-${item.number}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>⭐</Text>
              <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
              <Text style={styles.emptySubtitle}>
                Seus hinos favoritados aparecerão aqui para acesso rápido.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.bookName} ${item.number} ${item.title}`}
              onPress={() => handleSelectHymn(item)}
              style={({ pressed }) => [
                styles.itemCard,
                pressed && styles.itemCardPressed,
              ]}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemBadge}>
                  {item.bookName} · nº {item.number}
                </Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Remover dos favoritos"
                hitSlop={10}
                onPress={() => handleRemoveFavorite(item.id)}
                style={styles.starBtn}
              >
                <Text style={styles.starIcon}>⭐</Text>
              </Pressable>
            </Pressable>
          )}
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
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  headerTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 20,
    color: THEME_COLORS.cream,
  },
  ghostSpacer: {
    width: 38,
    height: 38,
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 24,
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemCardPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemBadge: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginBottom: 4,
  },
  itemTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 17,
    color: THEME_COLORS.cream,
  },
  starBtn: {
    padding: 6,
  },
  starIcon: {
    fontSize: 20,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 14,
    color: THEME_COLORS.muted,
    textAlign: 'center',
    maxWidth: 260,
  },
});
