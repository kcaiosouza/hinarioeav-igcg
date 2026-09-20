import { BookKey } from '../types/hinario';
import { Hino } from '../types/hino';
import { normalizeSearchText } from './textNormalize';

export interface Section {
  raw: string;
  norm: string;
}

export interface SearchHymnItem {
  id: string;
  number: string;
  title: string;
  bookName: string;
  bookKey: BookKey;
  category?: string;
  defaultSnippet?: string;
  normNumber: string;
  normTitle: string;
  normBook: string;
  normLyrics: string;
  sections: Section[];
}

export interface ScoredHymnResult extends SearchHymnItem {
  snippet?: string;
  score: number;
}

export function buildSearchCatalog(
  rawList: Array<Hino & { bookKey: BookKey }>
): SearchHymnItem[] {
  return rawList.map((hino) => {
    const rawSections: string[] = [];
    if (hino.estrofes && hino.estrofes.length > 0) {
      rawSections.push(...hino.estrofes);
    }
    if (hino.coro) {
      rawSections.push(hino.coro);
    }

    const sections: Section[] = rawSections.map((raw) => ({
      raw,
      norm: normalizeSearchText(raw),
    }));

    const firstLyrics = (hino.estrofes && hino.estrofes[0]) || hino.coro || '';
    const defaultSnippet = firstLyrics
      ? firstLyrics.replace(/\r?\n/g, ' ').slice(0, 80) + '...'
      : undefined;

    const allLyrics = [
      hino.titulo,
      ...(hino.estrofes || []),
      hino.coro || '',
    ].join(' ');

    return {
      id: hino.id,
      number: String(hino.numero),
      title: hino.titulo,
      bookName: hino.categoria,
      bookKey: hino.bookKey,
      category: hino.categoria,
      defaultSnippet,
      normNumber: normalizeSearchText(String(hino.numero)),
      normTitle: normalizeSearchText(hino.titulo),
      normBook: normalizeSearchText(hino.categoria),
      normLyrics: normalizeSearchText(allLyrics),
      sections,
    };
  });
}

export function filterAndScoreHymns(
  catalog: SearchHymnItem[],
  rawQuery: string
): ScoredHymnResult[] {
  const normalizedQuery = normalizeSearchText(rawQuery);
  if (!normalizedQuery) {
    return catalog.map((item) => ({
      ...item,
      snippet: item.defaultSnippet,
      score: 0,
    }));
  }

  const isNumericQuery = /^\d+$/.test(normalizedQuery);
  const scoredItems: ScoredHymnResult[] = [];

  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    let score = 0;

    // Regras de pontuação:
    if (item.normNumber === normalizedQuery) {
      score = 100;
    } else if (item.normNumber.startsWith(normalizedQuery)) {
      score = 80;
    } else if (item.normTitle === normalizedQuery) {
      score = 90;
    } else if (item.normTitle.includes(normalizedQuery)) {
      score = 70;
    } else if (!isNumericQuery && item.normLyrics.includes(normalizedQuery)) {
      score = 50;
    } else if (item.normBook.includes(normalizedQuery)) {
      score = 20;
    }

    if (score > 0) {
      let matchingSnippet = item.defaultSnippet;

      // Se bateu na letra, busca a estrofe ou coro específica para o snippet
      if (score === 50) {
        for (let s = 0; s < item.sections.length; s++) {
          if (item.sections[s].norm.includes(normalizedQuery)) {
            matchingSnippet =
              item.sections[s].raw.replace(/\r?\n/g, ' ').slice(0, 80) + '...';
            break;
          }
        }
      }

      scoredItems.push({
        ...item,
        snippet: matchingSnippet,
        score,
      });
    }
  }

  scoredItems.sort(
    (a, b) =>
      b.score - a.score ||
      (Number(a.number) || 0) - (Number(b.number) || 0)
  );

  return scoredItems;
}
