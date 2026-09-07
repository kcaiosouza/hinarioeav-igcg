/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getAdjacentHymn, canNavigate } from '../partituraNavigation';

test('canNavigate deve retornar false para hino 1 ao navegar para trás em hinos', () => {
  assert.equal(canNavigate('hinos', 1, 'prev'), false);
  assert.equal(canNavigate('hinos', '1', 'prev'), false);
});

test('canNavigate deve retornar true para hino 2 ao navegar para trás', () => {
  assert.equal(canNavigate('hinos', 2, 'prev'), true);
});

test('getAdjacentHymn prev a partir do hino 2 retorna hino 1', () => {
  const result = getAdjacentHymn('hinos', 2, 'prev');
  assert.ok(result);
  assert.equal(result.numero, 1);
  assert.ok(result.titulo.length > 0);
});

test('getAdjacentHymn next a partir do hino 1 retorna hino 2', () => {
  const result = getAdjacentHymn('hinos', 1, 'next');
  assert.ok(result);
  assert.equal(result.numero, 2);
  assert.ok(result.titulo.length > 0);
});

test('canNavigate next no último hino retorna false', () => {
  assert.equal(canNavigate('hinos', 500, 'next'), false);
  assert.equal(getAdjacentHymn('hinos', 500, 'next'), null);
  assert.equal(canNavigate('novo', 39, 'next'), false);
  assert.equal(getAdjacentHymn('novo', 39, 'next'), null);
});

test('getAdjacentHymn retorna null para número inválido ou livro inexistente', () => {
  assert.equal(getAdjacentHymn('hinos', 'invalid', 'next'), null);
  assert.equal(canNavigate('hinos', 'invalid', 'next'), false);
  assert.equal(getAdjacentHymn('nonexistent', 1, 'next'), null);
});
