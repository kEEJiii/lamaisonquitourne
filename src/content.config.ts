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
      'Automatisations du quotidien',
    ]),
    etat: z.enum(['tourne', 'bricole', 'abandonne']).default('tourne'),
    etatLabel: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    pratique: z.object({
      difficulte: z.string(),
      materiel: z.array(z.string()).min(1),
      etapes: z.array(z.string()).min(1),
      lien: z.object({ href: z.string(), texte: z.string() }).optional(),
      note: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { articles };
