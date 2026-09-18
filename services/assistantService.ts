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
 * Sends a query to the Hymnal AI Assistant with streaming support and seamless JSON fallback.
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
    const response = await fetch(ASSISTANT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream, application/json',
      },
      body: JSON.stringify({
        query,
        sessionId,
        stream: true,
        limit: 3,
        history,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedMessage = errText;
      try {
        const json = JSON.parse(errText);
        parsedMessage = json.error?.message || json.error?.code || errText;
      } catch {
        // use raw text
      }
      const err = new Error(parsedMessage);
      if (onError) onError(err);
      throw err;
    }

    const contentType = response.headers.get('content-type') || '';

    // Handle Server-Sent Events (SSE) streaming if reader is available
    if (contentType.includes('text/event-stream') && response.body && typeof response.body.getReader === 'function') {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullAnswer = '';
      let collectedHymns: SuggestedHymn[] = [];
      let buffer = '';
      let currentEvent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) {
            currentEvent = '';
            continue;
          }

          if (trimmed.startsWith('event: ')) {
            currentEvent = trimmed.slice(7).trim();
            continue;
          }

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              if (onDone) onDone();
              return { answer: fullAnswer, hymns: collectedHymns };
            }

            try {
              const data = JSON.parse(dataStr);
              if (currentEvent === 'hymns' || data.hymns) {
                collectedHymns = data.hymns || [];
                if (onHymns) onHymns(collectedHymns);
              } else if (currentEvent === 'text-delta' || data.delta) {
                const delta = data.delta || '';
                fullAnswer += delta;
                if (onDelta) onDelta(delta);
              } else if (currentEvent === 'done' || data.finishReason) {
                if (onDone) onDone();
                return { answer: fullAnswer, hymns: collectedHymns };
              }
            } catch {
              // Ignore partial JSON parsing errors
            }
          }
        }
      }

      if (onDone) onDone();
      return { answer: fullAnswer, hymns: collectedHymns };
    } else {
      // Fallback: Non-streaming JSON response
      const json = await response.json();
      const answer = json.data?.answer || '';
      const hymns = json.data?.hymns || [];

      if (onHymns) onHymns(hymns);
      if (onDelta) onDelta(answer);
      if (onDone) onDone();

      return { answer, hymns };
    }
  } catch (error: any) {
    if (onError) onError(error);
    throw error;
  }
}
