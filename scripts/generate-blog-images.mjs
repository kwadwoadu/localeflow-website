#!/usr/bin/env node
/**
 * Generate LocaleFlow Blog Post Images using Gemini 2.5 Flash
 *
 * Creates abstract conceptual hero images for blog posts
 * using translation/localization visual metaphors.
 *
 * Usage: node scripts/generate-blog-images.mjs
 */

import { GoogleGenAI } from '@google/genai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// API Configuration
const GEMINI_API_KEY = 'AIzaSyCqoGNcD_UjhyWN9fruQOw9Ro-aD6rPO-M'
const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

// Models to try for image generation
const IMAGE_MODELS = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp'
]

// Paths
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'blog', 'images')

// Brand colors from LocaleFlow
const BRAND_COLORS = {
  primary: '#0EA5E9', // Sky blue
  primaryDark: '#0284C7',
  accent: '#8B5CF6', // Purple
  background: '#F8FAFC', // Light slate
  surface: '#FFFFFF'
}

// Base style for all images
const BASE_STYLE = `
Create a modern, minimalist illustration in flat design style.
Use these exact colors:
- Primary accent: ${BRAND_COLORS.primary} (sky blue)
- Secondary accent: ${BRAND_COLORS.accent} (purple)
- Background: soft gradient from white to light blue (#E0F2FE to #F8FAFC)

Style requirements:
- Clean flat illustration, no 3D effects
- Modern SaaS aesthetic
- Soft shadows, rounded shapes
- Professional and clean
- Wide horizontal 16:9 composition
- Leave breathing room on edges

CRITICAL: Generate image with ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LABELS, NO NUMBERS, NO WRITING of any kind anywhere in the image. Pure illustration only.
`

// Blog image configurations
const BLOG_IMAGES = [
  // Comparison posts (4)
  {
    filename: 'localeflow-vs-langify.png',
    title: 'LocaleFlow vs Langify',
    prompt: `${BASE_STYLE}

Scene: Two stylized app interface cards side by side with a "VS" symbol between them.
Left card shows a modern, streamlined interface with flow lines connecting elements (representing LocaleFlow's sync feature).
Right card shows a more traditional grid-based interface.
Above both cards, floating translation bubbles with different language icons (globe, flags as abstract shapes).
Include subtle checkmarks on the left side suggesting advantages.
Color the left card with ${BRAND_COLORS.primary}, right card in neutral gray.`
  },
  {
    filename: 'localeflow-vs-weglot.png',
    title: 'LocaleFlow vs Weglot',
    prompt: `${BASE_STYLE}

Scene: Split composition showing two different approaches to translation.
Left side: Clean Shopify store mockup with automatic sync arrows flowing between product cards (LocaleFlow).
Right side: More complex setup with external widget overlay.
Center: Large comparison icon or balance scale metaphor.
Include floating language bubbles (abstract globe segments, translation arrows).
Emphasize the simplicity on the left vs complexity on the right.`
  },
  {
    filename: 'localeflow-vs-translate-and-adapt.png',
    title: 'LocaleFlow vs Translate & Adapt',
    prompt: `${BASE_STYLE}

Scene: Shopify-themed comparison showing automation vs manual.
Left: Flowing automatic process with gears and sync symbols working autonomously.
Right: Manual/hands-on approach with more steps shown.
Include Shopify bag icon subtly in the composition.
Show multiple language flags as abstract geometric shapes.
Central focus on the automation difference.`
  },
  {
    filename: 'localeflow-vs-transcy.png',
    title: 'LocaleFlow vs Transcy',
    prompt: `${BASE_STYLE}

Scene: Feature comparison visualization with floating feature cards.
Two app interfaces showing different feature sets.
Left side shows more connected/flowing features (sync emphasis).
Include currency symbols, language icons, and store elements.
Subtle award/star icons near LocaleFlow representation.
Professional competitive comparison aesthetic.`
  },
  // Guide posts (5)
  {
    filename: 'shopify-markets-translation-guide.png',
    title: 'Shopify Markets Setup Guide',
    prompt: `${BASE_STYLE}

Scene: World map with glowing market regions connected by flowing lines.
Central Shopify store icon with expansion arrows going to different regions.
Multiple storefront icons around a globe showing international reach.
Include subtle currency and language symbols floating around.
Emphasis on global expansion and market setup.`
  },
  {
    filename: 'shopify-translation-mistakes.png',
    title: 'Translation Mistakes to Avoid',
    prompt: `${BASE_STYLE}

Scene: Warning/caution themed illustration with corrective elements.
Show wrong way (red X) and right way (green checkmark) approaches.
Include broken translation bubble being repaired or fixed.
Document with error marks being corrected.
Educational, helpful tone - not scary, but informative.
Include subtle gear/tools imagery suggesting fixes.`
  },
  {
    filename: 'multilanguage-seo-guide.png',
    title: 'Multi-Language SEO Guide',
    prompt: `${BASE_STYLE}

Scene: Search and language optimization visualization.
Central search bar or magnifying glass with multiple language bubbles.
Upward trending graph/chart showing SEO growth.
Globe with connected search nodes in different regions.
Include abstract hreflang tag representations (connected link symbols).
Professional SEO/marketing aesthetic.`
  },
  {
    filename: 'translate-metafields-guide.png',
    title: 'Metafields Translation Guide',
    prompt: `${BASE_STYLE}

Scene: Technical but accessible data visualization.
Product card with extending data fields/metafields being translated.
Show structured data transforming between languages.
Include database/field icons with translation arrows.
Multiple product attributes floating and connecting.
Developer-friendly but approachable aesthetic.`
  },
  {
    filename: 'why-agencies-choose-localeflow.png',
    title: 'Why Agencies Choose LocaleFlow',
    prompt: `${BASE_STYLE}

Scene: Agency/team collaboration visualization.
Multiple client storefronts being managed from central dashboard.
Show efficiency with connected client icons and streamlined workflow.
Include revenue/growth symbols and partner handshake imagery.
Professional B2B aesthetic with premium feel.
Emphasis on scale and partnership.`
  }
]

