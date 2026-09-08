# Versionamento e Atualização Remota do Catálogo de Hinos - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o versionamento remoto e atualização em segundo plano do catálogo de hinos (`hinosData.json`), mantendo o app 100% offline-first com checagem ultraleve (`catalogVersion.json`), download atômico, barra de progresso sutil no topo (estilo NProgress) e notificação via `Toast`.

**Architecture:** O aplicativo abre instantaneamente no modo offline lendo o catálogo persistido em disco (`Paths.document`) ou o bundle padrão. Em paralelo e de forma não-bloqueante, um serviço consulta o arquivo remoto leve `catalogVersion.json` (~70 bytes). Caso haja versão superior, inicia o download atômico de `hinosData.json` para um arquivo temporário emitindo progresso para o componente `TopProgressBar`. Após validar o JSON, substitui atomicamente o catálogo em disco, atualiza o repositório em memória via `reloadCatalog()`, salva a versão no `AsyncStorage` e notifica via `Toast.show`.

**Tech Stack:** Expo SDK 57 (`expo-file-system`), `@react-native-async-storage/async-storage`, `react-native-reanimated`, React Native, TypeScript, Node.js Test Runner (`node:test`).

## Global Constraints

- O aplicativo deve permanecer 100% funcional e utilizável offline desde a abertura inicial.
- A checagem de versão remota deve consumir menos de 100 bytes e nunca bloquear a UI nem a navegação do usuário.
- Falhas de rede, timeouts ou arquivos corrompidos devem ser tratados silenciosamente, sem exibir erros na tela e sem sobrescrever o catálogo existente.
- Cores da barra de progresso devem vir estritamente de `constants/theme.ts` (`THEME_COLORS`).
- Para notificações, reutilizar estritamente o `Toast.show` de `components/ui/Toast.ts`.
- Todas as APIs públicas de `hinosRepository` (`getHino`, `getAllHymnsList`, `findHinoAnyBook`, etc.) devem manter suas assinaturas síncronas.

---

### Task 1: Setup da Versão Base e Configurações de Sincronização

**Files:**
- Create: `data/catalogVersion.json`
- Create: `constants/catalogConfig.ts`
- Test: `services/__tests__/catalogConfig.test.ts`

**Interfaces:**
- Consumes: Nenhuma
- Produces: `CATALOG_CONFIG` em `constants/catalogConfig.ts`, metadados de versão padrão em `data/catalogVersion.json`.

- [ ] **Step 1: Escrever o teste para catalogConfig e catalogVersion**

```typescript
// services/__tests__/catalogConfig.test.ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG_CONFIG } from '../../constants/catalogConfig';
import bundledVersion from '../../data/catalogVersion.json';

test('CATALOG_CONFIG deve conter paths e chaves configuradas', () => {
  assert.ok(CATALOG_CONFIG.BASE_URL, 'BASE_URL deve estar preenchida');
  assert.equal(CATALOG_CONFIG.VERSION_PATH, '/data/catalogVersion.json');
  assert.equal(CATALOG_CONFIG.DATA_PATH, '/data/hinosData.json');
  assert.equal(CATALOG_CONFIG.STORAGE_KEYS.CATALOG_VERSION, '@hinos_catalog_version');
  assert.ok(CATALOG_CONFIG.CHECK_TIMEOUT_MS > 0);
});

test('data/catalogVersion.json deve conter versao semver inicial valida', () => {
  assert.ok(bundledVersion.version, 'Deve possuir campo version');
  assert.match(bundledVersion.version, /^\d+\.\d+\.\d+$/, 'Deve seguir o padrao semver X.Y.Z');
});
```

- [ ] **Step 2: Executar o teste e verificar que falha**

Run: `npx tsx --test services/__tests__/catalogConfig.test.ts`
Expected: FAIL com módulo não encontrado.

- [ ] **Step 3: Criar `data/catalogVersion.json` e `constants/catalogConfig.ts`**

