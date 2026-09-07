import { getHino } from '../data/hinosRepository';

export interface AdjacentHymnResult {
  numero: number;
  titulo: string;
}

export function getAdjacentHymn(
  bookKey: string,
  currentNumber: number | string,
  direction: 'prev' | 'next'
): AdjacentHymnResult | null {
  const num = typeof currentNumber === 'string' ? parseInt(currentNumber, 10) : currentNumber;
  if (isNaN(num)) return null;

  const targetNum = direction === 'prev' ? num - 1 : num + 1;
  if (targetNum < 1) return null;

  const hino = getHino(bookKey, targetNum);
  if (!hino) return null;

  return {
    numero: targetNum,
    titulo: hino.titulo,
  };
}

export function canNavigate(
  bookKey: string,
  currentNumber: number | string,
  direction: 'prev' | 'next'
): boolean {
  return getAdjacentHymn(bookKey, currentNumber, direction) !== null;
}
