import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { THEME_COLORS } from '../../constants/theme';
import { catalogSyncEvents } from '../../services/catalogSyncService';

export function TopProgressBar() {
  const insets = useSafeAreaInsets();
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
        opacity.value = withTiming(1, { duration: 180 });
        progress.value = withTiming(ratio, {
          duration: 250,
          easing: Easing.out(Easing.quad),
        });
      } else {
        progress.value = withTiming(1, { duration: 150 });
        opacity.value = withTiming(0, { duration: 350 }, (finished) => {
          if (finished) {
            progress.value = 0;
          }
        });
        hideTimerRef.current = setTimeout(() => {
          setVisible(false);
          hideTimerRef.current = null;
        }, 450);
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
    width: `${Math.min(100, Math.max(0, progress.value * 100))}%`,
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={[styles.container, { top: insets.top }]} pointerEvents="none">
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
    height: 3.5,
    zIndex: 999999,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: THEME_COLORS.goldSoft,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 20,
  },
});
