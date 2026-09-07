import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookKey } from '../types/hinario';

export interface FavoriteItem {
  id: string; // Composto: `${bookKey}-${number}`
  number: string;
  title: string;
  bookKey: BookKey;
  bookName: string;
  addedAt: number; // Date.now()
}

const STORAGE_KEY = '@igcg_hinario_favorites_v1';

let cachedFavorites: FavoriteItem[] | null = null;
const listeners = new Set<(favorites: FavoriteItem[]) => void>();

function notifyListeners(favorites: FavoriteItem[]) {
  listeners.forEach((listener) => {
    try {
      listener(favorites);
    } catch (e) {
      console.error('Error notifying favorite listener', e);
    }
  });
}

/**
 * Retorna todos os hinos favoritados, ordenados do mais recente para o mais antigo.
 */
export async function getFavorites(): Promise<FavoriteItem[]> {
  if (cachedFavorites !== null) {
    return cachedFavorites;
  }

  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) {
      cachedFavorites = [];
      return cachedFavorites;
    }
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      cachedFavorites = parsed.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    } else {
      cachedFavorites = [];
    }
  } catch (error) {
    console.error('Failed to load favorites from storage', error);
    cachedFavorites = [];
  }

  return cachedFavorites;
}

/**
 * Verifica se um determinado hino está na lista de favoritos.
 */
export async function isFavorite(
  bookKey: string,
  number: string | number
): Promise<boolean> {
  const list = await getFavorites();
  const id = `${bookKey}-${number}`;
  return list.some((item) => item.id === id || (item.bookKey === bookKey && String(item.number) === String(number)));
}

/**
 * Adiciona um hino à lista de favoritos.
 */
export async function addFavorite(
  item: Omit<FavoriteItem, 'id' | 'addedAt'>
): Promise<FavoriteItem[]> {
  const current = await getFavorites();
  const id = `${item.bookKey}-${item.number}`;

  // Se já existe, move para o topo atualizando timestamp
  const filtered = current.filter((f) => f.id !== id);
  const newItem: FavoriteItem = {
    ...item,
    id,
    number: String(item.number),
    addedAt: Date.now(),
  };

  const updated = [newItem, ...filtered];
  cachedFavorites = updated;

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save favorites to storage', error);
  }

  notifyListeners(updated);
  return updated;
}

/**
 * Remove um hino dos favoritos pelo seu ID composto (`${bookKey}-${number}`).
 */
export async function removeFavorite(id: string): Promise<FavoriteItem[]> {
  const current = await getFavorites();
  const updated = current.filter((item) => item.id !== id);
  cachedFavorites = updated;

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to remove favorite from storage', error);
  }

  notifyListeners(updated);
  return updated;
}

/**
 * Alterna o status de favorito de um hino (adiciona se não estiver, remove se estiver).
 */
export async function toggleFavorite(
  item: Omit<FavoriteItem, 'id' | 'addedAt'>
): Promise<{ isFav: boolean; favorites: FavoriteItem[] }> {
  const id = `${item.bookKey}-${item.number}`;
  const currentlyFav = await isFavorite(item.bookKey, item.number);

  if (currentlyFav) {
    const updated = await removeFavorite(id);
    return { isFav: false, favorites: updated };
  } else {
    const updated = await addFavorite(item);
    return { isFav: true, favorites: updated };
  }
}

/**
 * Inscreve um callback para ser executado sempre que os favoritos forem alterados.
 * Retorna uma função para cancelar a inscrição (unsubscribe).
 */
export function subscribeFavorites(
  listener: (favorites: FavoriteItem[]) => void
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
