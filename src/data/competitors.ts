// Competitor data for comparison pages

export interface Competitor {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  appStoreUrl: string;
  rating: number | null;
  reviews: number;
  pricing: {
    base: string;
    trueCost: string;
    model: string;
  };
  features: {
    autoSync: boolean | 'partial';
    aiTranslation: boolean | 'add-on';
    wordLimit: string;
    metaobjects: boolean;
    metafields: boolean;
    customPrompts: boolean;
    termBlacklist: boolean;
    currencyConverter: boolean;
  };
  ai: {
    type: 'native' | 'added' | 'none';
    engines: string[];
  };
  strengths: string[];
  weaknesses: string[];
  ourAngle: string;
  targetAudience: string;
  isAINative: boolean;
}

export const localflow: Competitor = {
  id: 'localeflow',
  name: 'LocaleFlow',
  slug: 'localeflow',
  tagline: 'AI-powered Shopify translation that syncs automatically',
  appStoreUrl: 'https://apps.shopify.com/locale-flow',
  rating: null, // New app - reviews building
  reviews: 0,
  pricing: {
    base: '$150/mo',
    trueCost: '$150/mo',
    model: 'Flat rate, unlimited languages',
  },
  features: {
    autoSync: true,
    aiTranslation: true,
    wordLimit: 'Unlimited',
    metaobjects: true,
    metafields: true,
    customPrompts: true,
    termBlacklist: true,
    currencyConverter: false,
  },
  ai: {
    type: 'native',
    engines: ['Claude AI'],
  },
  strengths: [
    'Automatic sync - no manual updates needed',
    'Full metaobject support',
    'Custom AI prompts for brand voice',
    'Transparent pricing',
  ],
  weaknesses: [],
  ourAngle: '',
  targetAudience: 'Growing Shopify stores wanting hands-off translation',
  isAINative: true,
};

// Main competitors (for hub comparison page)
export const mainCompetitors: Competitor[] = [
  {
    id: 'langify',
    name: 'Langify',
    slug: 'langify',
    tagline: 'Manual translation management for Shopify',
    appStoreUrl: 'https://apps.shopify.com/langify',
    rating: 4.6,
    reviews: 1400,
    pricing: {
      base: '$17.50/mo',
      trueCost: '$30-70+/mo',
      model: 'Base + add-ons',
    },
    features: {
      autoSync: false,
      aiTranslation: 'add-on',
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'added',
      engines: ['Optional add-on'],
    },
    strengths: ['Established player', 'Large user base', 'Affordable base price'],
    weaknesses: ['No auto-sync', 'AI is add-on cost', 'No metaobject support'],
    ourAngle: 'Auto-sync saves hours of manual work',
    targetAudience: 'Budget-conscious stores willing to manage translations manually',
    isAINative: false,
  },
  {
    id: 'weglot',
    name: 'Weglot',
    slug: 'weglot',
    tagline: 'Website translation with word limits',
    appStoreUrl: 'https://apps.shopify.com/weglot',
    rating: 4.5,
    reviews: 1800,
    pricing: {
      base: '$15/mo',
      trueCost: '$79-299/mo',
      model: 'Word-based tiers',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: '10K-1M words',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: true,
      currencyConverter: false,
    },
    ai: {
      type: 'added',
      engines: ['Machine translation'],
    },
    strengths: ['Easy setup', 'Good for small sites', 'Visual editor'],
    weaknesses: ['Word limits increase costs', 'No auto-sync', 'No metaobject support'],
    ourAngle: 'No word limits - translate everything without surprise costs',
    targetAudience: 'Small sites with limited content',
    isAINative: false,
  },
  {
    id: 'transcy',
    name: 'Transcy',
    slug: 'transcy',
    tagline: 'Free tier with premium features locked',
    appStoreUrl: 'https://apps.shopify.com/transcy',
    rating: 4.6,
    reviews: 5000,
    pricing: {
      base: 'Free',
      trueCost: '$40-60/mo',
      model: 'Freemium with limits',
    },
    features: {
      autoSync: 'partial',
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: true,
    },
    ai: {
      type: 'native',
      engines: ['AI translation'],
    },
    strengths: ['Free tier available', 'Large user base', 'Currency converter included'],
    weaknesses: ['Partial sync only', 'No metaobject support', 'Premium features locked'],
    ourAngle: 'Full metaobject support and complete auto-sync',
    targetAudience: 'Stores wanting free option with upgrade path',
    isAINative: true,
  },
  {
    id: 'translate-adapt',
    name: 'Translate & Adapt',
    slug: 'translate-adapt',
    tagline: "Shopify's native translation app",
    appStoreUrl: 'https://apps.shopify.com/translate-and-adapt',
    rating: 4.0,
    reviews: 500,
    pricing: {
      base: 'Free',
      trueCost: 'Free',
      model: 'Free (Shopify native)',
    },
    features: {
      autoSync: false,
      aiTranslation: false,
      wordLimit: 'N/A',
      metaobjects: false,
      metafields: false,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'none',
      engines: [],
    },
    strengths: ['Free', 'Shopify native', 'Basic functionality'],
    weaknesses: ['No AI translation', 'Manual only', 'Limited features'],
    ourAngle: 'AI-powered vs manual entry',
    targetAudience: 'Stores with minimal translation needs',
    isAINative: false,
  },
];

