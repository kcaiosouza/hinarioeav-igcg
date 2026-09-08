import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { THEME_COLORS } from '../../constants/theme';
import { catalogSyncEvents } from '../../services/catalogSyncService';

export function TopProgressBar() {
  const [visible, setVisible] = useState(false);
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    return catalogSyncEvents.subscribe((ratio, active) => {
      if (active) {
        setVisible(true);
        opacity.value = withTiming(1, { duration: 200 });
        progress.value = withTiming(ratio, {
          duration: 250,
          easing: Easing.out(Easing.quad),
        });
      } else {
        progress.value = withTiming(1, { duration: 150 });
        opacity.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            progress.value = 0;
          }
        });
        setTimeout(() => setVisible(false), 400);
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${Math.min(100, Math.max(0, progress.value * 100))}%`,
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 99999,
    backgroundColor: 'transparent',
  },
  bar: {
    height: '100%',
    backgroundColor: THEME_COLORS.goldSoft,
    shadowColor: THEME_COLORS.gold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
});
