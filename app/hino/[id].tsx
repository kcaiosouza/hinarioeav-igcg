import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { MOCK_HINOS } from '../../data/mockHinos';
import { INITIAL_BOOKS } from '../../data/mockHinario';
import { BookKey } from '../../types/hinario';
import { Hino } from '../../types/hino';
import { Toast } from '../../components/ui/Toast';
import { HymnOptionsSheet } from '../../components/hinario/HymnOptionsSheet';

const KNOWN_LYRICS_BY_TITLE: Record<
  string,
  { categoria?: string; estrofes: string[]; coro?: string }
> = {
  'Chuvas de Bênçãos': {
    categoria: 'Hinos',
    estrofes: [
      'Chuvas de bênçãos teremos,\nÉ a promessa de Deus;\nTempos benditos veremos,\nSinais que vêm lá dos céus.',
      'Chuvas de bênçãos teremos,\nVida e paz nos trará;\nSobre os montes e vales,\nO Teu poder descerá.',
      'Chuvas de bênçãos teremos,\nManda-nos já, ó Senhor;\nDá-nos agora o refrigério,\nFruto do Teu santo amor.',
    ],
    coro: 'Chuvas de bênçãos,\nChuvas de bênçãos dos céus;\nGotas benditas já temos,\nMas nós queremos mais, ó Deus!',
  },
  'Deus é Amor': {
    categoria: 'Cânticos',
    estrofes: [
      'Deus é amor, Sua graça infinda\nCobre a terra e alcança o céu;\nSua bondade tão doce e linda,\nRevelou-se em Cristo, o fiel.',
      'Nenhuma sombra nem tempestade\nPode afastar o Seu terno cuidar;\nSua palavra é pura verdade,\nPara sempre há de reinar.',
    ],
    coro: 'Deus é amor, cantemos em coro,\nEle nos ama e guia na luz;\nMais precioso que prata e ouro,\nÉ o santo amor de Jesus.',
  },
  'Ainda que a Figueira': {
    categoria: 'Suplemento',
    estrofes: [
      'Ainda que a figueira não floresça,\nE não haja fruto na videira;\nMesmo que a colheita pereça,\nE falte o pasto na clareira.',
      'O Senhor Deus é a minha fortaleza,\nEle faz os meus pés como os da corça;\nCom Sua mão e infinita grandeza,\nRenova a esperança e a força.',
    ],
    coro: 'Eu me alegrarei no Senhor,\nExultarei no Deus da salvação;\nEle é a minha força e clamor,\nMinha paz e consolação.',
  },
  'Digno é o Senhor': {
    categoria: 'Suplemento',
    estrofes: [
      'Digno é o Senhor sobre todo o louvor,\nCriador do universo, eterno Redentor;\nOs céus proclamam Sua majestade,\nE a terra exalta Sua santidade.',
      'Diante do trono nos prostraremos,\nCom reverência e devoção;\nO Teu santo nome bendiremos,\nEm uma só voz e oração.',
    ],
    coro: 'Santo, Santo é o Cordeiro de Deus,\nReina com glória nas alturas dos céus;\nA Ele a honra, domínio e louvor,\nPara sempre adoramos o Senhor!',
  },
  'Grande é o Senhor': {
    categoria: 'Hinos',
    estrofes: [
      'Grande é o Senhor e mui digno de louvor,\nNa cidade do nosso Deus, Seu monte santo;\nA alegria de toda a terra é o Salvador,\nQue nos envolve em Seu manto.',
      'Sua fidelidade dura para sempre,\nDe geração em geração;\nNão há outro igual entre os homens,\nQue traga a redenção.',
    ],
    coro: 'Grande é o Senhor em quem temos a vitória,\nEle nos ajuda contra o adversário;\nProclamamos para sempre a Sua glória,\nNo Seu celeste santuário.',
  },
  'Vaso de Barro': {
    categoria: 'Cânticos',
    estrofes: [
      'Como um vaso nas mãos do oleiro,\nQuero ser moldado por Ti, Senhor;\nQuebranta meu orgulho por inteiro,\nE enche-me do Teu amor.',
      'Mesmo imperfeito e tão pequenino,\nCarrego um tesouro de imenso valor;\nA graça bendita do plano divino,\nA glória do meu Salvador.',
    ],
    coro: 'Vaso de barro sou em Tuas mãos,\nQuebra e faz de novo o meu ser;\nUsa-me conforme Teu coração,\nPara o Teu evangelho viver.',
  },
  'Ele é Fiel': {
    categoria: 'Hinário Novo',
    estrofes: [
      'Mesmo quando as forças vacilarem,\nE a tempestade rugir com furor;\nMesmo que os montes se abalarem,\nPermanece o amor do Senhor.',
      'Grandes prodígios operou no passado,\nE novas bênçãos derrama hoje aqui;\nSeu santo nome seja louvado,\nPois nunca se esquece de ti.',
    ],
    coro: 'Ele é fiel, Sua palavra não falha,\nÉ escudo e rocha em meio à batalha;\nOntem e hoje e eternamente o mesmo,\nEle é o Deus em quem creio!',
  },
};