```json
// data/catalogVersion.json
{
  "version": "1.0.0",
  "updatedAt": "2026-09-08T00:00:00Z",
  "description": "Catalogo inicial consolidado com 100 hinos novos e diversos"
}
```

```typescript
// constants/catalogConfig.ts
export const CATALOG_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_CATALOG_URL ||
    'https://raw.githubusercontent.com/kcaiosouza/hinarioeav-igcg/main',
  VERSION_PATH: '/data/catalogVersion.json',
  DATA_PATH: '/data/hinosData.json',
  STORAGE_KEYS: {
    CATALOG_VERSION: '@hinos_catalog_version',
  },
  CHECK_TIMEOUT_MS: 5000,
} as const;

export interface CatalogVersionMetadata {
  version: string;
  updatedAt: string;
  description?: string;
}
```

- [ ] **Step 4: Executar o teste e verificar que passa**

Run: `npx tsx --test services/__tests__/catalogConfig.test.ts`
Expected: PASS com 2 testes aprovados.

- [ ] **Step 5: Commit**

```bash
git add data/catalogVersion.json constants/catalogConfig.ts services/__tests__/catalogConfig.test.ts
git commit -m "feat(catalog): adicionar catalogVersion.json inicial e constantes de configuracao"
```

---

### Task 2: Utilitários de Comparação de Versão e Validação de Integridade

**Files:**
- Create: `services/catalogVersionUtils.ts`
- Test: `services/__tests__/catalogVersionUtils.test.ts`

**Interfaces:**
- Consumes: Nenhuma
- Produces:
  - `isNewerVersion(remoteVersion: string, localVersion: string): boolean`
  - `validateCatalogJson(rawJson: string | object): boolean`

- [ ] **Step 1: Escrever os testes unitários para os utilitários**

```typescript
// services/__tests__/catalogVersionUtils.test.ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { isNewerVersion, validateCatalogJson } from '../catalogVersionUtils';

test('isNewerVersion deve identificar corretamente versoes mais recentes', () => {
  assert.equal(isNewerVersion('1.0.1', '1.0.0'), true);
  assert.equal(isNewerVersion('1.1.0', '1.0.9'), true);
  assert.equal(isNewerVersion('2.0.0', '1.9.9'), true);
  assert.equal(isNewerVersion('1.0.0', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.0', '1.0.1'), false);
  assert.equal(isNewerVersion('invalid', '1.0.0'), false);
});

test('validateCatalogJson deve validar estrutura esperada de hinos', () => {
  const validCatalog = {
    hinos: { '1': { numero: 1, titulo: 'Hino 1', estrofes: [], coro: null, categoria: 'Louvor' } },
    canticos: {},
    suplemento: {},
    novo: {},
    diversos: {},
  };

  assert.equal(validateCatalogJson(validCatalog), true);
  assert.equal(validateCatalogJson(JSON.stringify(validCatalog)), true);

  // Invalido: faltando chaves essenciais ou corrompido
  assert.equal(validateCatalogJson(''), false);
  assert.equal(validateCatalogJson('{ corrupt json'), false);
  assert.equal(validateCatalogJson({}), false);
  assert.equal(validateCatalogJson({ hinos: null }), false);
});
```

- [ ] **Step 2: Executar o teste e verificar que falha**

Run: `npx tsx --test services/__tests__/catalogVersionUtils.test.ts`
Expected: FAIL com funções não definidas.

- [ ] **Step 3: Implementar `services/catalogVersionUtils.ts`**

