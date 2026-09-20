import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchCatalog, filterAndScoreHymns } from '../searchHymns';
import { BookKey } from '../../types/hinario';
import { Hino } from '../../types/hino';

const mockHymns: Array<Hino & { bookKey: BookKey }> = [
  {
    id: '15',
    numero: 15,
    titulo: 'Graça Divina',
    categoria: 'Hinos',
    bookKey: 'hinos',
    estrofes: ['Maravilhosa graça de Jesus', 'Que perdoa todo pecador'],
    coro: 'Graça, graça, graça divina',
  },
  {
    id: '150',
    numero: 150,
    titulo: 'O Amor de Deus',
    categoria: 'Hinos',
    bookKey: 'hinos',
    estrofes: ['O amor de Deus é tão sublime'],
    coro: undefined,
  },
  {
    id: '1',
    numero: 1,
    titulo: 'Ao Findar o Dia',
    categoria: 'Hinário Novo',
    bookKey: 'novo',
    estrofes: ['Quando o sol se põe no horizonte', 'A graça nos sustenta sempre'],
    coro: undefined,
  },
];

test('buildSearchCatalog deve mapear hinos com secoes e letras normalizadas', () => {
  const catalog = buildSearchCatalog(mockHymns);
  assert.equal(catalog.length, 3);
  assert.equal(catalog[0].normNumber, '15');
  assert.equal(catalog[0].normTitle, 'graca divina');
  assert.equal(catalog[0].sections.length, 3); // 2 estrofes + 1 coro
});

test('filterAndScoreHymns deve retornar catalogo completo quando a query for vazia', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, '');
  assert.equal(results.length, 3);
});

test('filterAndScoreHymns deve priorizar correspondencia exata de numero com score maximo', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, '15');
  assert.ok(results.length >= 1);
  assert.equal(results[0].id, '15');
  assert.equal(results[0].score, 100);
});

test('filterAndScoreHymns deve priorizar correspondencia de titulo sobre letra', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, 'graça');
  assert.ok(results.length >= 2);
  assert.equal(results[0].id, '15');
  assert.equal(results[1].id, '1');
});

test('filterAndScoreHymns deve gerar snippet contextual do trecho correspondente da letra', () => {
  const catalog = buildSearchCatalog(mockHymns);
  const results = filterAndScoreHymns(catalog, 'horizonte');
  assert.equal(results.length, 1);
  assert.equal(results[0].id, '1');
  assert.ok(results[0].snippet?.includes('horizonte'));
});

test('filterAndScoreHymns deve executar teste de performance em menos de 15ms para acervo grande', () => {
  const largeMockList: Array<Hino & { bookKey: BookKey }> = [];
  for (let i = 0; i < 610; i++) {
    for (const h of mockHymns) {
      largeMockList.push({
        ...h,
        id: `${h.bookKey}-${h.id}-${i}`,
        numero: i + 1,
      });
    }
  }
  const largeCatalog = buildSearchCatalog(largeMockList);
  assert.equal(largeCatalog.length, 1830);

  const start = performance.now();
  const results = filterAndScoreHymns(largeCatalog, 'graça');
  const duration = performance.now() - start;

  assert.ok(results.length > 0);
  assert.ok(duration < 15, `Duracao esperada < 15ms, obtido: ${duration.toFixed(2)}ms`);
});