function resolveHino(
  id?: string,
  bookParam?: string,
  titleParam?: string
): Hino | null {
  if (!id) return null;
  const num = parseInt(id, 10);

  // 1. Resolve title and category from bookParam / titleParam / INITIAL_BOOKS
  let resolvedTitle = titleParam?.trim();
  let resolvedCategory: string | undefined;

  if (bookParam && bookParam in INITIAL_BOOKS) {
    const book = INITIAL_BOOKS[bookParam as BookKey];
    resolvedCategory = book.name;
    if (!resolvedTitle && book.data[id]) {
      resolvedTitle = book.data[id];
    }
  }

  // If no title yet, search across INITIAL_BOOKS
  if (!resolvedTitle) {
    for (const key of Object.keys(INITIAL_BOOKS) as BookKey[]) {
      const book = INITIAL_BOOKS[key];
      if (book.data[id]) {
        resolvedTitle = book.data[id];
        if (!resolvedCategory) {
          resolvedCategory = book.name;
        }
        break;
      }
    }
  }

  // If we have a resolved title
  if (resolvedTitle) {
    const known = KNOWN_LYRICS_BY_TITLE[resolvedTitle];
    if (known) {
      return {
        id,
        numero: isNaN(num) ? 0 : num,
        titulo: resolvedTitle,
        categoria: resolvedCategory || known.categoria || 'Hinário',
        estrofes: known.estrofes,
        coro: known.coro,
      };
    }

    const mockMatch = MOCK_HINOS.find(
      (h) => h.titulo.toLowerCase() === resolvedTitle!.toLowerCase()
    );
    if (mockMatch) {
      return {
        ...mockMatch,
        id,
        numero: isNaN(num) ? mockMatch.numero : num,
        categoria: resolvedCategory || mockMatch.categoria,
      };
    }

    return {
      id,
      numero: isNaN(num) ? 0 : num,
      titulo: resolvedTitle,
      categoria: resolvedCategory || 'Hinário',
      estrofes: [
        'Cantai ao Senhor com júbilo e devoção,\nPois grandiosas são as obras de Suas mãos;\nEm todo o tempo Sua bondade nos guiará,\nE a Sua verdade para sempre reinará.',
        'Pelos caminhos da vida com fé caminhamos,\nNa rocha inabalável nós nos apoiamos;\nSua graça suprema restaura o nosso ser,\nE a vitória em Cristo nos faz resplandecer.',
      ],
      coro: 'Glória, honra e louvor ao nosso Salvador,\nQue nos ama e sustenta com infinito amor!',
    };
  }

  // Check MOCK_HINOS by id or numero
  const mockFound = MOCK_HINOS.find(
    (h) => h.id === id || String(h.numero) === id
  );
  if (mockFound) {
    return {
      ...mockFound,
      categoria: resolvedCategory || mockFound.categoria,
    };
  }

  return null;
}