```typescript
// services/catalogVersionUtils.ts
export function parseSemver(version: string): [number, number, number] | null {
  if (!version || typeof version !== 'string') return null;
  const match = version.trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

export function isNewerVersion(remoteVersion: string, localVersion: string): boolean {
  const remote = parseSemver(remoteVersion);
  const local = parseSemver(localVersion);
  if (!remote || !local) return false;

  for (let i = 0; i < 3; i++) {
    if (remote[i] > local[i]) return true;
    if (remote[i] < local[i]) return false;
  }
  return false;
}

export function validateCatalogJson(content: string | object): boolean {
  try {
    let parsed: any = content;
    if (typeof content === 'string') {
      if (!content.trim()) return false;
      parsed = JSON.parse(content);
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return false;
    }

    const requiredKeys = ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'];
    for (const key of requiredKeys) {
      if (!(key in parsed) || typeof parsed[key] !== 'object' || parsed[key] === null) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Executar o teste e verificar que passa**

Run: `npx tsx --test services/__tests__/catalogVersionUtils.test.ts`
Expected: PASS com todos os testes aprovados.

- [ ] **Step 5: Commit**

```bash
git add services/catalogVersionUtils.ts services/__tests__/catalogVersionUtils.test.ts
git commit -m "feat(catalog): adicionar utilitarios de comparacao de versao e validacao de integridade"
```

---

### Task 3: Suporte a Carregamento do Arquivo Persistido no Repositório de Hinos

**Files:**
- Modify: `data/hinosRepository.ts`
- Test: `data/__tests__/hinosRepositorySync.test.ts`

**Interfaces:**
- Consumes: `data/hinosData.json` (fallback bundle)
- Produces:
  - `initCatalogFromStorage(): Promise<void>`
  - `reloadCatalogWithData(newData: HinosDataStructure): void`
  - `subscribeToCatalogUpdates(listener: () => void): () => void`
  - Continua exportando `getHino`, `findHinoAnyBook`, `getBookTitles`, `getAllHymnsList` de forma síncrona.

- [ ] **Step 1: Escrever os testes de recarga e integridade do repositório**

```typescript
// data/__tests__/hinosRepositorySync.test.ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHino,
  getAllHymnsList,
  reloadCatalogWithData,
  subscribeToCatalogUpdates,
} from '../hinosRepository';

test('hinosRepository deve permitir atualizacao dinamica via reloadCatalogWithData e notificar listeners', () => {
  let notified = false;
  const unsubscribe = subscribeToCatalogUpdates(() => {
    notified = true;
  });

  const customHino = {
    numero: 9999,
    titulo: 'Hino Teste Dinamico',
    estrofes: ['Estrofe 1'],
    coro: null,
    categoria: 'Especial',
  };

  const dummyData = {
    hinos: { '9999': customHino },
    canticos: {},
    suplemento: {},
    novo: {},
    diversos: {},
  };

  reloadCatalogWithData(dummyData as any);

  assert.equal(notified, true, 'Listener deve ter sido notificado');
  assert.equal(getHino('hinos', 9999)?.titulo, 'Hino Teste Dinamico');

  unsubscribe();
});
```

- [ ] **Step 2: Executar o teste e verificar que falha**

Run: `npx tsx --test data/__tests__/hinosRepositorySync.test.ts`
Expected: FAIL (`reloadCatalogWithData` / `subscribeToCatalogUpdates` não existem).

- [ ] **Step 3: Modificar `data/hinosRepository.ts`**

Adicionar suporte a dados mutáveis em memória, listeners de atualização, carregamento seguro do filesystem (`expo-file-system`) e função de reload:

```typescript
import hinosData from './hinosData.json';
import { BookKey } from '../types/hinario';
import { Hino } from '../types/hino';
import { validateCatalogJson } from '../services/catalogVersionUtils';

export type HinosDataStructure = Record<string, Record<string, Hino>>;

let typedData: HinosDataStructure = hinosData as unknown as HinosDataStructure;
const listeners = new Set<() => void>();

