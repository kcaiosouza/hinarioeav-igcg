import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SuggestedHymn {
  id: string;
  number: number;
  title: string;
  section: string;
  similarity?: number;
  firstStanza?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hymns?: SuggestedHymn[];
  isStreaming?: boolean;
  isError?: boolean;
}

export interface AssistantHistoryItem {
  role: 'user' | 'assistant';
  content: string;
  suggestedHymnIds?: string[];
}

export interface SendAssistantQueryParams {
  query: string;
  sessionId: string;
  history?: AssistantHistoryItem[];
  onHymns?: (hymns: SuggestedHymn[]) => void;
  onDelta?: (delta: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

export const ASSISTANT_API_URL = 'https://www.igrejaemcampinagrande.com.br/api/hinario/ask-ai';

/**
 * Sends a query to the Hymnal AI Assistant via Axios with client-side typewriter streaming.
 * Uses the canonical www URL to completely eliminate 308 redirects on iOS NSURLSession.
 */
export async function sendAssistantQuery({
  query,
  sessionId,
  history = [],
  onHymns,
  onDelta,
  onDone,
  onError,
}: SendAssistantQueryParams): Promise<{ answer: string; hymns: SuggestedHymn[] }> {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, 20000);

  try {
    const response = await axios.post(
      ASSISTANT_API_URL,
      {
        query,
        sessionId,
        stream: false,
        limit: 3,
        history,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 20000,
        signal: abortController.signal,
      }
    );

    clearTimeout(timeoutId);

    const data = response.data?.data || {};
    const answer: string = data.answer || '';
    const hymns: SuggestedHymn[] = data.hymns || [];

    // 1. Deliver hymn cards immediately to render UI cards
    if (onHymns && hymns.length > 0) {
      onHymns(hymns);
    }

    // 2. Smooth typewriter streaming effect in the client
    if (answer && onDelta) {
      const tokens = answer.match(/\S+\s*/g) || [answer];
      for (const token of tokens) {
        onDelta(token);
        // Realistic ~16ms token delay
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
    }

    if (onDone) onDone();
    return { answer, hymns };
  } catch (err: any) {
    clearTimeout(timeoutId);

    let message = 'Falha ao conectar com o assistente.';
    if (err.response?.data?.error?.message) {
      message = err.response.data.error.message;
    } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
      message = 'A requisição demorou muito para responder (timeout).';
    } else if (err.message?.includes('Network Error') || !err.response) {
      message = 'Parece que você está sem conexão com a internet no momento.';
    }

    const errorObj = new Error(message);
    if (onError) onError(errorObj);
    throw errorObj;
  }
}

export interface MessageFeedback {
  messageId: string;
  rating: 'up' | 'down';
  reason?: string;
  createdAt: string;
}

const FEEDBACK_STORAGE_KEY = '@hinario:assistant_feedbacks';

/**
 * Registra o voto do usuário (positivo ou negativo) localmente para histórico
 * e tenta despachar para o endpoint institucional da igreja.
 */
export async function submitAssistantFeedback(feedback: MessageFeedback): Promise<void> {
  // 1. Armazenamento local persistente para auditoria e histórico
  try {
    const raw = await AsyncStorage.getItem(FEEDBACK_STORAGE_KEY);
    const list: MessageFeedback[] = raw ? JSON.parse(raw) : [];
    // Substitui voto anterior da mesma mensagem se houver
    const filtered = list.filter((item) => item.messageId !== feedback.messageId);
    filtered.push(feedback);
    await AsyncStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Falha ao persistir feedback localmente:', err);
  }

  // 2. Envio remoto opcional (fire-and-forget caso o backend possua o endpoint ativo)
  try {
    await axios.post(
      'https://www.igrejaemcampinagrande.com.br/api/hinario/feedback',
      feedback,
      { timeout: 4000 }
    );
  } catch {
    // Falha silenciosa se o backend ainda não tiver implementado essa rota
  }
}

/**
 * Retorna todos os feedbacks de respostas já registrados no dispositivo.
 */
export async function getAssistantFeedbacks(): Promise<MessageFeedback[]> {
  try {
    const raw = await AsyncStorage.getItem(FEEDBACK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

