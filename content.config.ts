import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      'Le pont HomeKit',
      'Sécurité & présence',
      'Chauffage & confort',
      'Matériel & réseau',
      'Extérieur',
    ]),
    etat: z.enum(['tourne', 'bricole', 'abandonne']).default('tourne'),
    etatLabel: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
