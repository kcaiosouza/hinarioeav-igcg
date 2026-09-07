import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface SearchCTAProps {
  onPress: () => void;
  label?: string;
}

export function SearchCTA({ onPress, label = 'Buscar' }: SearchCTAProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cta,
        pressed && styles.ctaPressed,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

export default SearchCTA;

const styles = StyleSheet.create({
  cta: {
    width: '100%',
    borderRadius: 100,
    backgroundColor: THEME_COLORS.goldSoft,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: {
    backgroundColor: '#8fa07a',
  },
  text: {
    fontFamily: THEME_FONTS.inter.bold,
    fontSize: 16,
    color: THEME_COLORS.ink,
    textAlign: 'center',
  },
});
