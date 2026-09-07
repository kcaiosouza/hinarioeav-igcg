import { BookInfo, BookKey, SearchResult } from '../types/hinario';

export const INITIAL_BOOKS: Record<BookKey, BookInfo> = {
  hinos: {
    key: 'hinos',
    label: 'H',
    name: 'Hinos',
    data: {
      '1': 'Chuvas de Bênçãos',
      '124': 'Grande é o Senhor',
    },
  },
  canticos: {
    key: 'canticos',
    label: 'C',
    name: 'Cânticos',
    data: {
      '7': 'Deus é Amor',
      '200': 'Vaso de Barro',
    },
  },
  suplemento: {
    key: 'suplemento',
    label: 'S',
    name: 'Suplemento',
    data: {
      '45': 'Ainda que a Figueira',
      '82': 'Digno é o Senhor',
    },
  },
  novo: {
    key: 'novo',
    label: 'N',
    name: 'Hinário Novo',
    data: {
      '1': 'Chuvas de Bênçãos',
      '7': 'Deus é Amor',
      '124': 'Grande é o Senhor',
      '200': 'Vaso de Barro',
      '300': 'Ele é Fiel',
    },
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
