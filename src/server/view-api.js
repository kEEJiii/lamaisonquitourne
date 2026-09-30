import slugs from './article-slugs.json' with { type: 'json' };
const allowed = new Set(slugs);
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

export async function handleViews(request, env) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/api\/views\/([a-z0-9-]+)\/?$/);
  if (!match || !allowed.has(match[1])) return json({ error: 'Article introuvable' }, 404);
  if (!['GET', 'POST'].includes(request.method)) return json({ error: 'Méthode non autorisée' }, 405, { Allow: 'GET, POST' });
  if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) return json({ error: 'Origine non autorisée' }, 403);
  if (!env.ARTICLE_VIEWS) return json({ error: 'Compteur indisponible' }, 503);
  try {
    const counter = env.ARTICLE_VIEWS.getByName(match[1]);
    const count = request.method === 'POST' ? await counter.increment() : await counter.read();
    return json({ count });
  } catch { return json({ error: 'Compteur indisponible' }, 503); }
}
