import axios from 'axios';

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

export const ASSISTANT_API_URL = 'https://igrejaemcampinagrande.com.br/api/hinario/ask-ai';

/**
 * Sends a query to the Hymnal AI Assistant via Axios with client-side typewriter streaming.
 * This guarantees 100% reliable responses on iOS (avoiding NSURLSession stream buffering freezes),
 * Android and Web, while still providing the smooth conversational typing effect.
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
        timeout: 30000,
      }
    );

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
