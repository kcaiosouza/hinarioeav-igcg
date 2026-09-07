import { BookKey } from '../types/hinario';

/**
 * Retorna o título para a barra de navegação superior do hino:
 * - Hinos: H1, H2, ...
 * - Cânticos: C1, C2, ...
 * - Suplemento: S1, S2, ...
 * - Hinário Novo: Hino 1, Hino 2, ...
 * - Diversos: D1, D2, ...
 */
export function getHymnNavTitle(
  bookKey: BookKey | string | undefined | null,
  numero: number | undefined | null,
  fallbackCategoria?: string
): string {
  if (numero === undefined || numero === null || numero <= 0) {
    return fallbackCategoria || "Hino";
  }

  const normalizedKey = bookKey ? bookKey.toLowerCase().trim() : "hinos";

  if (normalizedKey === "novo") {
    return `Hino ${numero}`;
  }

  if (normalizedKey === "diversos" || normalizedKey === "diverso") {
    return `D${numero}`;
  }

  if (normalizedKey === "canticos" || normalizedKey === "cantico") {
    return `C${numero}`;
  }

  if (normalizedKey === "suplemento" || normalizedKey === "suplementos") {
    return `S${numero}`;
  }

  return `H${numero}`;
}
