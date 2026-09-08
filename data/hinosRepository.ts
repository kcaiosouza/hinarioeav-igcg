import hinosData from './hinosData.json';
import { BookKey } from '../types/hinario';
import { Hino } from '../types/hino';
import { validateCatalogJson } from '../services/catalogVersionUtils';

export type HinosDataStructure = Record<string, Record<string, Hino>>;

let typedData: HinosDataStructure = hinosData as unknown as HinosDataStructure;
const listeners = new Set<() => void>();

export function subscribeToCatalogUpdates(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function reloadCatalogWithData(newData: HinosDataStructure): void {
  typedData = newData;
  for (const listener of listeners) {
    try {
      listener();
    } catch (err) {
      console.warn('Erro ao notificar listener do catalogo:', err);
    }
  }
}

export async function initCatalogFromStorage(): Promise<void> {
  try {
    const { File, Paths } = await import('expo-file-system');
    const localFile = new File(Paths.document, 'hinosData.json');
    if (localFile.exists) {
      const text = await localFile.text();
      if (validateCatalogJson(text)) {
        typedData = JSON.parse(text) as HinosDataStructure;
      }
    }
  } catch (error) {
    // Falha silenciosa: continua usando typedData embutido do bundle
  }
}

export function getHino(bookKey: string, numberOrId: string | number): Hino | null {
  const key = String(numberOrId);
  if (typedData[bookKey] && typedData[bookKey][key]) {
    return typedData[bookKey][key];
  }
  return null;
}

export function findHinoAnyBook(numberOrId: string | number): { hino: Hino; bookKey: BookKey } | null {
  const key = String(numberOrId);
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    if (typedData[bKey]?.[key]) {
      return { hino: typedData[bKey][key], bookKey: bKey };
    }
  }
  return null;
}

export function getBookTitles(bookKey: string): Record<string, string> {
  const book = typedData[bookKey] || {};
  const map: Record<string, string> = {};
  for (const [num, hino] of Object.entries(book)) {
    map[num] = hino.titulo;
  }
  return map;
}

export function getAllHymnsList(): Array<Hino & { bookKey: BookKey }> {
  const list: Array<Hino & { bookKey: BookKey }> = [];
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    const book = typedData[bKey] || {};
    for (const hino of Object.values(book)) {
      list.push({ ...hino, bookKey: bKey });
    }
  }
  return list;
}
