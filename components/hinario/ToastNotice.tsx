import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

export interface ToastSuggestion {
  title: string;
  actionLabel: string;
  onAction: () => void;
}

export interface ToastNoticeProps {
  visible: boolean;
  bookName: string;
  message: string;
  suggestion?: ToastSuggestion;
  onClose: () => void;
  duration?: number;
}

export function ToastNotice({
  visible,
  bookName,
  message,
  suggestion,
  onClose,
  duration,
}: ToastNoticeProps) {
  const effectiveDuration = duration ?? (suggestion ? 7000 : 4000);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDismiss = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleActionPress = () => {
    if (suggestion) {
      handleDismiss();
      suggestion.onAction();
    }
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(-12);
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

      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, effectiveDuration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      opacity.setValue(0);
      translateY.setValue(-12);
    }
  }, [visible, message, suggestion, effectiveDuration]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy < -5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy <= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -25 || gestureState.vy < -0.4) {
          handleDismiss();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
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

        {suggestion && (
          <View style={styles.suggestionBox}>
            <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={suggestion.actionLabel}
              onPress={handleActionPress}
              style={({ pressed }) => [
                styles.actionBtn,
                pressed && styles.actionBtnPressed,
              ]}
            >
              <Text style={styles.actionBtnText}>{suggestion.actionLabel}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
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
  suggestionBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.line,
    gap: 8,
  },
  suggestionTitle: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 13,
    color: THEME_COLORS.sage,
    lineHeight: 18,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: THEME_COLORS.sage,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  actionBtnPressed: {
    backgroundColor: 'rgba(218, 215, 205, 0.12)',
  },
  actionBtnText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    color: THEME_COLORS.sage,
  },
});