/**
 * Generate image using Gemini
 */
async function generateImage(prompt, modelIndex = 0) {
  if (modelIndex >= IMAGE_MODELS.length) {
    throw new Error('All image generation models failed')
  }

  const model = IMAGE_MODELS[modelIndex]
  console.log(`  Trying model: ${model}`)

  try {
    const response = await client.models.generateContent({
      model: model,
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
        imageConfig: {
          aspectRatio: '16:9'
        }
      }
    })

    // Extract image data from response
    const candidate = response.candidates?.[0]
    if (!candidate) {
      throw new Error('No candidate in response')
    }

    // Log what types of parts we got
    if (candidate.content?.parts) {
      candidate.content.parts.forEach((part, idx) => {
        const keys = Object.keys(part)
        console.log(`  Part ${idx}: ${keys.join(', ')}`)
      })
    }

    const imagePart = candidate.content?.parts?.find(part => part.inlineData)
    if (!imagePart?.inlineData?.data) {
      throw new Error('No image data in response - model returned text only')
    }

    return imagePart.inlineData.data
  } catch (error) {
    const msg = error.message || String(error)
    console.log(`  Model ${model} failed: ${msg}`)

    // Try next model
    if (modelIndex < IMAGE_MODELS.length - 1) {
      console.log(`  Trying fallback model...`)
      return generateImage(prompt, modelIndex + 1)
    }

    throw error
  }
}

/**
 * Save image to file
 */
function saveImage(imageBytes, filename) {
  const filepath = path.join(OUTPUT_DIR, filename)
  fs.writeFileSync(filepath, Buffer.from(imageBytes, 'base64'))
  console.log(`  Saved: ${filepath}`)
  return filepath
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60))
  console.log('LocaleFlow Blog Image Generator')
  console.log('Using Gemini 2.5 Flash')
  console.log('='.repeat(60))
  console.log('')

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    console.log(`Created output directory: ${OUTPUT_DIR}`)
  }

  console.log('')
  const results = []

  for (let i = 0; i < BLOG_IMAGES.length; i++) {
    const config = BLOG_IMAGES[i]
    console.log(`\n[${i + 1}/${BLOG_IMAGES.length}] Generating: ${config.filename}`)
    console.log(`  Title: ${config.title}`)

    try {
      const imageBytes = await generateImage(config.prompt)
      const filepath = saveImage(imageBytes, config.filename)
      results.push({ filename: config.filename, status: 'success', filepath })
      console.log(`  Status: SUCCESS`)
    } catch (error) {
      console.log(`  Status: FAILED - ${error.message}`)
      results.push({ filename: config.filename, status: 'failed', error: error.message })
    }

    // Rate limiting delay between requests
    if (i < BLOG_IMAGES.length - 1) {
      console.log('  Waiting 3s before next request...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('GENERATION SUMMARY')
  console.log('='.repeat(60))

  const successful = results.filter(r => r.status === 'success')
  const failed = results.filter(r => r.status === 'failed')

  console.log(`\nTotal: ${results.length}`)
  console.log(`Successful: ${successful.length}`)
  console.log(`Failed: ${failed.length}`)

  if (successful.length > 0) {
    console.log('\nGenerated images:')
    successful.forEach(r => console.log(`  - ${r.filepath}`))
  }

  if (failed.length > 0) {
    console.log('\nFailed images:')
    failed.forEach(r => console.log(`  - ${r.filename}: ${r.error}`))
  }

  console.log('\n' + '='.repeat(60))
  console.log('Quality Checklist (verify manually):')
  console.log('  [ ] No text in images')
  console.log('  [ ] Brand colors used (sky blue #0EA5E9, purple #8B5CF6)')
  console.log('  [ ] Clean flat design style')
  console.log('  [ ] 16:9 aspect ratio')
  console.log('  [ ] Professional SaaS aesthetic')
  console.log('='.repeat(60))
}

main().catch(console.error)
