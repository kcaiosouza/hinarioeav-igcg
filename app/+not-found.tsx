import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Página não encontrada</Text>
        <Text style={styles.description}>
          O hino ou conteúdo solicitado não foi encontrado.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Voltar ao início</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontFamily: THEME_FONTS.fraunces.bold,
    fontSize: 22,
    color: THEME_COLORS.cream,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontFamily: THEME_FONTS.inter.regular,
    fontSize: 15,
    color: THEME_COLORS.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    backgroundColor: THEME_COLORS.surfaceRaised,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
  },
  linkText: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 15,
    color: THEME_COLORS.cream,
  },
});
