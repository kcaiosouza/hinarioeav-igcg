/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getHino, getAllHymnsList, findHinoAnyBook, getBookTitles } from '../hinosRepository';
import { INITIAL_BOOKS } from '../mockHinario';

test('diversos deve estar registrado em INITIAL_BOOKS', () => {
  assert.ok(INITIAL_BOOKS.diversos);
  assert.equal(INITIAL_BOOKS.diversos.key, 'diversos');
  assert.equal(INITIAL_BOOKS.diversos.name, 'Diversos');
  assert.equal(INITIAL_BOOKS.diversos.label, 'D');
});

test('getHino deve carregar hino da secao diversos', () => {
  const hino = getHino('diversos', 1);
  assert.ok(hino, 'Hino 1 de diversos deve existir');
  assert.equal(hino?.categoria, 'Diversos');
  assert.equal(hino?.numero, 1);
});

test('getAllHymnsList deve incluir hinos da secao diversos', () => {
  const all = getAllHymnsList();
  const diversosHinos = all.filter((h) => h.bookKey === 'diversos');
  assert.ok(diversosHinos.length > 0, 'Deve conter ao menos um hino de diversos');
});

test('getBookTitles deve retornar titulos de diversos', () => {
  const titles = getBookTitles('diversos');
  assert.ok(titles['1']);
});
