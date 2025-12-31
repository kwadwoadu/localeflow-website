import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    // Core fields
    title: z.string().max(70),
    description: z.string().max(160),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),

    // Author
    author: z
      .object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().optional(),
      })
      .default({ name: 'LocaleFlow Team' }),

    // Categorization
    category: z.enum([
      'guides',
      'best-practices',
      'case-studies',
      'shopify-markets',
      'agency-resources',
      'comparisons',
      'updates',
    ]),
    tags: z.array(z.string()).default([]),

    // Images
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // Content flags
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // SEO overrides
    seoTitle: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
