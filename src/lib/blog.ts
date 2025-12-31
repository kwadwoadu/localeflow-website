import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

// Blog categories metadata
export const BLOG_CATEGORIES = {
  guides: {
    label: 'Guides',
    description: 'Step-by-step localization tutorials',
  },
  'best-practices': {
    label: 'Best Practices',
    description: 'Translation quality and multi-language SEO',
  },
  'case-studies': {
    label: 'Case Studies',
    description: 'Merchant success stories',
  },
  'shopify-markets': {
    label: 'Shopify Markets',
    description: 'Tips for Shopify Markets and localization',
  },
  'agency-resources': {
    label: 'Agency Resources',
    description: 'Resources for Shopify agency partners',
  },
  comparisons: {
    label: 'Comparisons',
    description: 'App comparisons and alternatives',
  },
  updates: {
    label: 'Product Updates',
    description: 'New features and announcements',
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

// Calculate reading time (200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all published posts sorted by date (newest first)
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}

// Get posts by category
export async function getPostsByCategory(
  category: BlogCategory
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}

// Get featured posts
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

// Get related posts (same category + shared tags)
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllPosts();

  const scored = posts
    .filter((p) => p.id !== currentPost.id)
    .map((post) => {
      let score = 0;
      if (post.data.category === currentPost.data.category) score += 2;
      const sharedTags = post.data.tags.filter((tag) =>
        currentPost.data.tags.includes(tag)
      );
      score += sharedTags.length;
      return { post, score };
    });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.data.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Get post URL
export function getPostUrl(post: BlogPost): string {
  return `/blog/${post.id}`;
}

// Paginate posts
export function paginatePosts(
  posts: BlogPost[],
  page: number,
  perPage = 12
): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalPages = Math.ceil(posts.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * perPage;
  const paginatedPosts = posts.slice(start, start + perPage);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
