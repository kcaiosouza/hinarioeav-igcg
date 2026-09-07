import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { BookInfo, BookKey } from '../../types/hinario';

export interface BookSelectProps {
  activeKey: BookKey;
  onSelect: (key: BookKey) => void;
  books: Record<BookKey, BookInfo>;
}

const BOOK_KEYS: BookKey[] = ['hinos', 'canticos', 'suplemento', 'novo'];

export function BookSelect({ activeKey, onSelect, books }: BookSelectProps) {
  return (
    <View style={styles.container}>
      {BOOK_KEYS.map((key) => {
        const book = books[key];
        const isActive = key === activeKey;
        const label = book?.label ?? key.charAt(0).toUpperCase();

        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={book?.name ?? key}
            onPress={() => onSelect(key)}
            style={[
              styles.tab,
              isActive && styles.tabActive,
            ]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: THEME_COLORS.goldSoft,
  },
  tabText: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 17,
    color: THEME_COLORS.muted,
  },
  tabTextActive: {
    color: THEME_COLORS.ink,
  },
});
