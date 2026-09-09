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
