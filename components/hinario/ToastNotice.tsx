import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface ToastNoticeProps {
  visible: boolean;
  bookName: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function ToastNotice({
  visible,
  bookName,
  message,
  onClose,
  duration = 4000,
}: ToastNoticeProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      opacity.setValue(0);
      translateY.setValue(-12);
    }
  }, [visible, message, duration]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.bookLabel}>{bookName}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar aviso"
            hitSlop={12}
            onPress={handleDismiss}
            style={({ pressed }) => [
              styles.closeBtn,
              pressed && styles.closeBtnPressed,
            ]}
          >
            <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <Path
                d="M2 2L12 12M12 2L2 12"
                stroke={THEME_COLORS.muted}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>
        </View>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bookLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  closeBtn: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  closeBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  messageText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 14,
    color: THEME_COLORS.cream,
    lineHeight: 20,
  },
});
