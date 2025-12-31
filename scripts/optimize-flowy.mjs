#!/usr/bin/env node
/**
 * Optimize Flowy mascot images for web
 *
 * - Resize to 512x512
 * - Convert to WebP with quality 85
 * - Keep original PNGs as backup
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FLOWY_DIR = path.join(__dirname, '..', 'public', 'flowy')

async function optimizeImages() {
  console.log('Optimizing Flowy images...\n')

  const files = fs.readdirSync(FLOWY_DIR).filter(f => f.endsWith('.png'))

  for (const file of files) {
    const inputPath = path.join(FLOWY_DIR, file)
    const webpFile = file.replace('.png', '.webp')
    const webpPath = path.join(FLOWY_DIR, webpFile)

    const originalSize = fs.statSync(inputPath).size

    // Create optimized WebP
    await sharp(inputPath)
      .resize(512, 512)
      .webp({ quality: 85 })
      .toFile(webpPath)

    const webpSize = fs.statSync(webpPath).size
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1)

    console.log(`${file}`)
    console.log(`  Original: ${(originalSize / 1024).toFixed(0)}KB`)
    console.log(`  WebP: ${(webpSize / 1024).toFixed(0)}KB (${savings}% smaller)\n`)
  }

  console.log('Done! WebP versions created alongside originals.')
}

optimizeImages().catch(console.error)