export function subscribeToCatalogUpdates(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function reloadCatalogWithData(newData: HinosDataStructure): void {
  typedData = newData;
  for (const listener of listeners) {
    try {
      listener();
    } catch (err) {
      console.warn('Erro ao notificar listener do catalogo:', err);
    }
  }
}

export async function initCatalogFromStorage(): Promise<void> {
  try {
    const { File, Paths } = await import('expo-file-system');
    const localFile = new File(Paths.document, 'hinosData.json');
    if (localFile.exists) {
      const text = await localFile.text();
      if (validateCatalogJson(text)) {
        typedData = JSON.parse(text) as HinosDataStructure;
      }
    }
  } catch (error) {
    // Falha silenciosa: continua usando typedData embutido do bundle
  }
}

export function getHino(bookKey: string, numberOrId: string | number): Hino | null {
  const key = String(numberOrId);
  if (typedData[bookKey] && typedData[bookKey][key]) {
    return typedData[bookKey][key];
  }
  return null;
}

export function findHinoAnyBook(numberOrId: string | number): { hino: Hino; bookKey: BookKey } | null {
  const key = String(numberOrId);
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    if (typedData[bKey]?.[key]) {
      return { hino: typedData[bKey][key], bookKey: bKey };
    }
  }
  return null;
}

export function getBookTitles(bookKey: string): Record<string, string> {
  const book = typedData[bookKey] || {};
  const map: Record<string, string> = {};
  for (const [num, hino] of Object.entries(book)) {
    map[num] = hino.titulo;
  }
  return map;
}

export function getAllHymnsList(): Array<Hino & { bookKey: BookKey }> {
  const list: Array<Hino & { bookKey: BookKey }> = [];
  for (const bKey of ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'] as BookKey[]) {
    const book = typedData[bKey] || {};
    for (const hino of Object.values(book)) {
      list.push({ ...hino, bookKey: bKey });
    }
  }
  return list;
}
```

- [ ] **Step 4: Executar os testes e verificar que passam**

Run: `npx tsx --test data/__tests__/hinosRepositorySync.test.ts data/__tests__/diversosRepository.test.ts`
Expected: PASS com todos os testes do repositório funcionando.

- [ ] **Step 5: Commit**

```bash
git add data/hinosRepository.ts data/__tests__/hinosRepositorySync.test.ts
git commit -m "feat(catalog): adicionar suporte a atualizacao dinamica e inicializacao local do catalogo"
```

---

### Task 4: Serviço de Sincronização em Background (`catalogSyncService.ts`)

**Files:**
- Create: `services/catalogSyncService.ts`
- Test: `services/__tests__/catalogSyncService.test.ts`

**Interfaces:**
- Consumes:
  - `CATALOG_CONFIG` de `constants/catalogConfig.ts`
  - `isNewerVersion`, `validateCatalogJson` de `services/catalogVersionUtils.ts`
  - `reloadCatalogWithData` de `data/hinosRepository.ts`
  - `Toast` de `components/ui/Toast.ts`
- Produces:
  - `syncEvents`: EventEmitter ou callbacks para progresso (`onProgress(percent: number, active: boolean)`)
  - `checkAndSyncCatalog(options?: { force?: boolean }): Promise<void>`
  - `getCurrentCatalogVersion(): Promise<string>`

- [ ] **Step 1: Escrever os testes unitários do serviço de sincronização**

```typescript
// services/__tests__/catalogSyncService.test.ts
/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogSyncEvents } from '../catalogSyncService';

test('catalogSyncEvents deve emitir atualizacoes de progresso para os ouvintes', () => {
  let recordedProgress = -1;
  let recordedActive = false;

  const unsubscribe = catalogSyncEvents.subscribe((progress, active) => {
    recordedProgress = progress;
    recordedActive = active;
  });

  catalogSyncEvents.notify(0.45, true);
  assert.equal(recordedProgress, 0.45);
  assert.equal(recordedActive, true);

  catalogSyncEvents.notify(1, false);
  assert.equal(recordedProgress, 1);
  assert.equal(recordedActive, false);

  unsubscribe();
});
```

- [ ] **Step 2: Executar o teste e verificar que falha**

Run: `npx tsx --test services/__tests__/catalogSyncService.test.ts`
Expected: FAIL com `catalogSyncEvents` não definido.

- [ ] **Step 3: Implementar `services/catalogSyncService.ts`**

```typescript
// services/catalogSyncService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import bundledVersion from '../data/catalogVersion.json';
import { CATALOG_CONFIG, CatalogVersionMetadata } from '../constants/catalogConfig';
import { isNewerVersion, validateCatalogJson } from './catalogVersionUtils';
import { reloadCatalogWithData } from '../data/hinosRepository';
import { Toast } from '../components/ui/Toast';

