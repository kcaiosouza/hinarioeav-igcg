import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import {
  checkAndSyncCatalog,
  getCurrentCatalogVersion,
  isCatalogUpdateAvailable,
  catalogSyncEvents,
} from '../../services/catalogSyncService';

export interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
  activeRoute?: string;
}

const PANEL_WIDTH = Math.min(Dimensions.get('window').width * 0.78, 310);

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route: string;
}

const MENU_ITEMS: MenuItem[] = [
  { key: 'hinario', label: 'Hinário', icon: '📖', route: '/' },
  { key: 'search', label: 'Buscar', icon: '🔍', route: '/search' },
  { key: 'favorites', label: 'Favoritos', icon: '⭐', route: '/favorites' },
];

export function SideDrawer({ visible, onClose, activeRoute = '/' }: SideDrawerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(visible);
  const [catalogVersion, setCatalogVersion] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  const slideAnim = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    if (isSyncing) {
      spinAnim.setValue(0);
      animation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      spinAnim.setValue(0);
    }
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isSyncing]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const refreshStatus = () => {
    getCurrentCatalogVersion()
      .then((ver) => {
        if (ver) setCatalogVersion(ver);
      })
      .catch(() => {});

    isCatalogUpdateAvailable()
      .then((updateAvailable) => {
        setHasUpdate(updateAvailable);
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshStatus();

    return catalogSyncEvents.subscribe((_ratio, active) => {
      setIsSyncing(active);
      if (!active) {
        refreshStatus();
      }
    });
  }, []);

  useEffect(() => {
    if (visible) {
      refreshStatus();
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -PANEL_WIDTH,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  const handleClose = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -PANEL_WIDTH,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowModal(false);
      onClose();
      if (callback) {
        callback();
      }
    });
  };

  const handleNavigate = (route: string) => {
    if (activeRoute === route) {
      handleClose();
    } else {
      handleClose(() => {
        router.push(route as any);
      });
    }
  };

  const handleSync = () => {
    if (isSyncing) return;
    void checkAndSyncCatalog({ force: true });
  };

  const handleCheckAlreadyUpdated = () => {
    if (isSyncing) return;
    void checkAndSyncCatalog({ notifyIfUpToDate: true });
  };

  const displayVersion = catalogVersion
    ? (catalogVersion.startsWith('v') ? catalogVersion : `v${catalogVersion}`)
    : 'v1.0.0';

  // Swipe left to close panel
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx < -8;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx <= 0) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50 || gestureState.vx < -0.4) {
          handleClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!showModal) return null;

  return (
    <Modal
      transparent
      visible={showModal}
      animationType="none"
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalOverlay}>
        {/* Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropAnim,
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => handleClose()}
            accessibilityRole="button"
            accessibilityLabel="Fechar menu lateral"
          />
        </Animated.View>

        {/* Sliding Panel */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.panel,
            {
              paddingTop: Math.max(insets.top, 20),
              paddingBottom: Math.max(insets.bottom, 20),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Hinário</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar menu"
              hitSlop={12}
              onPress={() => handleClose()}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Svg width={16} height={16} viewBox="0 0 14 14" fill="none">
                <Path
                  d="M2 2L12 12M12 2L2 12"
                  stroke={THEME_COLORS.cream}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              </Svg>
            </Pressable>
          </View>

          {/* Menu Items */}
          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <Pressable
                  key={item.key}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: isActive }}
                  onPress={() => handleNavigate(item.route)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    isActive && styles.menuItemActive,
                    pressed && styles.menuItemPressed,
                  ]}
                >
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.menuLabel,
                      isActive && styles.menuLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Institutional & Sync Footer */}
          <View style={styles.footer}>
            <View style={styles.divider} />
            <View style={styles.syncSection}>
              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>Catálogo</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    isSyncing
                      ? 'Sincronizando catálogo de hinos'
                      : hasUpdate
                      ? 'Atualização disponível. Toque para baixar novo catálogo'
                      : 'Catálogo de hinos atualizado'
                  }
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  onPress={hasUpdate ? handleSync : handleCheckAlreadyUpdated}
                  disabled={isSyncing}
                  style={({ pressed }) => [
                    styles.versionBadge,
                    pressed && !isSyncing && styles.versionBadgePressed,
                  ]}
                >
                  <Text style={styles.versionValue}>{displayVersion}</Text>
                  {isSyncing ? (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                      <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          stroke={THEME_COLORS.goldSoft}
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </Animated.View>
                  ) : hasUpdate ? (
                    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"
                        stroke={THEME_COLORS.goldSoft}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M12 12v8m-3.5-3.5L12 20l3.5-3.5"
                        stroke={THEME_COLORS.goldSoft}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  ) : (
                    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M20 6L9 17l-5-5"
                        stroke={THEME_COLORS.goldSoft}
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  )}
                </Pressable>
              </View>
            </View>
            <Text style={styles.footerCredits}>Desenvolvido com 💚</Text>
            <Text style={styles.footerChurch}>Igreja Em Campina Grande - PB</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  panel: {
    width: PANEL_WIDTH,
    height: '100%',
    backgroundColor: '#1b2b22',
    borderRightWidth: 1,
    borderRightColor: THEME_COLORS.line,
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.line,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 21,
    color: THEME_COLORS.cream,
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  menuList: {
    flex: 1,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
  },
  menuItemPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 16,
    color: THEME_COLORS.cream,
  },
  menuLabelActive: {
    fontFamily: THEME_FONTS.inter.semiBold,
    color: THEME_COLORS.goldSoft,
  },
  footer: {
    paddingTop: 14,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: THEME_COLORS.line,
    marginBottom: 12,
  },
  syncSection: {
    width: '100%',
    marginBottom: 12,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  versionLabel: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.mutedDim,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  versionBadgePressed: {
    opacity: 0.6,
  },
  versionValue: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.mutedDim,
  },
  footerCredits: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginBottom: 3,
    textAlign: 'center',
  },
  footerChurch: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.mutedDim,
    textAlign: 'center',
  },
});