// Extended competitors (for individual comparison pages)
export const extendedCompetitors: Competitor[] = [
  {
    id: 't-lab',
    name: 'T Lab (Translation Lab)',
    slug: 't-lab',
    tagline: 'Multi-LLM translation with merchant control',
    appStoreUrl: 'https://apps.shopify.com/content-translation',
    rating: 4.9,
    reviews: 898,
    pricing: {
      base: 'Free tier',
      trueCost: 'Premium plans',
      model: 'Freemium',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: true,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'native',
      engines: ['DeepL', 'Google', 'ChatGPT'],
    },
    strengths: ['Multi-LLM choice', 'Merchant controls AI engine', '130+ languages'],
    weaknesses: ['Complexity of choice', 'No auto-sync', 'No metaobject support'],
    ourAngle: 'One AI that works, automatic sync - no complexity',
    targetAudience: 'Tech-savvy merchants wanting AI control',
    isAINative: true,
  },
  {
    id: 'hextom',
    name: 'Hextom AI Translate',
    slug: 'hextom',
    tagline: 'Multi-AI translation with currency converter',
    appStoreUrl: 'https://apps.shopify.com/translate-my-store',
    rating: 4.8,
    reviews: 1231,
    pricing: {
      base: 'Free tier',
      trueCost: '$7.99+/mo',
      model: 'Tiered plans',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: true,
    },
    ai: {
      type: 'native',
      engines: ['ChatGPT', 'Claude', 'Grok', 'Deepseek', 'Gemini'],
    },
    strengths: ['Multi-AI engines', 'Currency included', '130+ languages', 'Large user base'],
    weaknesses: ['No metaobject support', 'Currency bundled (not needed by all)', 'No auto-sync'],
    ourAngle: 'Full metaobject support, translation-focused',
    targetAudience: 'Stores wanting translation + currency in one',
    isAINative: true,
  },
  {
    id: 'ciwi',
    name: 'Ciwi.ai',
    slug: 'ciwi',
    tagline: 'Budget AI translation with GPT-4',
    appStoreUrl: 'https://apps.shopify.com/translator-by-ciwi',
    rating: 4.9,
    reviews: 50,
    pricing: {
      base: 'Free tier',
      trueCost: '$7.99-$39.99/mo',
      model: 'Aggressive pricing',
    },
    features: {
      autoSync: true,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: true,
      termBlacklist: false,
      currencyConverter: true,
    },
    ai: {
      type: 'native',
      engines: ['GPT-4', 'DeepSeek'],
    },
    strengths: ['Low pricing', 'GPT-4 included', 'Custom prompts', 'Real-time sync'],
    weaknesses: ['New app, unproven at scale', 'No metaobject support', 'Limited track record'],
    ourAngle: 'Established reliability with full metaobject support',
    targetAudience: 'Budget-conscious stores',
    isAINative: true,
  },
  {
    id: 'locales-ai',
    name: 'Locales.ai',
    slug: 'locales-ai',
    tagline: 'Enterprise AI translation',
    appStoreUrl: 'https://apps.shopify.com/locales-ai',
    rating: null,
    reviews: 25,
    pricing: {
      base: 'Custom',
      trueCost: 'Custom pricing',
      model: 'Enterprise/flexible',
    },
    features: {
      autoSync: true,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: true,
      termBlacklist: true,
      currencyConverter: true,
    },
    ai: {
      type: 'native',
      engines: ['GPT-4', 'Proprietary'],
    },
    strengths: ['Enterprise-grade', 'Ex-Microsoft/Google team', 'Page builder support'],
    weaknesses: ['Unclear pricing', 'Enterprise complexity', 'No metaobject support'],
    ourAngle: 'Transparent $150/month, no surprises',
    targetAudience: 'Enterprise Shopify Plus stores',
    isAINative: true,
  },
  {
    id: 'langwill',
    name: 'Langwill',
    slug: 'langwill',
    tagline: 'AI translation with mixed quality reviews',
    appStoreUrl: 'https://apps.shopify.com/localiser',
    rating: 4.6,
    reviews: 610,
    pricing: {
      base: 'Free tier',
      trueCost: 'Premium plans',
      model: 'Freemium',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'native',
      engines: ['Context-aware AI'],
    },
    strengths: ['Built for Shopify certified', '200+ languages', '24/7 support'],
    weaknesses: ['Mixed translation quality reviews', 'AI only on top tier', 'No metaobject support'],
    ourAngle: 'Consistent quality, AI you can trust',
    targetAudience: 'Stores wanting certified Shopify app',
    isAINative: true,
  },
  {
    id: 'transtore',
    name: 'Transtore',
    slug: 'transtore',
    tagline: 'RTL-focused translation with geo-redirect',
    appStoreUrl: 'https://apps.shopify.com/transtore-language-and-currency',
    rating: 4.8,
    reviews: 731,
    pricing: {
      base: 'Free tier',
      trueCost: '$14.99/mo',
      model: 'Simple pricing',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: true,
    },
    ai: {
      type: 'native',
      engines: ['GPT-powered'],
    },
    strengths: ['RTL language support', 'Geo-redirect', 'SEO-friendly URLs', 'Simple pricing'],
    weaknesses: ['RTL focus limits appeal', 'Sudden pricing changes reported', 'No auto-sync'],
    ourAngle: 'All markets equally, stable pricing',
    targetAudience: 'Stores targeting Middle East/RTL markets',
    isAINative: true,
  },
  {
    id: 'vt-labs',
    name: 'VT Labs',
    slug: 'vt-labs',
    tagline: 'Metafields-only translation specialist',
    appStoreUrl: 'https://apps.shopify.com/metafields-translator',
    rating: 4.7,
    reviews: 3,
    pricing: {
      base: 'Free tier',
      trueCost: 'Premium plans',
      model: 'Freemium',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: true,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'native',
      engines: ['ChatGPT', 'DeepL'],
    },
    strengths: ['Metafields specialist', 'Third-party app content', 'Auto metafield detection'],
    weaknesses: ['Metafields only - not full store', 'Very new (3 reviews)', 'Limited scope'],
    ourAngle: 'Full store translation, not just metafields',
    targetAudience: 'Stores with heavy metafield usage',
    isAINative: true,
  },
  {
    id: 'liquid-translator',
    name: 'Liquid Translator',
    slug: 'liquid-translator',
    tagline: 'Code-safe theme translation for developers',
    appStoreUrl: 'https://apps.shopify.com/liquid-translator',
    rating: null,
    reviews: 10,
    pricing: {
      base: 'Premium',
      trueCost: 'Premium pricing',
      model: 'Premium only',
    },
    features: {
      autoSync: false,
      aiTranslation: true,
      wordLimit: 'Unlimited',
      metaobjects: false,
      metafields: false,
      customPrompts: false,
      termBlacklist: false,
      currencyConverter: false,
    },
    ai: {
      type: 'added',
      engines: ['AI with code protection'],
    },
    strengths: ['Protects Liquid variables', 'Prevents code breakage', 'Theme specialists'],
    weaknesses: ['Developer-focused', 'Not merchant-friendly', 'Limited to theme translation'],
    ourAngle: 'No-code setup, merchant-first design',
    targetAudience: 'Developers and theme builders',
    isAINative: false,
  },
];

// All competitors combined
export const allCompetitors = [...mainCompetitors, ...extendedCompetitors];

// Feature labels for display
export const featureLabels: Record<keyof Competitor['features'], string> = {
  autoSync: 'Auto-Sync',
  aiTranslation: 'AI Translation',
  wordLimit: 'Word Limit',
  metaobjects: 'Metaobjects',
  metafields: 'Metafields',
  customPrompts: 'Custom Prompts',
  termBlacklist: 'Term Blacklist',
  currencyConverter: 'Currency Converter',
};

// Get competitor by slug
export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return allCompetitors.find((c) => c.slug === slug);
}

// Get all slugs for static paths
export function getAllCompetitorSlugs(): string[] {
  return extendedCompetitors.map((c) => c.slug);
}
