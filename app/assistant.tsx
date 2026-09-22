import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { THEME_COLORS, THEME_FONTS } from '../constants/theme';
import { HymnCard } from '../components/assistant/HymnCard';
import { TypingBubble } from '../components/assistant/TypingBubble';
import { FormattedMessageText } from '../components/assistant/FormattedMessageText';
import {
  ChatMessage,
  sendAssistantQuery,
  SuggestedHymn,
  submitAssistantFeedback,
} from '../services/assistantService';

const SUGGESTION_CHIPS = [
  '🌾 Hinos para a semana',
  '🌍 Hinos sobre a criação',
  '🍞 Hinos para a ceia do Senhor',
];

const INITIAL_GREETING =
  'Olá! Sou o assistente do Hinário. Posso encontrar hinos por temas, sentimentos ou ocasiões.';

export default function AssistantScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [sessionId, setSessionId] = useState<string>(() => `sess_${Date.now()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: INITIAL_GREETING,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [statusText, setStatusText] = useState('Pronto para ajudar');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down'>>({});

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 80);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleNewSession = () => {
    const newSession = `sess_${Date.now()}`;
    setSessionId(newSession);
    setMessages([
      {
        id: `greeting_${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING,
      },
    ]);
    setShowSuggestions(true);
    setStatusText('Pronto para ajudar');
    setIsTyping(false);
    setInputText('');
  };

  const handleShowInfo = () => {
    Alert.alert(
      'Sobre o Assistente do Hinário',
      'O Assistente utiliza inteligência artificial para localizar hinos por temas, ocasiões ou sentimentos.\n\n• As respostas são geradas automaticamente e podem conter imprecisões.\n• Você pode avaliar as respostas utilizando os botões de curtir ou descurtir (👍 / 👎) em cada mensagem.',
      [{ text: 'Entendi' }]
    );
  };

  const handleVote = (messageId: string, rating: 'up' | 'down') => {
    const current = feedbackMap[messageId];
    if (current === rating) {
      setFeedbackMap((prev) => {
        const next = { ...prev };
        delete next[messageId];
        return next;
      });
      return;
    }

    setFeedbackMap((prev) => ({ ...prev, [messageId]: rating }));

    if (rating === 'down') {
      Alert.alert(
        'Como podemos melhorar?',
        'O que você achou inadequado ou impreciso nesta resposta?',
        [
          {
            text: 'Hino incorreto',
            onPress: () => {
              void submitAssistantFeedback({
                messageId,
                rating: 'down',
                reason: 'hino_incorreto',
                createdAt: new Date().toISOString(),
              });
            },
          },
          {
            text: 'Resposta imprecisa',
            onPress: () => {
              void submitAssistantFeedback({
                messageId,
                rating: 'down',
                reason: 'resposta_imprecisa',
                createdAt: new Date().toISOString(),
              });
            },
          },
          {
            text: 'Conteúdo impróprio',
            style: 'destructive',
            onPress: () => {
              void submitAssistantFeedback({
                messageId,
                rating: 'down',
                reason: 'conteudo_improprio',
                createdAt: new Date().toISOString(),
              });
              Alert.alert('Obrigado', 'Seu relato foi registrado e ajudará a calibrar o assistente.');
            },
          },
          {
            text: 'Pular',
            style: 'cancel',
            onPress: () => {
              void submitAssistantFeedback({
                messageId,
                rating: 'down',
                createdAt: new Date().toISOString(),
              });
            },
          },
        ]
      );
    } else {
      void submitAssistantFeedback({
        messageId,
        rating: 'up',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  const handleSelectHymn = useCallback(
    (hymn: SuggestedHymn) => {
      router.push({
        pathname: '/hino/[id]',
        params: {
          id: String(hymn.number),
          book: hymn.section || 'novo',
          title: hymn.title,
        },
      });
    },
    [router]
  );

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText ?? inputText).trim();
    if (!textToSend || isTyping) return;

    setShowSuggestions(false);
    setInputText('');
    Keyboard.dismiss();

    const userMessageId = `user_${Date.now()}`;
    const assistantMessageId = `asst_${Date.now()}`;

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);
    setStatusText('Buscando hinos...');
    scrollToBottom();

    // Prepare history payload (last 6 messages)
    const historyPayload = newMessages
      .filter((m) => m.id !== 'greeting' && !m.isError)
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content,
        suggestedHymnIds: m.hymns?.map((h) => h.id),
      }));

    let streamAnswer = '';
    let streamHymns: SuggestedHymn[] = [];

    try {
      await sendAssistantQuery({
        query: textToSend,
        sessionId,
        history: historyPayload,
        onHymns: (hymns) => {
          streamHymns = hymns;
          setStatusText('Digitando...');
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId);
            if (!exists) {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: streamAnswer,
                  hymns: streamHymns,
                  isStreaming: true,
                },
              ];
            }
            return prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, hymns: streamHymns }
                : m
            );
          });
          scrollToBottom();
        },
        onDelta: (delta) => {
          streamAnswer += delta;
          setStatusText('Digitando...');
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId);
            if (!exists) {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: streamAnswer,
                  hymns: streamHymns,
                  isStreaming: true,
                },
              ];
            }
            return prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: streamAnswer }
                : m
            );
          });
          scrollToBottom();
        },
        onDone: () => {
          setIsTyping(false);
          setStatusText('Pronto para ajudar');
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, isStreaming: false }
                : m
            )
          );
          scrollToBottom();
        },
      });
    } catch (error: any) {
      setIsTyping(false);
      setStatusText('Pronto para ajudar');

      let gentleMessage =
        'Não foi possível processar essa busca agora. Que tal tentar perguntar de outra forma ou escolher outro tema?';
      const msg = (error?.message || '').toLowerCase();

      if (msg.includes('network') || msg.includes('failed to fetch') || msg.includes('offline')) {
        gentleMessage =
          'Parece que você está sem conexão com a internet no momento. O assistente precisa de conexão para buscar recomendações na nuvem.';
      } else if (msg.includes('rate_limited') || msg.includes('too many requests') || msg.includes('429')) {
        gentleMessage =
          'Muitas perguntas foram enviadas recentemente. Por favor, aguarde alguns instantes antes de enviar a próxima.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: gentleMessage,
          isError: true,
        },
      ]);
      scrollToBottom();
    }
  };

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';

    return (
      <View style={[styles.messageRow, isUser ? styles.rowUser : styles.rowAgent]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
          {item.content ? (
            <FormattedMessageText content={item.content} isUser={isUser} />
          ) : null}

          {item.hymns && item.hymns.length > 0 ? (
            <View style={styles.hymnsContainer}>
              {item.hymns.map((hymn) => (
                <HymnCard key={hymn.id} hymn={hymn} onPress={handleSelectHymn} />
              ))}
            </View>
          ) : null}

          {!isUser && !item.isStreaming && !item.isError && item.id !== 'greeting' && (
            <View style={styles.feedbackRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Gostei da resposta"
                hitSlop={8}
                onPress={() => handleVote(item.id, 'up')}
                style={({ pressed }) => [
                  styles.thumbBtn,
                  feedbackMap[item.id] === 'up' && styles.thumbBtnActiveUp,
                  pressed && styles.thumbBtnPressed,
                ]}
              >
                <Svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill={feedbackMap[item.id] === 'up' ? THEME_COLORS.goldSoft : 'none'}
                >
                  <Path
                    d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
                    stroke={feedbackMap[item.id] === 'up' ? THEME_COLORS.goldSoft : THEME_COLORS.mutedDim}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Não gostei da resposta"
                hitSlop={8}
                onPress={() => handleVote(item.id, 'down')}
                style={({ pressed }) => [
                  styles.thumbBtn,
                  feedbackMap[item.id] === 'down' && styles.thumbBtnActiveDown,
                  pressed && styles.thumbBtnPressed,
                ]}
              >
                <Svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill={feedbackMap[item.id] === 'down' ? '#E57373' : 'none'}
                >
                  <Path
                    d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
                    stroke={feedbackMap[item.id] === 'down' ? '#E57373' : THEME_COLORS.mutedDim}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Chat TopBar */}
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={10}
          onPress={handleBack}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <Svg width={9} height={16} viewBox="0 0 9 15" fill="none">
            <Path
              d="M8 1L1.5 7.5L8 14"
              stroke={THEME_COLORS.cream}
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>

        <View style={styles.avatarCircle}>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path
              d="M9 1.5L10.4 6.6L15.5 8L10.4 9.4L9 14.5L7.6 9.4L2.5 8L7.6 6.6L9 1.5Z"
              fill={THEME_COLORS.ink}
            />
          </Svg>
        </View>

        <View style={styles.agentInfo}>
          <Text style={styles.agentTitle} numberOfLines={1}>
            Assistente do Hinário
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, isTyping && styles.statusDotActive]} />
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>

        <View style={styles.topBarActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sobre o Assistente"
            hitSlop={10}
            onPress={handleShowInfo}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={THEME_COLORS.cream}
                strokeWidth={1.8}
              />
              <Path
                d="M12 16V12M12 8H12.01"
                stroke={THEME_COLORS.cream}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova sessão"
            hitSlop={10}
            onPress={handleNewSession}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          >
            <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
              <Path
                d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 005.64 5.64L1 10M23 14L18.36 18.36A9 9 0 013.51 15"
                stroke={THEME_COLORS.cream}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>
      </View>

      {/* Messages List & Keyboard Avoiding */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            <>
              {isTyping && !messages.some((m) => m.isStreaming) ? (
                <TypingBubble />
              ) : null}

              {showSuggestions ? (
                <View style={styles.chipsWrap}>
                  {SUGGESTION_CHIPS.map((chipText) => (
                    <Pressable
                      key={chipText}
                      onPress={() => handleSend(chipText)}
                      style={({ pressed }) => [
                        styles.chipBtn,
                        pressed && styles.chipBtnPressed,
                      ]}
                    >
                      <Text style={styles.chipText}>{chipText}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </>
          }
        />

        {/* Input Bar */}
        <SafeAreaView edges={keyboardVisible ? [] : ['bottom']} style={styles.inputSafeArea}>
          <View style={styles.inputBar}>
            <View style={styles.inputPill}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Pergunte sobre um hino..."
                placeholderTextColor={THEME_COLORS.mutedDim}
                style={styles.textInput}
                multiline
                maxLength={1000}
                returnKeyType="default"
              />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enviar mensagem"
              disabled={!inputText.trim() || isTyping}
              onPress={() => handleSend()}
              style={({ pressed }) => [
                styles.sendBtn,
                inputText.trim().length > 0 && !isTyping && styles.sendBtnActive,
                pressed && styles.sendBtnPressed,
              ]}
            >
              <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
                  stroke={inputText.trim().length > 0 && !isTyping ? THEME_COLORS.ink : THEME_COLORS.mutedDim}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>
          <Text style={styles.aiDisclaimer}>
            O assistente utiliza inteligência artificial e pode cometer imprecisões.
          </Text>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 215, 205, 0.12)',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    backgroundColor: THEME_COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME_COLORS.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentInfo: {
    flex: 1,
    minWidth: 0,
  },
  agentTitle: {
    fontFamily: THEME_FONTS.serifSemiBold,
    fontSize: 16,
    color: THEME_COLORS.cream,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME_COLORS.goldSoft,
  },
  statusDotActive: {
    backgroundColor: '#8CE096',
  },
  statusText: {
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 12,
    color: THEME_COLORS.muted,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAgent: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  bubbleUser: {
    backgroundColor: THEME_COLORS.goldSoft,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  bubbleAgent: {
    backgroundColor: THEME_COLORS.surface,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
  },
  bubbleText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  bubbleTextUser: {
    fontFamily: THEME_FONTS.sansMedium,
    color: THEME_COLORS.ink,
    fontWeight: '500',
  },
  bubbleTextAgent: {
    fontFamily: THEME_FONTS.sansRegular,
    color: THEME_COLORS.cream,
  },
  hymnsContainer: {
    marginTop: 6,
    width: '100%',
  },
  chipsWrap: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 10,
    marginBottom: 8,
  },
  chipBtn: {
    alignSelf: 'flex-start',
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipBtnPressed: {
    backgroundColor: THEME_COLORS.surfaceRaised,
  },
  chipText: {
    fontFamily: THEME_FONTS.sansSemiBold,
    fontSize: 13.5,
    color: THEME_COLORS.goldSoft,
    fontWeight: '600',
  },
  inputSafeArea: {
    backgroundColor: THEME_COLORS.bg,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(218, 215, 205, 0.08)',
  },
  inputPill: {
    flex: 1,
    backgroundColor: THEME_COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    minHeight: 42,
    maxHeight: 110,
    justifyContent: 'center',
  },
  textInput: {
    color: THEME_COLORS.cream,
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 14.5,
    lineHeight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 32,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME_COLORS.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: THEME_COLORS.goldSoft,
  },
  sendBtnPressed: {
    transform: [{ scale: 0.94 }],
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: 8,
    paddingTop: 2,
  },
  thumbBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(218, 215, 205, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(218, 215, 205, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbBtnActiveUp: {
    backgroundColor: 'rgba(163, 177, 138, 0.16)',
    borderColor: THEME_COLORS.goldSoft,
  },
  thumbBtnActiveDown: {
    backgroundColor: 'rgba(229, 115, 115, 0.16)',
    borderColor: '#E57373',
  },
  thumbBtnPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
  aiDisclaimer: {
    textAlign: 'center',
    fontFamily: THEME_FONTS.sansRegular,
    fontSize: 11,
    color: THEME_COLORS.mutedDim,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});
