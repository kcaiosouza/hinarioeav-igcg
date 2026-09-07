import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { THEME_COLORS, THEME_FONTS } from "../../constants/theme";

export interface DisplayAreaProps {
  value: string;
  style?: StyleProp<ViewStyle>;
}

export function DisplayArea({ value, style }: DisplayAreaProps) {
  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.displayBox}>
        {hasValue ? (
          <Text style={styles.number}>{value}</Text>
        ) : (
          <Text style={styles.placeholder}>Nº do hino</Text>
        )}
      </View>
    </View>
  );
}

export default DisplayArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 70,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  displayBox: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 56,
    color: THEME_COLORS.cream,
    minHeight: 60,
    letterSpacing: 1,
    textAlign: "center",
  },
  placeholder: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 22,
    color: THEME_COLORS.mutedDim,
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
