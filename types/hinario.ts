export type BookKey = 'hinos' | 'canticos' | 'suplemento' | 'novo' | 'diversos';

export interface BookInfo {
  key: BookKey;
  label: string;
  name: string;
  data: Record<string, string>;
}

export interface SearchResultSuccess {
  type: 'found';
  bookKey: BookKey;
  bookName: string;
  number: string;
  title: string;
}

export interface SearchResultSuggestion {
  type: 'suggestion';
  activeBookName: string;
  number: string;
  suggestedBookKey: BookKey;
  suggestedBookName: string;
  title: string;
}

export interface SearchResultEmpty {
  type: 'empty';
  bookName: string;
  message: string;
}

export type SearchResult = SearchResultSuccess | SearchResultSuggestion | SearchResultEmpty;
