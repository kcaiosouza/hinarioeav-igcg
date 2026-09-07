import hinosData from './hinosData.json';
import { BookKey } from '../types/hinario';
import { Hino } from '../types/hino';

type HinosDataStructure = Record<string, Record<string, Hino>>;
const typedData = hinosData as unknown as HinosDataStructure;

export function getHino(bookKey: string, numberOrId: string | number): Hino | null {
  const key = String(numberOrId);
  if (typedData[bookKey] && typedData[bookKey][key]) {
    return typedData[bookKey][key];
  }
  return null;
}

export function findHinoAnyBook(numberOrId: string | number): { hino: Hino; bookKey: BookKey } | null {
  const key = String(numberOrId);
  for (const bKey of ['hinos', 'canticos', 'suplemento'] as BookKey[]) {
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
  for (const bKey of ['hinos', 'canticos', 'suplemento'] as BookKey[]) {
    const book = typedData[bKey] || {};
    for (const hino of Object.values(book)) {
      list.push({ ...hino, bookKey: bKey });
    }
  }
  return list;
}
