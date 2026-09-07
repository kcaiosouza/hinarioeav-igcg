import { BookInfo, BookKey, SearchResult } from '../types/hinario';
import { getBookTitles } from './hinosRepository';

export const INITIAL_BOOKS: Record<BookKey, BookInfo> = {
  hinos: {
    key: 'hinos',
    label: 'H',
    name: 'Hinos',
    data: getBookTitles('hinos'),
  },
  canticos: {
    key: 'canticos',
    label: 'C',
    name: 'Cânticos',
    data: getBookTitles('canticos'),
  },
  suplemento: {
    key: 'suplemento',
    label: 'S',
    name: 'Suplemento',
    data: getBookTitles('suplemento'),
  },
  novo: {
    key: 'novo',
    label: 'N',
    name: 'Hinário Novo',
    data: getBookTitles('novo'),
  },
  diversos: {
    key: 'diversos',
    label: 'D',
    name: 'Diversos',
    data: getBookTitles('diversos'),
  },
};

export const OLD_BOOKS_ORDER: BookKey[] = ['hinos', 'canticos', 'suplemento'];

export function searchHinario(
  books: Record<BookKey, BookInfo>,
  activeKey: BookKey,
  number: string
): SearchResult {
  const currentBook = books[activeKey];
  const trimmed = number.trim();

  if (!trimmed) {
    return {
      type: 'empty',
      bookName: currentBook.name,
      message: 'Digite o número do hino para buscar.',
    };
  }

  const title = currentBook.data[trimmed];
  if (title) {
    return {
      type: 'found',
      bookKey: activeKey,
      bookName: currentBook.name,
      number: trimmed,
      title,
    };
  }

  // If in "novo", check older books for suggestion
  if (activeKey === 'novo') {
    for (const oldKey of OLD_BOOKS_ORDER) {
      const oldTitle = books[oldKey].data[trimmed];
      if (oldTitle) {
        return {
          type: 'suggestion',
          activeBookName: currentBook.name,
          number: trimmed,
          suggestedBookKey: oldKey,
          suggestedBookName: books[oldKey].name,
          title: oldTitle,
        };
      }
    }
  }

  return {
    type: 'empty',
    bookName: currentBook.name,
    message: `Não encontramos o hino nº ${trimmed} neste hinário.`,
  };
}
