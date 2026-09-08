/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHino,
  getAllHymnsList,
  reloadCatalogWithData,
  subscribeToCatalogUpdates,
  initCatalogFromStorage,
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

test('unsubscribe deve parar de chamar o listener em novos reloads', () => {
  let callCount = 0;
  const unsubscribe = subscribeToCatalogUpdates(() => {
    callCount++;
  });

  const dummyData1 = {
    hinos: {},
    canticos: {},
    suplemento: {},
    novo: {},
    diversos: {},
  };

  reloadCatalogWithData(dummyData1 as any);
  assert.equal(callCount, 1);

  unsubscribe();

  reloadCatalogWithData(dummyData1 as any);
  assert.equal(callCount, 1, 'Listener nao deve ser chamado apos unsubscribe');
});

test('initCatalogFromStorage nao lanca erro e resolve de forma segura', async () => {
  await assert.doesNotReject(async () => {
    await initCatalogFromStorage();
  });
});
