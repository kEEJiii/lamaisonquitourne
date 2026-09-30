import { DurableObject } from 'cloudflare:workers';
import { handleViews } from './view-api.js';

export class ArticleViews extends DurableObject {
  async read() {
    return (await this.ctx.storage.get('count')) ?? 0;
  }
  async increment() {
    return this.ctx.storage.transaction(async storage => {
      const count = ((await storage.get('count')) ?? 0) + 1;
      await storage.put('count', count);
      return count;
    });
  }
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname.startsWith('/api/views/')) return handleViews(request, env);
    return env.ASSETS.fetch(request);
  },
};
