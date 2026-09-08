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
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return catalogSyncEvents.subscribe((ratio, active) => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
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
        hideTimerRef.current = setTimeout(() => {
          setVisible(false);
          hideTimerRef.current = null;
        }, 400);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: Math.min(1, Math.max(0, progress.value)) }],
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
    width: '100%',
    height: '100%',
    backgroundColor: THEME_COLORS.goldSoft,
    shadowColor: THEME_COLORS.gold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
    transformOrigin: 'left',
  },
});