type ProgressListener = (progress: number, active: boolean) => void;

class CatalogSyncEventEmitter {
  private listeners = new Set<ProgressListener>();

  subscribe(listener: ProgressListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(progress: number, active: boolean): void {
    for (const listener of this.listeners) {
      try {
        listener(progress, active);
      } catch (err) {
        console.warn('Erro no progress listener:', err);
      }
    }
  }
}

export const catalogSyncEvents = new CatalogSyncEventEmitter();

let isSyncing = false;

export async function getCurrentCatalogVersion(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(CATALOG_CONFIG.STORAGE_KEYS.CATALOG_VERSION);
    if (stored) return stored;
  } catch {}
  return bundledVersion.version;
}

export async function checkAndSyncCatalog(options?: { force?: boolean }): Promise<void> {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const currentVersion = await getCurrentCatalogVersion();
    const versionUrl = `${CATALOG_CONFIG.BASE_URL}${CATALOG_CONFIG.VERSION_PATH}?_t=${Date.now()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CATALOG_CONFIG.CHECK_TIMEOUT_MS);

    let remoteMeta: CatalogVersionMetadata | null = null;
    try {
      const response = await fetch(versionUrl, { signal: controller.signal });
      if (response.ok) {
        remoteMeta = await response.json();
      }
    } catch {
      // Falha de rede ou timeout: sai silenciosamente mantendo dados locais
      return;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!remoteMeta?.version) return;

    const hasNewer = isNewerVersion(remoteMeta.version, currentVersion);
    if (!hasNewer && !options?.force) {
      return;
    }

    // Inicia download com barra de progresso ativa
    catalogSyncEvents.notify(0, true);

    const { File, Paths, DownloadTask } = await import('expo-file-system');
    const dataUrl = `${CATALOG_CONFIG.BASE_URL}${CATALOG_CONFIG.DATA_PATH}?_t=${Date.now()}`;
    const tmpFile = new File(Paths.document, 'hinosData.tmp.json');
    const destFile = new File(Paths.document, 'hinosData.json');

    if (tmpFile.exists) {
      try {
        await tmpFile.delete();
      } catch {}
    }

    const task = new DownloadTask(dataUrl, tmpFile);
    task.addListener('progress', (progress) => {
      if (progress.totalBytesExpectedToWrite > 0) {
        const ratio = progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
        catalogSyncEvents.notify(Math.min(0.98, ratio), true);
      }
    });

    const downloadedFile = await task.downloadAsync();
    if (!downloadedFile || !downloadedFile.exists) {
      throw new Error('Arquivo baixado nao existe');
    }

    const jsonText = await downloadedFile.text();
    if (!validateCatalogJson(jsonText)) {
      try {
        await downloadedFile.delete();
      } catch {}
      throw new Error('JSON baixado invalido ou corrompido');
    }

    // Substituicao atomica
    if (destFile.exists) {
      try {
        await destFile.delete();
      } catch {}
    }
    await downloadedFile.copy(destFile);
    try {
      await downloadedFile.delete();
    } catch {}

    // Atualiza memoria e AsyncStorage
    const parsedData = JSON.parse(jsonText);
    reloadCatalogWithData(parsedData);
    await AsyncStorage.setItem(CATALOG_CONFIG.STORAGE_KEYS.CATALOG_VERSION, remoteMeta.version);

    catalogSyncEvents.notify(1, true);
    setTimeout(() => {
      catalogSyncEvents.notify(1, false);
    }, 400);

    Toast.show(`Catálogo de hinos atualizado (v${remoteMeta.version})`);
  } catch (error) {
    // Garante que a barra de progresso suma em caso de erro silencioso
    catalogSyncEvents.notify(0, false);
  } finally {
    isSyncing = false;
  }
}
```

- [ ] **Step 4: Executar o teste e verificar que passa**

Run: `npx tsx --test services/__tests__/catalogSyncService.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add services/catalogSyncService.ts services/__tests__/catalogSyncService.test.ts
git commit -m "feat(catalog): implementar servico de verificacao e download atomico com controle de progresso"
```

---

### Task 5: Componente Visual `TopProgressBar` e Integração no `RootLayout`

**Files:**
- Create: `components/ui/TopProgressBar.tsx`
- Modify: `app/_layout.tsx`

**Interfaces:**
- Consumes:
  - `catalogSyncEvents` de `services/catalogSyncService.ts`
  - `THEME_COLORS` de `constants/theme.ts`
  - `initCatalogFromStorage`, `checkAndSyncCatalog` de `services/catalogSyncService.ts` / `data/hinosRepository.ts`
- Produces: Visual sutil no topo (NProgress) sem bloquear touch events.

- [ ] **Step 1: Criar o componente `components/ui/TopProgressBar.tsx`**

```tsx
// components/ui/TopProgressBar.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { THEME_COLORS } from '../../constants/theme';
import { catalogSyncEvents } from '../../services/catalogSyncService';

export function TopProgressBar() {
  const [visible, setVisible] = useState(false);
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    return catalogSyncEvents.subscribe((ratio, active) => {
      if (active) {
        setVisible(true);
        opacity.value = withTiming(1, { duration: 200 });
        progress.value = withTiming(ratio, {
          duration: 250,
          easing: Easing.out(Easing.quad),
        });
      } else {
        progress.value = withTiming(1, { duration: 150 });
        opacity.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            progress.value = 0;
          }
        });
        setTimeout(() => setVisible(false), 400);
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${Math.min(100, Math.max(0, progress.value * 100))}%`,
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 99999,
    backgroundColor: 'transparent',
  },
  bar: {
    height: '100%',
    backgroundColor: THEME_COLORS.goldSoft,
    shadowColor: THEME_COLORS.gold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
});
```

- [ ] **Step 2: Integrar em `app/_layout.tsx`**

1. Importar `TopProgressBar` e colocar dentro de `RootLayout`.
2. No `useEffect` inicial (após hide do splash screen ou junto com carregamento):
   - Invocar `initCatalogFromStorage()` para priorizar o arquivo local se existir.
   - Disparar `checkAndSyncCatalog()` em background.

- [ ] **Step 3: Executar typecheck e testes para validar integração**

Run: `npm run typecheck`
Expected: 0 erros de tipos.

- [ ] **Step 4: Commit**

```bash
git add components/ui/TopProgressBar.tsx app/_layout.tsx
git commit -m "feat(ui): adicionar TopProgressBar estilo NProgress e disparar sincronizacao no RootLayout"
```

---

### Task 6: Validação Completa, Testes Finais e Documentação

**Files:**
- Modify: `README.md`
- Test: Todos os arquivos de teste

**Interfaces:**
- Consumes: Todas as implementações anteriores.
- Produces: Documentação atualizada e suite completa de testes verdes.

- [ ] **Step 1: Rodar toda a suite de testes automatizados**

Run: `npx tsx --test services/__tests__/*.test.ts data/__tests__/*.test.ts`
Expected: Todos os testes PASS.

- [ ] **Step 2: Atualizar `README.md` documentando a funcionalidade de sincronização e versionamento**

Adicionar na seção de funcionalidades do README a explicação de como o catálogo de hinos é atualizado offline-first com checagem remota de versão e barra de progresso.

- [ ] **Step 3: Executar typecheck final**

Run: `npm run typecheck`
Expected: 0 erros.

- [ ] **Step 4: Commit final**

```bash
git add README.md
git commit -m "docs(readme): documentar versionamento e atualizacao remota do catalogo de hinos"
```
