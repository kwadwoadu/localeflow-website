#!/usr/bin/env node
/**
 * Generate Flowy Blog Header Images using Gemini 2.5 Flash Image
 *
 * Creates 9 unique Flowy mascot images for blog post headers.
 * Each image features Flowy in a scene themed to the blog topic.
 *
 * Usage: GEMINI_API_KEY=your_key node scripts/generate-blog-images.mjs
 */

import { GoogleGenAI } from '@google/genai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// API Configuration - Load from environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is not set')
  console.error('Set it with: export GEMINI_API_KEY=your_key_here')
  process.exit(1)
}
const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

// Model - Gemini 2.5 Flash Image (Nano Banana)
const IMAGE_MODEL = 'gemini-2.5-flash-image'

// Paths - Updated to correct location
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'blog')

// Master prompt template for Flowy character (from character-spec.md)
const FLOWY_BASE = `Create a flat illustration of Flowy, LocaleFlow's mascot character, in a 16:9 wide composition suitable for a blog header.

CHARACTER SPECIFICATION (CRITICAL - follow exactly):
- Shape: Rounded speech bubble with small triangular tail at bottom-left
- Body color: Warm coral gradient (#fb923c to #f97316 orange)
- Eyes: Large expressive ovals in navy blue (#1e3a5a)
- Cheeks: Subtle pink blush circles (#fecaca)
- Smile: Simple curved line in navy (#1e3a5a)
- Arms: Thin rounded limbs in coral (#ea580c) with mitten-style hands
- The character looks like a friendly orange speech bubble with a face and arms

STYLE REQUIREMENTS:
- Flat illustration style with subtle gradients
- Modern SaaS aesthetic
- Rounded, friendly shapes
- Soft shadows, no harsh edges
- Clean and professional
- Wide 16:9 composition with Flowy positioned slightly off-center
- Ample negative space for readability

CRITICAL: Generate image with ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LABELS, NO NUMBERS, NO WRITING of any kind anywhere in the image. Pure illustration only.`

