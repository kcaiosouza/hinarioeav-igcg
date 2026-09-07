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
import { ToastNotice } from '../components/hinario/ToastNotice';
import { SideDrawer } from '../components/hinario/SideDrawer';

export default function MainScreen() {
  const router = useRouter();

  const [books, setBooks] = useState<Record<BookKey, BookInfo>>(INITIAL_BOOKS);
  const [activeKey, setActiveKey] = useState<BookKey>('hinos');
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    bookName: string;
    message: string;
  } | null>(null);

  const handleMenuPress = () => {
    setIsDrawerOpen(true);
  };

  const handleSelectBook = (key: BookKey) => {
    setActiveKey(key);
    setSearchResult(null);
    setToast(null);
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

  const handleSelectHymn = (number: string, bookKey: BookKey) => {
    const title = books[bookKey]?.data[number] ?? '';
    router.push({
      pathname: '/hino/[id]',
      params: { id: number, book: bookKey, title },
    });
  };

  const handleSearch = () => {
    const result = searchHinario(books, activeKey, currentNumber);
    if (result.type === 'empty') {
      setToast({
        visible: true,
        bookName: result.bookName,
        message: result.message,
      });
      setSearchResult(null);
    } else if (result.type === 'found') {
      setToast(null);
      setSearchResult(null);
      handleSelectHymn(result.number, result.bookKey);
    } else if (result.type === 'suggestion') {
      setToast(null);
      setSearchResult(result);
    }
  };

  const handleGoToBook = (bookKey: BookKey) => {
    setActiveKey(bookKey);
    const result = searchHinario(books, bookKey, currentNumber);
    if (result.type === 'found') {
      setToast(null);
      setSearchResult(null);
      handleSelectHymn(result.number, result.bookKey);
    } else if (result.type === 'empty') {
      setToast({
        visible: true,
        bookName: result.bookName,
        message: result.message,
      });
      setSearchResult(null);
    } else {
      setToast(null);
      setSearchResult(result);
    }
  };

  const activeBook = books[activeKey];

  return (
    <SafeAreaView style={styles.safeArea}>
      <SideDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeRoute="/"
      />
      <View style={styles.wrapper}>
        <TopBar onMenuPress={handleMenuPress} />
        <ToastNotice
          visible={!!toast?.visible}
          bookName={toast?.bookName ?? ''}
          message={toast?.message ?? ''}
          onClose={() => setToast(null)}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
          <ResultArea
            result={searchResult}
            onSelectHymn={handleSelectHymn}
            onGoToBook={handleGoToBook}
          />
        </ScrollView>
        <View style={styles.footer}>
          <SearchCTA onPress={handleSearch} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 16,
    width: '100%',
    backgroundColor: THEME_COLORS.bg,
  },
});
