import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface KeypadProps {
  onDigitPress: (digit: string) => void;
  onBackPress: () => void;
}

type KeypadItem =
  | { type: 'digit'; digit: string }
  | { type: 'backspace' }
  | { type: 'spacer' };

const KEYPAD_ROWS: KeypadItem[][] = [
  [
    { type: 'digit', digit: '1' },
    { type: 'digit', digit: '2' },
    { type: 'digit', digit: '3' },
  ],
  [
    { type: 'digit', digit: '4' },
    { type: 'digit', digit: '5' },
    { type: 'digit', digit: '6' },
  ],
  [
    { type: 'digit', digit: '7' },
    { type: 'digit', digit: '8' },
    { type: 'digit', digit: '9' },
  ],
  [
    { type: 'digit', digit: '0' },
    { type: 'backspace' },
    { type: 'spacer' },
  ],
];

export function Keypad({ onDigitPress, onBackPress }: KeypadProps) {
  return (
    <View style={styles.container}>
      {KEYPAD_ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, colIndex) => {
            if (item.type === 'digit') {
              return (
                <Pressable
                  key={item.digit}
                  accessibilityRole="button"
                  accessibilityLabel={item.digit}
                  onPress={() => onDigitPress(item.digit)}
                  style={({ pressed }) => [
                    styles.key,
                    pressed && styles.keyPressed,
                  ]}
                >
                  <Text style={styles.keyText}>{item.digit}</Text>
                </Pressable>
              );
            }

            if (item.type === 'backspace') {
              return (
                <Pressable
                  key="backspace"
                  accessibilityRole="button"
                  accessibilityLabel="Apagar"
                  onPress={onBackPress}
                  style={({ pressed }) => [
                    styles.key,
                    styles.keyBack,
                    pressed && styles.keyPressed,
                  ]}
                >
                  <Svg width={20} height={15} viewBox="0 0 20 15" fill="none">
                    <Path
                      d="M7 1H18.5C19 1 19 1.5 19 1.5V13.5C19 13.5 19 14 18.5 14H7L1 7.5L7 1Z"
                      stroke={THEME_COLORS.muted}
                      strokeWidth={1.4}
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M10 5L15 10M15 5L10 10"
                      stroke={THEME_COLORS.muted}
                      strokeWidth={1.4}
                      strokeLinecap="round"
                    />
                  </Svg>
                </Pressable>
              );
            }

            return (
              <View
                key={`spacer-${colIndex}`}
                style={styles.keySpacer}
                aria-hidden={true}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Keypad;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  key: {
    flex: 1,
    aspectRatio: 1 / 0.82,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    backgroundColor: THEME_COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  keyBack: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME_COLORS.line,
  },
  keySpacer: {
    flex: 1,
    aspectRatio: 1 / 0.82,
  },
  keyText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 21,
    color: THEME_COLORS.cream,
  },
});