// Blog image configurations with Flowy-themed scenes
const BLOG_IMAGES = [
  // Comparison posts (4)
  {
    filename: 'localeflow-vs-translate-and-adapt.png',
    title: 'LocaleFlow vs Translate & Adapt',
    prompt: `${FLOWY_BASE}

Scene: Flowy standing proudly holding a gold medal or trophy, radiating confidence.
One arm holds the trophy high, the other gives a subtle thumbs up.
Flowy has a winning, confident smile with eyes squinting happily.
Small sparkles around the trophy.
Background: Soft gradient from cream (#FEF3C7) to light green (#D1FAE5).
Position Flowy slightly left of center with trophy visible on right.`
  },
  {
    filename: 'localeflow-vs-langify.png',
    title: 'LocaleFlow vs Langify',
    prompt: `${FLOWY_BASE}

Scene: Flowy in an energetic, confident pose with one arm flexed showing strength.
The character looks determined and powerful but friendly.
Small energy burst or star effects around Flowy to show vitality.
Energetic, competitive but friendly expression.
Background: Gradient from light blue (#DBEAFE) to cream (#FEF3C7).
Position Flowy right of center with energy effects on the left side.`
  },
  {
    filename: 'localeflow-vs-transcy.png',
    title: 'LocaleFlow vs Transcy',
    prompt: `${FLOWY_BASE}

Scene: Flowy standing next to a large stylized checklist or clipboard.
Several green checkmark icons floating nearby, suggesting completed tasks.
Flowy has a satisfied, accomplished expression with a confident smile.
One hand gestures toward the checkmarks proudly.
Background: Light green gradient (#D1FAE5).
Position Flowy on the left with checklist elements on the right side.`
  },
  {
    filename: 'localeflow-vs-weglot.png',
    title: 'LocaleFlow vs Weglot',
    prompt: `${FLOWY_BASE}

Scene: Flowy standing victoriously on a stylized podium or pedestal.
Both arms raised high in celebration, confetti and sparkles all around.
Triumphant expression with eyes closed in joy, big happy smile.
Background: Gradient from light purple (#EDE9FE) to cream (#FEF3C7).
Center Flowy on the podium, celebration elements above and around.`
  },
  // Guide posts (5)
  {
    filename: 'shopify-markets-translation-guide.png',
    title: 'Shopify Markets Setup Guide',
    prompt: `${FLOWY_BASE}

Scene: Flowy standing with a stylized globe floating nearby.
Small abstract flag shapes from various countries floating around.
Arms slightly spread in a welcoming, expansive gesture.
Worldly, knowledgeable expression with a friendly smile.
Background: Gradient from light blue (#DBEAFE) to light purple (#EDE9FE).
Position Flowy center-left with globe and flags on the right side.`
  },
  {
    filename: 'multilanguage-seo-guide.png',
    title: 'Multi-Language SEO Guide',
    prompt: `${FLOWY_BASE}

Scene: Flowy looking through or holding a large magnifying glass.
Small upward arrows and chart elements suggesting growth nearby.
Curious, investigative expression, eyes focused and interested.
Background: Light blue gradient (#DBEAFE).
Position Flowy right of center, magnifying glass prominent on left side.`
  },
  {
    filename: 'shopify-translation-mistakes.png',
    title: 'Translation Mistakes to Avoid',
    prompt: `${FLOWY_BASE}

Scene: Flowy in a thinking pose, one hand raised to chin.
A small stylized warning triangle or caution icon floating nearby (friendly, not scary).
Eyes looking upward thoughtfully, slight concern but helpful expression.
Background: Gradient from cream (#FEF3C7) to soft pink (#FEE2E2).
Position Flowy in center with warning element to the side.`
  },
  {
    filename: 'translate-metafields-guide.png',
    title: 'Metafields Translation Guide',
    prompt: `${FLOWY_BASE}

Scene: Flowy in a working pose, arms engaged as if conducting or organizing.
Small gear icons and data flow lines floating around the character.
Focused, productive expression with determined smile.
Technical elements arranged neatly around Flowy.
Background: Light blue gradient (#DBEAFE) to cream (#FEF3C7).
Position Flowy slightly left with technical elements on right.`
  },
  {
    filename: 'why-agencies-choose-localeflow.png',
    title: 'Why Agencies Choose LocaleFlow',
    prompt: `${FLOWY_BASE}

Scene: Flowy celebrating enthusiastically with both arms raised high.
Confetti and sparkles all around the character.
Small business icons nearby (briefcase shape, handshake symbol, growth arrow).
Enthusiastic, welcoming expression with big joyful smile.
Background: Gradient from light green (#D1FAE5) to cream (#FEF3C7).
Center Flowy with celebration and business elements distributed around.`
  }
]

/**
 * Generate image using Gemini 2.5 Flash Image (Nano Banana)
 */
async function generateImage(prompt) {
  console.log(`  Using model: ${IMAGE_MODEL}`)

  try {
    const response = await client.models.generateContent({
      model: IMAGE_MODEL,
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
  console.log('Flowy Blog Image Generator')
  console.log('9 unique Flowy mascot images (16:9 aspect ratio)')
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
  console.log('  [ ] Flowy body is coral (#f97316 base)')
  console.log('  [ ] Eyes are navy (#1e3a5a)')
  console.log('  [ ] Speech bubble shape with tail')
  console.log('  [ ] Flat style (no 3D)')
  console.log('  [ ] NO TEXT in images')
  console.log('  [ ] 16:9 aspect ratio')
  console.log('='.repeat(60))

  console.log('\nNext steps:')
  console.log('1. Review generated images for quality')
  console.log('2. Convert to WebP: for f in public/images/blog/*.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done')
  console.log('3. Deploy: npm run build && wrangler pages deploy dist --project-name=localeflow')
}

main().catch(console.error)
