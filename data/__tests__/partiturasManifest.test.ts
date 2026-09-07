/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';

// Support .webp requires in Node test runner before module load
// @ts-ignore
require.extensions['.webp'] = () => 1;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getPartitura, hasPartitura } = require('../partiturasManifest');

test('getPartitura deve retornar null para hinos do Hinário Novo (novo)', () => {
  assert.equal(getPartitura('novo', 1), null);
  assert.equal(getPartitura('novo', '1'), null);
  assert.equal(getPartitura('novo', 21), null);
});

test('hasPartitura deve retornar false para hinos do Hinário Novo (novo)', () => {
  assert.equal(hasPartitura('novo', 1), false);
  assert.equal(hasPartitura('novo', '1'), false);
  assert.equal(hasPartitura('novo', 21), false);
});

test('getPartitura e hasPartitura para hinos tradicionais (hinos)', () => {
  const p1 = getPartitura('hinos', 1);
  assert.ok(p1);
  assert.equal(p1?.book, 'hinos');
  assert.equal(p1?.numero, 1);
  assert.equal(hasPartitura('hinos', 1), true);
});

test('getPartitura e hasPartitura para Cânticos (canticos)', () => {
  const p1 = getPartitura('canticos', 1);
  assert.ok(p1);
  assert.equal(p1?.book, 'canticos');
  assert.equal(p1?.numero, 1);
  assert.equal(hasPartitura('canticos', 1), true);
});

test('getPartitura e hasPartitura para Suplemento (suplemento)', () => {
  const p1 = getPartitura('suplemento', 1);
  assert.ok(p1);
  assert.equal(p1?.book, 'suplemento');
  assert.equal(p1?.numero, 1);
  assert.equal(hasPartitura('suplemento', 1), true);
});

test('getPartitura e hasPartitura para livro desconhecido deve retornar null / false', () => {
  assert.equal(getPartitura('desconhecido', 1), null);
  assert.equal(hasPartitura('desconhecido', 1), false);
});
