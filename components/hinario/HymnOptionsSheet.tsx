import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { THEME_COLORS, THEME_FONTS } from "../../constants/theme";

export interface HymnOptionsSheetProps {
  visible: boolean;
  onClose: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenSheetMusic: () => void;
  onOpenIGCGMusic: () => void;
  hasSheetMusic?: boolean;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function HymnOptionsSheet({
  visible,
  onClose,
  fontSize,
  onFontSizeChange,
  isFavorite,
  onToggleFavorite,
  onOpenSheetMusic,
  onOpenIGCGMusic,
  hasSheetMusic,
}: HymnOptionsSheetProps) {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(visible);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 55,
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
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  const handleClose = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
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

  // Swipe down pan responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 6;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy >= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 40 || gestureState.vy > 0.4) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!showModal) return null;

  return (
    <Modal
      transparent
      visible={showModal}
      animationType="none"
      onRequestClose={() => handleClose()}
    >
      <View style={styles.overlay}>
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
            accessibilityLabel="Fechar opções"
          />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, 20) + 10,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Opções do Hino</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              hitSlop={10}
              onPress={() => handleClose()}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <Path
                  d="M2 2L12 12M12 2L2 12"
                  stroke={THEME_COLORS.cream}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              </Svg>
            </Pressable>
          </View>

          {/* Controls List */}
          <View style={styles.optionsList}>
            {/* 1. Font Size Control */}
            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>Aa</Text>
                <View>
                  <Text style={styles.optionLabel}>Tamanho da fonte</Text>
                  <Text style={styles.optionSublabel}>{fontSize} pt</Text>
                </View>
              </View>
              <View style={styles.fontStepper}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Diminuir fonte"
                  disabled={fontSize <= 14}
                  onPress={() => onFontSizeChange(Math.max(14, fontSize - 2))}
                  style={({ pressed }) => [
                    styles.stepperBtn,
                    fontSize <= 14 && styles.stepperBtnDisabled,
                    pressed && styles.stepperBtnPressed,
                  ]}
                >
                  <Text style={styles.stepperText}>A-</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Aumentar fonte"
                  disabled={fontSize >= 28}
                  onPress={() => onFontSizeChange(Math.min(28, fontSize + 2))}
                  style={({ pressed }) => [
                    styles.stepperBtn,
                    fontSize >= 28 && styles.stepperBtnDisabled,
                    pressed && styles.stepperBtnPressed,
                  ]}
                >
                  <Text style={styles.stepperText}>A+</Text>
                </Pressable>
              </View>
            </View>

            {/* 2. Favorite Toggle */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite ? "Remover dos favoritos" : "Favoritar hino"
              }
              onPress={onToggleFavorite}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.optionButtonPressed,
              ]}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>{isFavorite ? "⭐" : "☆"}</Text>
                <View>
                  <Text style={styles.optionLabel}>
                    {isFavorite
                      ? "Remover dos Favoritos"
                      : "Favoritar este Hino"}
                  </Text>
                  <Text style={styles.optionSublabel}>
                    {isFavorite
                      ? "Hino salvo na sua lista de favoritos"
                      : "Acesso rápido pelo menu"}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.statusBadge,
                  isFavorite && styles.statusBadgeActive,
                ]}
              >
                {isFavorite ? "Salvo" : "Favoritar"}
              </Text>
            </Pressable>

            {/* 3. Sheet Music Action */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                hasSheetMusic === false
                  ? "Partitura não disponível"
                  : "Ver partitura"
              }
              onPress={() => handleClose(onOpenSheetMusic)}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.optionButtonPressed,
              ]}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>♫</Text>
                <View>
                  <Text style={styles.optionLabel}>Ver Partitura</Text>
                  <Text style={styles.optionSublabel}>
                    {hasSheetMusic === false
                      ? "Partitura ainda não adicionada"
                      : "O que quem toca quer ver"}
                  </Text>
                </View>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 18l6-6-6-6"
                  stroke={THEME_COLORS.muted}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>

            {/* 4. Prominent IGCGMusic Card */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ouça esse hino no IGCGMusic"
              onPress={() => handleClose(onOpenIGCGMusic)}
              style={({ pressed }) => [
                styles.musicCard,
                pressed && styles.musicCardPressed,
              ]}
            >
              <View style={styles.musicCardLeft}>
                <View style={styles.musicIconCircle}>
                  <Text style={styles.musicIcon}>🎧</Text>
                </View>
                <View style={styles.musicTexts}>
                  <Text style={styles.musicTitle}>
                    Ouça esse hino no IGCGMusic
                  </Text>
                  <Text style={styles.musicSubtitle}>
                    Disponível na plataforma oficial
                  </Text>
                </View>
              </View>
              <View style={styles.playBadge}>
                <Svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <Path d="M8 5v14l11-7z" fill={THEME_COLORS.ink} />
                </Svg>
              </View>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  sheet: {
    backgroundColor: "#1b2b22",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.line,
    paddingHorizontal: 20,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME_COLORS.mutedDim,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.line,
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 19,
    color: THEME_COLORS.cream,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  optionsList: {
    gap: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  optionButtonPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  optionIcon: {
    fontSize: 20,
    color: THEME_COLORS.cream,
  },
  optionLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 15,
    color: THEME_COLORS.cream,
  },
  optionSublabel: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginTop: 1,
  },
  fontStepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stepperBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
  },
  stepperBtnDisabled: {
    opacity: 0.4,
  },
  stepperBtnPressed: {
    backgroundColor: THEME_COLORS.gold,
  },
  stepperText: {
    fontFamily: THEME_FONTS.inter.bold,
    fontSize: 13,
    color: THEME_COLORS.cream,
  },
  statusBadge: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    color: THEME_COLORS.muted,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: "rgba(218, 215, 205, 0.08)",
  },
  statusBadgeActive: {
    color: THEME_COLORS.ink,
    backgroundColor: THEME_COLORS.goldSoft,
  },
  musicCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME_COLORS.goldSoft,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  musicCardPressed: {
    backgroundColor: "#8fa07a",
  },
  musicCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  musicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(18, 32, 26, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  musicIcon: {
    fontSize: 18,
  },
  musicTexts: {
    flex: 1,
  },
  musicTitle: {
    fontFamily: THEME_FONTS.inter.bold,
    fontSize: 15,
    color: THEME_COLORS.ink,
  },
  musicSubtitle: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: "rgba(18, 32, 26, 0.75)",
    marginTop: 1,
  },
  playBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(18, 32, 26, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
