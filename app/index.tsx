import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { THEME_COLORS } from '../constants/theme';
import { INITIAL_BOOKS, searchHinario } from '../data/mockHinario';
import { BookInfo, BookKey, SearchResult } from '../types/hinario';
import { TopBar } from '../components/hinario/TopBar';
import { BookSelect } from '../components/hinario/BookSelect';
import { ActiveBookRow } from '../components/hinario/ActiveBookRow';
import { DisplayArea } from '../components/hinario/DisplayArea';
import { Keypad } from '../components/hinario/Keypad';
import { SearchCTA } from '../components/hinario/SearchCTA';
import { ResultArea } from '../components/hinario/ResultArea';

export default function MainScreen() {
  const router = useRouter();

  const [books, setBooks] = useState<Record<BookKey, BookInfo>>(INITIAL_BOOKS);
  const [activeKey, setActiveKey] = useState<BookKey>('hinos');
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Funcionalidades adicionais em breve.');
  };

  const handleSelectBook = (key: BookKey) => {
    setActiveKey(key);
    setSearchResult(null);
  };

  const handleRename = (newName: string) => {
    setBooks((prev) => ({
      ...prev,
      novo: {
        ...prev.novo,
        name: newName,
      },
    }));
  };

  const handleDigitPress = (digit: string) => {
    if (currentNumber.length < 4) {
      setCurrentNumber((prev) => prev + digit);
    }
  };

  const handleBackPress = () => {
    setCurrentNumber((prev) => prev.slice(0, -1));
  };

  const handleSearch = () => {
    const result = searchHinario(books, activeKey, currentNumber);
    setSearchResult(result);
  };

  const handleSelectHymn = (number: string, bookKey: BookKey) => {
    const title = books[bookKey]?.data[number] ?? '';
    router.push({
      pathname: '/hino/[id]',
      params: { id: number, book: bookKey, title },
    });
  };

  const handleGoToBook = (bookKey: BookKey) => {
    setActiveKey(bookKey);
    const result = searchHinario(books, bookKey, currentNumber);
    setSearchResult(result);
  };

  const activeBook = books[activeKey];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TopBar onMenuPress={handleMenuPress} />
          <BookSelect
            activeKey={activeKey}
            onSelect={handleSelectBook}
            books={books}
          />
          <ActiveBookRow
            activeKey={activeKey}
            bookName={activeBook.name}
            onRename={handleRename}
          />
          <DisplayArea value={currentNumber} />
          <Keypad
            onDigitPress={handleDigitPress}
            onBackPress={handleBackPress}
          />
          <SearchCTA onPress={handleSearch} />
          <ResultArea
            result={searchResult}
            onSelectHymn={handleSelectHymn}
            onGoToBook={handleGoToBook}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 12,
  },
  container: {
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
});
