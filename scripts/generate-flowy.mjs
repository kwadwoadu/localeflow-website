#!/usr/bin/env node
/**
 * Generate Flowy Mascot Images using Gemini 2.5 Flash Image (Nano Banana)
 *
 * Creates consistent Flowy character images based on the brand spec.
 *
 * Usage:
 *   GEMINI_API_KEY=your_key node scripts/generate-flowy.mjs
 */

import { GoogleGenAI } from '@google/genai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is not set')
  console.error('Usage: GEMINI_API_KEY=your_key node scripts/generate-flowy.mjs')
  process.exit(1)
}

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

// Model - Gemini 2.5 Flash Image (Nano Banana)
const IMAGE_MODEL = 'gemini-2.5-flash-image'

// Output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'flowy')

// Master prompt template from api-config.md
const MASTER_PROMPT = `Create a flat illustration of Flowy, LocaleFlow's mascot character.

CHARACTER SPECIFICATION:
- Shape: Rounded speech bubble with small triangular tail at bottom-left
- Body color: Warm coral gradient (#fb923c to #f97316)
- Eyes: Large expressive ovals in navy blue (#1e3a5a)
- Cheeks: Subtle pink blush circles (#fecaca)
- Smile: Simple curved line in navy (#1e3a5a)
- Arms: Thin rounded limbs in coral (#ea580c) with mitten-style hands

STYLE REQUIREMENTS:
- Flat illustration style with subtle gradients
- Modern SaaS aesthetic
- Rounded, friendly shapes
- Soft shadows, no harsh edges
- Clean and professional
- Square 1:1 composition centered on character

CRITICAL: Generate image with ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LABELS, NO NUMBERS, NO WRITING of any kind anywhere in the image. Pure illustration only.`

// Flowy poses to generate (with white backgrounds for easy removal)
const FLOWY_POSES = [
  {
    filename: 'flowy-waving.png',
    name: 'Waving',
    pose: `Pose: Flowy facing forward with one arm raised in a friendly wave, open palm.
Body slightly tilted. Cheerful expression with open smile.
Background: Pure solid white (#FFFFFF), completely uniform, no gradients, no patterns, no shadows on background.`
  },
  {
    filename: 'flowy-celebrating.png',
    name: 'Celebrating',
    pose: `Pose: Flowy with both arms raised triumphantly above head.
Eyes closed in happy squint. Wide open smile.
Confetti and sparkles around character.
Background: Pure solid white (#FFFFFF), completely uniform, no gradients, no patterns, no shadows on background.`
  },
  {
    filename: 'flowy-thinking.png',
    name: 'Thinking',
    pose: `Pose: Flowy with one hand raised to chin area in thinking pose.
Eyes looking upward and to the side.
Slight head tilt. Thoughtful expression.
Background: Pure solid white (#FFFFFF), completely uniform, no gradients, no patterns, no shadows on background.`
  },
  {
    filename: 'flowy-thumbsup.png',
    name: 'Thumbs Up',
    pose: `Pose: Flowy with one arm extended with clear thumbs up gesture.
Confident, approving smile. Eyes bright and engaged.
Background: Pure solid white (#FFFFFF), completely uniform, no gradients, no patterns, no shadows on background.`
  },
  {
    filename: 'flowy-translating.png',
    name: 'Translating',
    pose: `Pose: Flowy with arms extended to sides, palms up.
Floating language code bubbles (EN, ES, FR) on each side with flowing arrows between them.
Focused but happy expression.
Include subtle translation arrows connecting the bubbles.
Background: Pure solid white (#FFFFFF), completely uniform, no gradients, no patterns, no shadows on background.`
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
        responseModalities: ['IMAGE', 'TEXT']
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
  console.log('Flowy Mascot Image Generator')
  console.log('Using Gemini 2.5 Flash Image (Nano Banana)')
  console.log('='.repeat(60))
  console.log('')

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    console.log(`Created output directory: ${OUTPUT_DIR}`)
  }

  console.log('')
  const results = []

  for (let i = 0; i < FLOWY_POSES.length; i++) {
    const config = FLOWY_POSES[i]
    const fullPrompt = `${MASTER_PROMPT}\n\n${config.pose}`

    console.log(`\n[${i + 1}/${FLOWY_POSES.length}] Generating: ${config.name}`)
    console.log(`  File: ${config.filename}`)

    try {
      const imageBytes = await generateImage(fullPrompt)
      const filepath = saveImage(imageBytes, config.filename)
      results.push({ filename: config.filename, name: config.name, status: 'success', filepath })
      console.log(`  Status: SUCCESS`)
    } catch (error) {
      console.log(`  Status: FAILED - ${error.message}`)
      results.push({ filename: config.filename, name: config.name, status: 'failed', error: error.message })
    }

    // Rate limiting delay between requests
    if (i < FLOWY_POSES.length - 1) {
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
    successful.forEach(r => console.log(`  - ${r.name}: ${r.filepath}`))
  }

  if (failed.length > 0) {
    console.log('\nFailed images:')
    failed.forEach(r => console.log(`  - ${r.name}: ${r.error}`))
  }

  console.log('\n' + '='.repeat(60))
  console.log('Quality Checklist:')
  console.log('  [ ] Body is coral (#f97316 base)')
  console.log('  [ ] Eyes are navy (#1e3a5a)')
  console.log('  [ ] Speech bubble shape with tail')
  console.log('  [ ] Flat style (no 3D)')
  console.log('  [ ] NO TEXT in images')
  console.log('='.repeat(60))
}

main().catch(console.error)
