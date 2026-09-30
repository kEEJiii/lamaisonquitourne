import test from 'node:test';
import assert from 'node:assert/strict';
import { handleViews } from '../src/server/view-api.js';
const slug = 'notifications-fin-lavage-home-assistant';
const url = `https://lamaisonquitourne.fr/api/views/${slug}`;
const request = (method = 'GET', origin = 'https://lamaisonquitourne.fr') => new Request(url, { method, headers: { Origin: origin } });
test('La lecture des tuiles ne compte pas de vue ; un POST incrémente le bon article', async () => {
  let count = 0; const names = [];
  const env = { ARTICLE_VIEWS: { getByName(name) { names.push(name); return { read: async () => count, increment: async () => ++count }; } } };
  for (let i = 0; i < 3; i++) assert.equal((await (await handleViews(request(), env)).json()).count, 0);
  assert.equal((await (await handleViews(request('POST'), env)).json()).count, 1);
  assert.equal((await (await handleViews(request(), env)).json()).count, 1);
  assert.ok(names.every(name => name === slug));
});
test('Les autres sites, articles inconnus et méthodes interdites ne peuvent incrémenter', async () => {
  const env = { ARTICLE_VIEWS: { getByName() { throw new Error('Ne doit pas être appelé'); } } };
  assert.equal((await handleViews(request('POST', 'https://ailleurs.fr'), env)).status, 403);
  assert.equal((await handleViews(new Request('https://lamaisonquitourne.fr/api/views/inconnu'), env)).status, 404);
  assert.equal((await handleViews(request('DELETE'), env)).status, 405);
});
test('Une panne ne renvoie jamais un faux zéro', async () => {
  assert.equal((await handleViews(request(), {})).status, 503);
  assert.equal((await handleViews(request(), { ARTICLE_VIEWS: { getByName() { throw new Error('Panne'); } } })).status, 503);
});
