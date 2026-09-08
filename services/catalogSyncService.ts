import AsyncStorage from '@react-native-async-storage/async-storage';
import bundledVersion from '../data/catalogVersion.json';
import { CATALOG_CONFIG, CatalogVersionMetadata } from '../constants/catalogConfig';
import { isNewerVersion, validateCatalogJson } from './catalogVersionUtils';
import { reloadCatalogWithData } from '../data/hinosRepository';

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

// Fallback seguro de Toast para ambientes sem suporte a UI nativa
let Toast = {
  show: (_message: string) => {},
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const toastModule = require('../components/ui/Toast');
  if (toastModule?.Toast) {
    Toast = toastModule.Toast;
  }
} catch {
  // Ambiente de teste/node sem suporte nativo
}

export async function getCurrentCatalogVersion(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(CATALOG_CONFIG.STORAGE_KEYS.CATALOG_VERSION);
    if (stored) return stored;
  } catch {}
  return bundledVersion.version;
}

export async function isCatalogUpdateAvailable(): Promise<boolean> {
  try {
    const currentVersion = await getCurrentCatalogVersion();
    const versionUrl = `${CATALOG_CONFIG.BASE_URL}${CATALOG_CONFIG.VERSION_PATH}?_t=${Date.now()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CATALOG_CONFIG.CHECK_TIMEOUT_MS);

    try {
      const response = await fetch(versionUrl, { signal: controller.signal });
      if (response.ok) {
        const remoteMeta = (await response.json()) as CatalogVersionMetadata;
        if (remoteMeta?.version) {
          return isNewerVersion(remoteMeta.version, currentVersion);
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch {}
  return false;
}

export async function checkAndSyncCatalog(options?: {
  force?: boolean;
  notifyIfUpToDate?: boolean;
}): Promise<boolean> {
  if (isSyncing) return false;
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
        remoteMeta = (await response.json()) as CatalogVersionMetadata;
      }
    } catch {
      // Falha de rede ou timeout: sai silenciosamente mantendo dados locais
      if (options?.notifyIfUpToDate) {
        Toast.show('O catálogo já está atualizado');
      }
      return false;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!remoteMeta?.version) {
      if (options?.notifyIfUpToDate) {
        Toast.show('O catálogo já está atualizado');
      }
      return false;
    }

    const hasNewer = isNewerVersion(remoteMeta.version, currentVersion);
    if (!hasNewer && !options?.force) {
      if (options?.notifyIfUpToDate) {
        Toast.show('O catálogo já está atualizado');
      }
      return false;
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
      const total = (progress as any).totalBytesExpectedToWrite ?? (progress as any).totalBytes;
      const written = (progress as any).totalBytesWritten ?? (progress as any).bytesWritten;
      if (total > 0) {
        const ratio = written / total;
        catalogSyncEvents.notify(Math.min(0.98, ratio), true);
      }
    });

    let downloadedFile;
    try {
      downloadedFile = await task.downloadAsync();
    } finally {
      if (typeof (task as any).release === 'function') {
        try {
          (task as any).release();
        } catch {}
      }
    }
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
    return true;
  } catch (error) {
    // Garante que a barra de progresso suma em caso de erro silencioso
    catalogSyncEvents.notify(0, false);
    return false;
  } finally {
    isSyncing = false;
  }
}

/**
 * Função utilitária para testes/demonstração visual:
 * Simula o ciclo completo de download com TopProgressBar e Toast.
 */
export function simulateCatalogDownload(targetVersion = '1.0.1'): void {
  catalogSyncEvents.notify(0.05, true);
  let progress = 0.05;
  const timer = setInterval(() => {
    progress += 0.12;
    if (progress >= 1) {
      clearInterval(timer);
      catalogSyncEvents.notify(1, true);
      setTimeout(() => {
        catalogSyncEvents.notify(1, false);
      }, 450);
      Toast.show(`Catálogo de hinos atualizado (v${targetVersion})`);
    } else {
      catalogSyncEvents.notify(progress, true);
    }
  }, 200);
}
