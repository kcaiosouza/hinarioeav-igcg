/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getHymnNavTitle } from '../hymnDisplay';

test('getHymnNavTitle formata Hinos tradicionais como H{numero}', () => {
  assert.equal(getHymnNavTitle('hinos', 1), 'H1');
  assert.equal(getHymnNavTitle('hinos', 250), 'H250');
  assert.equal(getHymnNavTitle(undefined, 42), 'H42');
});

test('getHymnNavTitle formata Cânticos como C{numero}', () => {
  assert.equal(getHymnNavTitle('canticos', 1), 'C1');
  assert.equal(getHymnNavTitle('cantico', 10), 'C10');
});

test('getHymnNavTitle formata Suplemento como S{numero}', () => {
  assert.equal(getHymnNavTitle('suplemento', 1), 'S1');
  assert.equal(getHymnNavTitle('suplementos', 15), 'S15');
});

test('getHymnNavTitle formata Hinário Novo como Hino {numero}', () => {
  assert.equal(getHymnNavTitle('novo', 1), 'Hino 1');
  assert.equal(getHymnNavTitle('novo', 21), 'Hino 21');
});

test('getHymnNavTitle com número <= 0 retorna fallbackCategoria ou Hino', () => {
  assert.equal(getHymnNavTitle('hinos', 0, 'Correlacionados'), 'Correlacionados');
  assert.equal(getHymnNavTitle('novo', -1), 'Hino');
  assert.equal(getHymnNavTitle('canticos', undefined), 'Hino');
});
