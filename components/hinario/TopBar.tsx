import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface TopBarProps {
  onMenuPress?: () => void;
}

export function TopBar({ onMenuPress }: TopBarProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Menu"
        onPress={onMenuPress}
        style={({ pressed }) => [
          styles.iconBtn,
          pressed && styles.iconBtnPressed,
        ]}
      >
        <View style={styles.hamburger}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      </Pressable>

      <Text style={styles.wordmark}>Hinário</Text>

      <View style={styles.ghostSpacer} aria-hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingTop: 2,
    paddingBottom: 18,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    backgroundColor: THEME_COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  hamburger: {
    width: 18,
    height: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bar: {
    width: 18,
    height: 1.6,
    borderRadius: 1,
    backgroundColor: THEME_COLORS.cream,
  },
  wordmark: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 21,
    color: THEME_COLORS.cream,
    letterSpacing: 0.2,
  },
  ghostSpacer: {
    width: 38,
    height: 38,
    backgroundColor: 'transparent',
  },
});
