import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'La Maison qui Tourne',
    description: "Home Assistant dans une vraie maison, avec deux enfants et un chat.",
    site: context.site,
    language: 'fr',
    items: articles.map(a => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/articles/${a.id}/`,
      categories: [a.data.category],
    })),
  });
}
