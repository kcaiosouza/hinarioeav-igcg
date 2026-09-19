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
 * Sends a query to the Hymnal AI Assistant.
 * Uses XMLHttpRequest for React Native (iOS and Android) to guarantee real-time SSE streaming
 * without hanging on iOS NSURLSession, and fetch for Node.js test environments.
 */
export function sendAssistantQuery({
  query,
  sessionId,
  history = [],
  onHymns,
  onDelta,
  onDone,
  onError,
}: SendAssistantQueryParams): Promise<{ answer: string; hymns: SuggestedHymn[] }> {
  // 1. React Native environment: XMLHttpRequest with onprogress is the gold standard for iOS & Android
  if (typeof XMLHttpRequest !== 'undefined') {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', ASSISTANT_API_URL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'text/event-stream, application/json');
      xhr.timeout = 30000; // 30s timeout

      let seenBytes = 0;
      let buffer = '';
      let fullAnswer = '';
      let collectedHymns: SuggestedHymn[] = [];
      let currentEvent = '';
      let isCompleted = false;

      const finishSuccess = () => {
        if (isCompleted) return;
        isCompleted = true;
        if (onDone) onDone();
        resolve({ answer: fullAnswer, hymns: collectedHymns });
      };

      const finishError = (err: Error) => {
        if (isCompleted) return;
        isCompleted = true;
        if (onError) onError(err);
        reject(err);
      };

      const processChunk = (chunk: string) => {
        buffer += chunk;
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
              finishSuccess();
              return;
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
                finishSuccess();
                return;
              }
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }
      };

      xhr.onprogress = () => {
        const text = xhr.responseText || '';
        const newChunk = text.slice(seenBytes);
        seenBytes = text.length;
        if (newChunk) {
          processChunk(newChunk);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Flush any remaining buffer
          const text = xhr.responseText || '';
          const remaining = text.slice(seenBytes);
          if (remaining) {
            processChunk(remaining);
          }

          // Fallback: If no streaming events were emitted, parse complete JSON
          if (!fullAnswer && xhr.responseText) {
            try {
              const json = JSON.parse(xhr.responseText);
              if (json.data) {
                fullAnswer = json.data.answer || '';
                collectedHymns = json.data.hymns || [];
                if (onHymns) onHymns(collectedHymns);
                if (onDelta) onDelta(fullAnswer);
              }
            } catch {
              // ignore
            }
          }

          finishSuccess();
        } else {
          let errorMsg = `Erro no servidor (${xhr.status})`;
          try {
            const json = JSON.parse(xhr.responseText);
            errorMsg = json.error?.message || json.error?.code || errorMsg;
          } catch {
            // raw text
          }
          finishError(new Error(errorMsg));
        }
      };

      xhr.onerror = () => {
        finishError(new Error('Falha na conexão de rede com o servidor.'));
      };

      xhr.ontimeout = () => {
        finishError(new Error('A requisição demorou muito para responder (timeout).'));
      };

      try {
        xhr.send(
          JSON.stringify({
            query,
            sessionId,
            stream: true,
            limit: 3,
            history,
          })
        );
      } catch (err: any) {
        finishError(err);
      }
    });
  }

  // 2. Node.js environment fallback (used during automated tests)
  return fetch(ASSISTANT_API_URL, {
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
  }).then(async (response) => {
    if (!response.ok) {
      const errText = await response.text();
      let parsedMessage = errText;
      try {
        const json = JSON.parse(errText);
        parsedMessage = json.error?.message || json.error?.code || errText;
      } catch {
        // use raw
      }
      const err = new Error(parsedMessage);
      if (onError) onError(err);
      throw err;
    }

    const contentType = response.headers.get('content-type') || '';
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
              // ignore
            }
          }
        }
      }

      if (onDone) onDone();
      return { answer: fullAnswer, hymns: collectedHymns };
    } else {
      const json = await response.json();
      const answer = json.data?.answer || '';
      const hymns = json.data?.hymns || [];

      if (onHymns) onHymns(hymns);
      if (onDelta) onDelta(answer);
      if (onDone) onDone();

      return { answer, hymns };
    }
  });
}
