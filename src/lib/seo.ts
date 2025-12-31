import type { BlogPost } from './blog';

const SITE_URL = 'https://localeflowapp.com';
const SITE_NAME = 'LocaleFlow';

// Generate blog post structured data (JSON-LD)
export function generateArticleSchema(post: BlogPost, readingTime: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    image: post.data.image ? `${SITE_URL}${post.data.image}` : undefined,
    datePublished: post.data.publishedAt.toISOString(),
    dateModified: (post.data.updatedAt || post.data.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.data.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.id}`,
    },
    wordCount: post.body?.split(/\s+/).length || 0,
    timeRequired: `PT${readingTime}M`,
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.data.title,
        item: `${SITE_URL}/blog/${post.id}`,
      },
    ],
  };
}

// Generate organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'LocaleFlow automatically translates your Shopify store content into multiple languages with AI-powered translation and automatic sync.',
    sameAs: [],
  };
}

// Generate blog index schema
export function generateBlogIndexSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description:
      'Guides, tutorials, and best practices for Shopify store translation and localization.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}

// Generate OpenGraph meta tags
export function generateOGTags(post: BlogPost) {
  return {
    'og:title': post.data.seoTitle || post.data.title,
    'og:description': post.data.description,
    'og:type': 'article',
    'og:url': `${SITE_URL}/blog/${post.id}`,
    'og:image': post.data.image
      ? `${SITE_URL}${post.data.image}`
      : `${SITE_URL}/og-default.png`,
    'og:site_name': SITE_NAME,
    'article:published_time': post.data.publishedAt.toISOString(),
    'article:modified_time': (
      post.data.updatedAt || post.data.publishedAt
    ).toISOString(),
    'article:author': post.data.author.name,
    'article:section': post.data.category,
    'article:tag': post.data.tags.join(','),
  };
}

// Generate Twitter card tags
export function generateTwitterTags(post: BlogPost) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': post.data.seoTitle || post.data.title,
    'twitter:description': post.data.description,
    'twitter:image': post.data.image
      ? `${SITE_URL}${post.data.image}`
      : `${SITE_URL}/og-default.png`,
  };
}

// Get canonical URL
export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