export default function HinoDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
    book?: string | string[];
    title?: string | string[];
  }>();
  const router = useRouter();

  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';
  const book =
    typeof params.book === 'string'
      ? params.book
      : Array.isArray(params.book)
      ? params.book[0]
      : undefined;
  const title =
    typeof params.title === 'string'
      ? params.title
      : Array.isArray(params.title)
      ? params.title[0]
      : undefined;

  const [hino, setHino] = useState<Hino | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      Toast.show(next ? 'Hino adicionado aos favoritos!' : 'Hino removido dos favoritos');
      return next;
    });
  };

  const handleOpenSheetMusic = () => {
    Alert.alert(
      'Partitura',
      `A partitura do hino ${hino?.numero} - "${hino?.titulo}" estará disponível para download e visualização em breve!`,
      [{ text: 'OK' }]
    );
  };

  const handleOpenIGCGMusic = () => {
    Alert.alert(
      'IGCGMusic',
      `Ouvir "${hino?.titulo}" no app IGCGMusic. Redirecionamento para a plataforma de música da igreja.`,
      [{ text: 'Ouvir Agora', onPress: () => {} }, { text: 'Fechar', style: 'cancel' }]
    );
  };

  useEffect(() => {
    const found = resolveHino(id, book, title);
    if (!found) {
      Toast.show('Hino não encontrado');
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    } else {
      setHino(found);
    }
  }, [id, book, title, router]);

  if (!hino) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando hino...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <HymnOptionsSheet
        visible={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onOpenSheetMusic={handleOpenSheetMusic}
        onOpenIGCGMusic={handleOpenIGCGMusic}
      />
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 19l-7-7 7-7"
                stroke={THEME_COLORS.cream}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>

          <Text style={styles.navTitle} numberOfLines={1}>
            {hino.numero > 0 ? `Hino ${hino.numero}` : hino.categoria || 'Hino'}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Opções do hino"
            onPress={() => setIsOptionsOpen(true)}
            style={({ pressed }) => [
              styles.optionsBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                stroke={THEME_COLORS.cream}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>

        {/* Lyrics & Stanzas ScrollArea */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hymn Header Area */}
          <View style={styles.headerArea}>
            <Text style={styles.categoryBadge}>{hino.categoria}</Text>
            <Text style={styles.hymnTitle}>
              {hino.numero}. {hino.titulo}
            </Text>
            <View style={styles.divider} />
          </View>

          {/* Stanzas & Chorus */}
          {hino.estrofes.map((estrofe, idx) => (
            <View key={idx} style={styles.stanzaBlock}>
              <Text style={styles.stanzaLabel}>Estrofe {idx + 1}</Text>
              <Text
                style={[
                  styles.stanzaText,
                  { fontSize, lineHeight: Math.round(fontSize * 1.6) },
                ]}
              >
                {estrofe}
              </Text>
              {hino.coro && idx === 0 && (
                <View style={styles.chorusCard}>
                  <Text style={styles.chorusLabel}>CORO</Text>
                  <Text
                    style={[
                      styles.chorusText,
                      { fontSize, lineHeight: Math.round(fontSize * 1.6) },
                    ]}
                  >
                    {hino.coro}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
  },
  container: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 16,
    color: THEME_COLORS.muted,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  navTitle: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 18,
    color: THEME_COLORS.cream,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  optionsBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: THEME_COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerArea: {
    marginBottom: 8,
  },
  categoryBadge: {
    fontFamily: THEME_FONTS.inter.semiBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: THEME_COLORS.goldSoft,
    marginBottom: 6,
  },
  hymnTitle: {
    fontFamily: THEME_FONTS.fraunces.bold,
    fontSize: 24,
    lineHeight: 32,
    color: THEME_COLORS.cream,
  },
  divider: {
    height: 1,
    backgroundColor: THEME_COLORS.line,
    marginTop: 16,
    marginBottom: 20,
  },
  stanzaBlock: {
    marginBottom: 20,
  },
  stanzaLabel: {
    fontFamily: THEME_FONTS.inter.medium,
    fontSize: 12,
    color: THEME_COLORS.muted,
    marginBottom: 6,
  },
  stanzaText: {
    fontFamily: THEME_FONTS.inter.regular,
    color: THEME_COLORS.cream,
  },
  chorusCard: {
    backgroundColor: THEME_COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: THEME_COLORS.goldSoft,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  chorusLabel: {
    fontFamily: THEME_FONTS.inter.bold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: THEME_COLORS.goldSoft,
    marginBottom: 6,
  },
  chorusText: {
    fontFamily: THEME_FONTS.inter.medium,
    fontStyle: 'italic',
    color: THEME_COLORS.cream,
  },
});
