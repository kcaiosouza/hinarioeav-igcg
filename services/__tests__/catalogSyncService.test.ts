/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  catalogSyncEvents,
  getCurrentCatalogVersion,
  checkAndSyncCatalog,
} from '../catalogSyncService';
import bundledVersion from '../../data/catalogVersion.json';

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

test('catalogSyncEvents unsubscribe deve cessar notificacoes ao listener desinscrito', () => {
  let callCount = 0;

  const unsubscribe = catalogSyncEvents.subscribe(() => {
    callCount++;
  });

  catalogSyncEvents.notify(0.1, true);
  assert.equal(callCount, 1);

  unsubscribe();

  catalogSyncEvents.notify(0.2, true);
  assert.equal(callCount, 1, 'Nao deve receber notificacoes apos unsubscribe');
});

test('getCurrentCatalogVersion deve retornar a versao bundled padrao quando nada esta salvo', async () => {
  const version = await getCurrentCatalogVersion();
  assert.equal(typeof version, 'string');
  assert.equal(version, bundledVersion.version);
});

test('checkAndSyncCatalog lida silenciosamente com falhas de rede sem lancar erro', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => Promise.reject(new Error('Network offline'));

  try {
    await assert.doesNotReject(async () => {
      await checkAndSyncCatalog();
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('checkAndSyncCatalog nao quebra se resposta remota for 404 ou 500', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () =>
    Promise.resolve(
      new Response('Not Found', { status: 404, statusText: 'Not Found' })
    );

  try {
    await assert.doesNotReject(async () => {
      await checkAndSyncCatalog();
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('checkAndSyncCatalog nao faz download quando versao remota nao for mais recente e force nao for passado', async () => {
  const originalFetch = globalThis.fetch;
  let downloadedAttempted = false;

  globalThis.fetch = (url: any) => {
    if (String(url).includes('catalogVersion.json')) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            version: '1.0.0',
            updatedAt: '2026-09-08T00:00:00Z',
          }),
          { status: 200, headers: { 'content-type': 'application/json' } }
        )
      );
    }
    downloadedAttempted = true;
    return Promise.reject(new Error('Should not fetch dataUrl'));
  };

  try {
    await checkAndSyncCatalog();
    assert.equal(downloadedAttempted, false, 'Nao deve tentar download se a versao for igual');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('catalogSyncEvents lida com excecao em ouvinte sem interromper outros ouvintes', () => {
  let secondListenerCalled = false;

  const unsub1 = catalogSyncEvents.subscribe(() => {
    throw new Error('Listener falhou propositalmente');
  });

  const unsub2 = catalogSyncEvents.subscribe((_progress, active) => {
    if (active) secondListenerCalled = true;
  });

  try {
    assert.doesNotThrow(() => {
      catalogSyncEvents.notify(0.5, true);
    });
    assert.equal(secondListenerCalled, true, 'Segundo listener deve ser chamado mesmo se o primeiro falhar');
  } finally {
    unsub1();
    unsub2();
  }
});

