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
  const startTime = Date.now();
  console.log('🤖 [AssistantService] [1/5] Preparando requisição...', {
    url: ASSISTANT_API_URL,
    query,
    sessionId,
    historyCount: history.length,
  });

  try {
    console.log('🤖 [AssistantService] [2/5] Disparando axios.post (timeout: 30000ms)...');
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

    const elapsed = Date.now() - startTime;
    console.log(`🤖 [AssistantService] [3/5] Resposta recebida em ${elapsed}ms! Status HTTP: ${response.status}`);

    const data = response.data?.data || {};
    const answer: string = data.answer || '';
    const hymns: SuggestedHymn[] = data.hymns || [];

    console.log('🤖 [AssistantService] [4/5] Dados extraídos:', {
      hasAnswer: !!answer,
      answerLength: answer.length,
      hymnsCount: hymns.length,
    });

    // 1. Deliver hymn cards immediately to render UI cards
    if (onHymns && hymns.length > 0) {
      console.log(`🤖 [AssistantService] Entregando ${hymns.length} hinos via onHymns`);
      onHymns(hymns);
    }

    // 2. Smooth typewriter streaming effect in the client
    if (answer && onDelta) {
      console.log('🤖 [AssistantService] [5/5] Iniciando typewriter via onDelta...');
      const tokens = answer.match(/\S+\s*/g) || [answer];
      for (const token of tokens) {
        onDelta(token);
        // Realistic ~16ms token delay
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
    }

    console.log(`🤖 [AssistantService] ✅ Concluído com sucesso em ${Date.now() - startTime}ms`);
    if (onDone) onDone();
    return { answer, hymns };
  } catch (err: any) {
    const elapsed = Date.now() - startTime;
    console.error(`🤖 [AssistantService] ❌ ERRO após ${elapsed}ms:`, {
      message: err.message,
      name: err.name,
      code: err.code,
      status: err.response?.status,
      responseData: err.response?.data,
      isAxiosError: axios.isAxiosError(err),
    });

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
