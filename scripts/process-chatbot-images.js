const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/ri4y/.gemini/antigravity-ide/brain/ca4b8993-af22-4b88-9c1c-dadd9d424335/.user_uploaded/';
const outputDir = 'c:/Users/ri4y/Desktop/Practice/portfolio/public/projects/';

async function blurRegions(imagePath, regions) {
  let img = sharp(imagePath);
  const composites = [];

  for (const r of regions) {
    const patch = await sharp(imagePath)
      .extract({ left: r.left, top: r.top, width: r.width, height: r.height })
      .blur(r.blur || 12)
      .toBuffer();

    composites.push({
      input: patch,
      left: r.left,
      top: r.top,
    });
  }

  return img.composite(composites);
}

async function run() {
  console.log('Processing Screenshot 1...');
  // Screen 1: Dashboard
  // Blur: login in top right, 3 project titles ("Тест", "Хай-тек", "Хай-тек медиа")
  const s1 = await blurRegions(path.join(uploadDir, 'media_1791065604157.png'), [
    { left: 810, top: 5, width: 85, height: 28, blur: 10 },
    { left: 168, top: 104, width: 55, height: 22, blur: 8 },
    { left: 418, top: 104, width: 72, height: 22, blur: 8 },
    { left: 668, top: 104, width: 98, height: 22, blur: 8 },
  ]);
  await s1.webp({ quality: 92 }).toFile(path.join(outputDir, 'ai-chatbot-widget-1.webp'));

  console.log('Processing Screenshot 2...');
  // Screen 2: Analytics
  const s2 = await blurRegions(path.join(uploadDir, 'media_1791065604163.png'), [
    { left: 810, top: 5, width: 85, height: 28, blur: 10 },
    { left: 218, top: 7, width: 50, height: 22, blur: 8 },
  ]);
  await s2.webp({ quality: 92 }).toFile(path.join(outputDir, 'ai-chatbot-widget-2.webp'));

  console.log('Processing Screenshot 3...');
  // Screen 3: Memory & Vector fragments
  const s3 = await blurRegions(path.join(uploadDir, 'media_1791065604167.png'), [
    { left: 810, top: 5, width: 85, height: 28, blur: 10 },
    { left: 218, top: 7, width: 50, height: 22, blur: 8 },
  ]);
  await s3.webp({ quality: 92 }).toFile(path.join(outputDir, 'ai-chatbot-widget-3.webp'));

  console.log('Processing Screenshot 4...');
  // Screen 4: Knowledge base
  const s4 = await blurRegions(path.join(uploadDir, 'media_1791065604171.png'), [
    { left: 810, top: 5, width: 85, height: 28, blur: 10 },
    { left: 218, top: 7, width: 50, height: 22, blur: 8 },
  ]);
  await s4.webp({ quality: 92 }).toFile(path.join(outputDir, 'ai-chatbot-widget-4.webp'));

  console.log('Processing Screenshot 5 (Widget on site with full background blur)...');
  // Screen 5: Background blur + Crisp Widget + blurred title inside widget
  const img5Path = path.join(uploadDir, 'media_1791065604190.png');
  const meta5 = await sharp(img5Path).metadata();

  // 1. Entire background blurred heavily
  const bgBlurred = await sharp(img5Path).blur(22).toBuffer();

  // 2. Extract widget crisp (left: 825, top: 177, width: 199, height: 335)
  const widgetW = 198;
  const widgetH = 335;
  const widgetX = 826;
  const widgetY = 177;

  // Mask widget with rounded top-left corner
  const maskSvg = Buffer.from(`
    <svg width="${widgetW}" height="${widgetH}">
      <rect x="0" y="0" width="${widgetW}" height="${widgetH}" rx="16" ry="16" fill="#fff" />
    </svg>
  `);

  const crispWidget = await sharp(img5Path)
    .extract({ left: widgetX, top: widgetY, width: widgetW, height: widgetH })
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .toBuffer();

  // 3. Composite crisp widget onto blurred background
  const compWithWidget = await sharp(bgBlurred)
    .composite([{ input: crispWidget, left: widgetX, top: widgetY }])
    .toBuffer();

  // 4. Blur the title "Хай-тек медиа" and both avatars (header & message bubble) inside widget
  const finalScreen5 = await blurRegions(compWithWidget, [
    { left: 835, top: 182, width: 95, height: 26, blur: 8 },
    { left: 835, top: 230, width: 23, height: 23, blur: 7 },
  ]);

  await finalScreen5.webp({ quality: 92 }).toFile(path.join(outputDir, 'ai-chatbot-widget-5.webp'));

  console.log('All 5 screenshots processed and saved to public/projects/ !');
}

run().catch(console.error);
