import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { BookKey, SearchResult } from '../../types/hinario';

export interface ResultAreaProps {
  result: SearchResult | null;
  onSelectHymn: (number: string, bookKey: BookKey) => void;
  onGoToBook: (bookKey: BookKey) => void;
}

export function ResultArea({ result, onSelectHymn, onGoToBook }: ResultAreaProps) {
  if (!result) {
    return null;
  }

  if (result.type === 'found') {
    return (
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${result.bookName} · hino ${result.number} - ${result.title}`}
          onPress={() => onSelectHymn(result.number, result.bookKey)}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.subtitle}>
            {result.bookName} · hino {result.number}
          </Text>
          <Text style={styles.foundTitle}>{result.title}</Text>
        </Pressable>
      </View>
    );
  }

  if (result.type === 'suggestion') {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>{result.activeBookName}</Text>
          <Text style={styles.messageText}>
            O hino nº {result.number} ainda não está no {result.activeBookName}.
          </Text>
        </View>

        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>
            Encontramos no {result.suggestedBookName}: “{result.title}”
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ver no ${result.suggestedBookName}`}
            onPress={() => onGoToBook(result.suggestedBookKey)}
            style={({ pressed }) => [
              styles.goBtn,
              pressed && styles.goBtnPressed,
            ]}
          >
            <Text style={styles.goBtnText}>
              Ver no {result.suggestedBookName}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (result.type === 'empty') {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>{result.bookName}</Text>
          <Text style={styles.messageText}>{result.message}</Text>
        </View>
      </View>
    );
  }

  return null;
}

export default ResultArea;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 10,
  },
  card: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  subtitle: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginBottom: 4,
  },
  foundTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
  },
  messageText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: THEME_COLORS.muted,
  },
  suggestionCard: {
    backgroundColor: 'rgba(218, 215, 205, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.35)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  suggestionTitle: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: THEME_COLORS.sage,
  },
  goBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: THEME_COLORS.sage,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  goBtnPressed: {
    backgroundColor: 'rgba(218, 215, 205, 0.12)',
  },
  goBtnText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 13,
    color: THEME_COLORS.sage,
  },
});
