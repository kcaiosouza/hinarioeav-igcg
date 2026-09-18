import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { SuggestedHymn } from '../../services/assistantService';

export interface HymnCardProps {
  hymn: SuggestedHymn;
  onPress: (hymn: SuggestedHymn) => void;
}

export const HymnCard = React.memo(function HymnCard({ hymn, onPress }: HymnCardProps) {
  const cleanSnippet = (hymn.firstStanza || '')
    .split('\n')
    .slice(0, 2)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Hino ${hymn.number} ${hymn.title}`}
      onPress={() => onPress(hymn)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.badgeRow}>
          <Text style={styles.musicNote}>🎵</Text>
          <Text style={styles.badgeText}>
            Hino {hymn.number}
          </Text>
        </View>
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

      {cleanSnippet ? (
        <Text style={styles.stanza} numberOfLines={2}>
          "{cleanSnippet}"
        </Text>
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME_COLORS.surfaceRaised,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
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
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  musicNote: {
    fontSize: 13,
  },
  badgeText: {
    fontFamily: THEME_FONTS.sansSemiBold,
    fontSize: 12,
    color: THEME_COLORS.goldSoft,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: THEME_FONTS.serifSemiBold,
    fontSize: 15,
    color: THEME_COLORS.cream,
    fontWeight: '600',
    marginBottom: 4,
  },
  stanza: {
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 12.5,
    lineHeight: 17,
    color: THEME_COLORS.muted,
    fontStyle: 'italic',
  },
});
