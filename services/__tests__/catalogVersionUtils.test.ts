/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { isNewerVersion, validateCatalogJson, parseSemver } from '../catalogVersionUtils';

test('parseSemver deve parsear versoes validas com ou sem prefixo v', () => {
  assert.deepEqual(parseSemver('1.0.0'), [1, 0, 0]);
  assert.deepEqual(parseSemver('v2.15.3'), [2, 15, 3]);
  assert.deepEqual(parseSemver('  1.2.3  '), [1, 2, 3]);
  assert.equal(parseSemver('invalid'), null);
  assert.equal(parseSemver(''), null);
  assert.equal(parseSemver('1.0'), null);
  assert.equal(parseSemver(null as any), null);
});

test('isNewerVersion deve identificar corretamente versoes mais recentes', () => {
  assert.equal(isNewerVersion('1.0.1', '1.0.0'), true);
  assert.equal(isNewerVersion('1.1.0', '1.0.9'), true);
  assert.equal(isNewerVersion('2.0.0', '1.9.9'), true);
  assert.equal(isNewerVersion('v1.0.1', '1.0.0'), true);
  assert.equal(isNewerVersion('1.0.0', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.0', '1.0.1'), false);
  assert.equal(isNewerVersion('invalid', '1.0.0'), false);
  assert.equal(isNewerVersion('', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.0', ''), false);
  assert.equal(isNewerVersion(null as any, '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.0', null as any), false);
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
  assert.equal(validateCatalogJson({ hinos: {}, canticos: {}, suplemento: {}, novo: {}, diversos: null }), false);
  assert.equal(validateCatalogJson(null as any), false);
  assert.equal(validateCatalogJson(undefined as any), false);
  assert.equal(validateCatalogJson([] as any), false);
  assert.equal(validateCatalogJson(123 as any), false);
});
