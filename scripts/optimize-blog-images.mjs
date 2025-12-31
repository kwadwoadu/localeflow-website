#!/usr/bin/env node
/**
 * Optimize blog post images for web
 *
 * - Keep at original size (16:9 for hero images)
 * - Convert to WebP with quality 85
 * - Keep original PNGs as backup
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BLOG_IMAGES_DIR = path.join(__dirname, '..', 'public', 'blog', 'images')

async function optimizeImages() {
  console.log('Optimizing blog images...\n')

  const files = fs.readdirSync(BLOG_IMAGES_DIR).filter(f => f.endsWith('.png'))

  let totalOriginal = 0
  let totalOptimized = 0

  for (const file of files) {
    const inputPath = path.join(BLOG_IMAGES_DIR, file)
    const webpFile = file.replace('.png', '.webp')
    const webpPath = path.join(BLOG_IMAGES_DIR, webpFile)

    const originalSize = fs.statSync(inputPath).size
    totalOriginal += originalSize

    // Create optimized WebP (keep original dimensions for hero images)
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath)

    const webpSize = fs.statSync(webpPath).size
    totalOptimized += webpSize
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1)

    console.log(`${file}`)
    console.log(`  Original: ${(originalSize / 1024).toFixed(0)}KB`)
    console.log(`  WebP: ${(webpSize / 1024).toFixed(0)}KB (${savings}% smaller)\n`)
  }

  console.log('='.repeat(50))
  console.log(`Total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB -> ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`)
  console.log('='.repeat(50))
  console.log('\nDone! WebP versions created alongside originals.')
}

optimizeImages().catch(console.error)
