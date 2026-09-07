import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActiveBookRow } from "../components/hinario/ActiveBookRow";
import { BookSelect } from "../components/hinario/BookSelect";
import { DisplayArea } from "../components/hinario/DisplayArea";
import { Keypad } from "../components/hinario/Keypad";
import { SearchCTA } from "../components/hinario/SearchCTA";
import { SideDrawer } from "../components/hinario/SideDrawer";
import { ToastNotice, ToastSuggestion } from "../components/hinario/ToastNotice";
import { TopBar } from "../components/hinario/TopBar";
import { THEME_COLORS } from "../constants/theme";
import { INITIAL_BOOKS, searchHinario } from "../data/mockHinario";
import { BookInfo, BookKey } from "../types/hinario";

export default function MainScreen() {
  const router = useRouter();

  const [books, setBooks] = useState<Record<BookKey, BookInfo>>(INITIAL_BOOKS);
  const [activeKey, setActiveKey] = useState<BookKey>("hinos");
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    bookName: string;
    message: string;
    suggestion?: ToastSuggestion;
  } | null>(null);

  const handleMenuPress = () => {
    setIsDrawerOpen(true);
  };

  const handleSelectBook = (key: BookKey) => {
    setActiveKey(key);
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
    setToast(null);
    if (currentNumber.length < 4) {
      setCurrentNumber((prev) => prev + digit);
    }
  };

  const handleBackPress = () => {
    setToast(null);
    setCurrentNumber((prev) => prev.slice(0, -1));
  };

  const handleSelectHymn = (number: string, bookKey: BookKey) => {
    const title = books[bookKey]?.data[number] ?? "";
    router.push({
      pathname: "/hino/[id]",
      params: { id: number, book: bookKey, title },
    });
  };

  const handleSearch = () => {
    const result = searchHinario(books, activeKey, currentNumber);
    if (result.type === "empty") {
      setToast({
        visible: true,
        bookName: result.bookName,
        message: result.message,
      });
    } else if (result.type === "found") {
      setToast(null);
      handleSelectHymn(result.number, result.bookKey);
    } else if (result.type === "suggestion") {
      setToast({
        visible: true,
        bookName: result.activeBookName,
        message: `O hino nº ${result.number} ainda não está no ${result.activeBookName}.`,
        suggestion: {
          title: `Encontramos no ${result.suggestedBookName}: “${result.title}”`,
          actionLabel: `Ver no ${result.suggestedBookName}`,
          onAction: () => handleGoToBook(result.suggestedBookKey, result.number),
        },
      });
    }
  };

  const handleGoToBook = (bookKey: BookKey, hymnNumber?: string) => {
    const targetNumber = hymnNumber ?? currentNumber;
    setActiveKey(bookKey);
    setToast(null);
    const result = searchHinario(books, bookKey, targetNumber);
    if (result.type === "found") {
      handleSelectHymn(result.number, result.bookKey);
    } else if (result.type === "empty") {
      setToast({
        visible: true,
        bookName: result.bookName,
        message: result.message,
      });
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
          bookName={toast?.bookName ?? ""}
          message={toast?.message ?? ""}
          suggestion={toast?.suggestion}
          onClose={() => setToast(null)}
        />
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <DisplayArea value={currentNumber} />
          <Keypad
            onDigitPress={handleDigitPress}
            onBackPress={handleBackPress}
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
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 16,
    width: "100%",
    backgroundColor: THEME_COLORS.bg,
  },
});
