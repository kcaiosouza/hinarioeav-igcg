import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { SuggestedHymn } from '../../services/assistantService';

export interface HymnCardProps {
  hymn: SuggestedHymn;
  onPress: (hymn: SuggestedHymn) => void;
}

function getBookDisplayName(section?: string): string {
  const key = (section || '').toLowerCase().trim();
  switch (key) {
    case 'novo':
      return 'Hinário Novo';
    case 'hinos':
    case 'antigo':
      return 'Hinos';
    case 'canticos':
    case 'cantico':
      return 'Cânticos';
    case 'suplemento':
      return 'Suplemento';
    case 'diversos':
    case 'diverso':
      return 'Diversos';
    default:
      return 'Hino';
  }
}

export const HymnCard = React.memo(function HymnCard({ hymn, onPress }: HymnCardProps) {
  const bookName = useMemo(() => getBookDisplayName(hymn.section), [hymn.section]);

  const snippet = useMemo(() => {
    if (!hymn.firstStanza) return undefined;
    return hymn.firstStanza.replace(/\r?\n/g, ' ').trim();
  }, [hymn.firstStanza]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${bookName} nº ${hymn.number} ${hymn.title}`}
      onPress={() => onPress(hymn)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.badge}>
          {bookName} · nº {hymn.number}
        </Text>
        <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <Path
            d="M5 2.5L9.5 7L5 11.5"
            stroke={THEME_COLORS.goldSoft}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {hymn.title}
      </Text>

      {snippet ? (
        <Text style={styles.snippet} numberOfLines={2}>
          {snippet}
        </Text>
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME_COLORS.surfaceRaised,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
  },
  cardPressed: {
    backgroundColor: '#43684B',
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badge: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  title: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 16.5,
    color: THEME_COLORS.cream,
    marginTop: 1,
  },
  snippet: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 13,
    color: THEME_COLORS.mutedDim,
    marginTop: 4,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
