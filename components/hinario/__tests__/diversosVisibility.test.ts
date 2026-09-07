/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllHymnsList } from '../../../data/hinosRepository';
import { normalizeSearchText } from '../../../utils/textNormalize';
import * as fs from 'node:fs';
import * as path from 'node:path';

test('O seletor de livros do teclado nao deve conter a secao diversos', () => {
  const bookSelectContent = fs.readFileSync(
    path.resolve(__dirname, '../BookSelect.tsx'),
    'utf-8'
  );

  // Verifica que a constante BOOK_KEYS contem apenas os 4 hinarios tradicionais
  assert.match(
    bookSelectContent,
    /const BOOK_KEYS:\s*BookKey\[\]\s*=\s*\['hinos',\s*'canticos',\s*'suplemento',\s*'novo'\];/
  );
  assert.ok(!bookSelectContent.includes("'diversos'"), "BookSelect nao pode incluir 'diversos'");
});

test('A busca deve indexar hinos de Diversos com nome da categoria correspondente', () => {
  const all = getAllHymnsList();
  const diversosHymn = all.find((h) => h.bookKey === 'diversos');
  assert.ok(diversosHymn, 'Deve existir hino de diversos');
  assert.equal(diversosHymn?.categoria, 'Diversos');

  const normalizedCategory = normalizeSearchText(diversosHymn?.categoria || '');
  assert.equal(normalizedCategory, 'diversos');
});
