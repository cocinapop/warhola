import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG design with luxury Warhola Gin aesthetic:
// Deep black/crimson background, gold border, serif 'W' and 'BLOODY'
const createSvg = (size, isMaskable = false) => {
  const padding = isMaskable ? size * 0.15 : size * 0.08;
  const innerSize = size - padding * 2;
  const cx = size / 2;
  const cy = size / 2;
  const radius = innerSize / 2;
  const gold = '#d4af37';
  const blood = '#8f171d';
  const bg = '#0c0a09';

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1c1615" />
      <stop offset="70%" stop-color="${bg}" />
      <stop offset="100%" stop-color="#050404" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5e6b3" />
      <stop offset="40%" stop-color="${gold}" />
      <stop offset="75%" stop-color="#9d7e36" />
      <stop offset="100%" stop-color="#e8d08c" />
    </linearGradient>
    <radialGradient id="crimsonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${blood}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${blood}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Full Background -->
  <rect width="${size}" height="${size}" fill="url(#bgGrad)" />

  <!-- Subtle Ambient Glow -->
  <circle cx="${cx}" cy="${cy}" r="${radius * 1.1}" fill="url(#crimsonGlow)" />

  <!-- Outer Ring (Gold) -->
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="url(#goldGrad)" stroke-width="${size * 0.022}" />

  <!-- Inner Crimson Accent Ring -->
  <circle cx="${cx}" cy="${cy}" r="${radius * 0.94}" fill="none" stroke="${blood}" stroke-width="${size * 0.012}" stroke-opacity="0.85" />
  <circle cx="${cx}" cy="${cy}" r="${radius * 0.88}" fill="none" stroke="url(#goldGrad)" stroke-width="${size * 0.006}" stroke-dasharray="${size * 0.015} ${size * 0.01}" />

  <!-- Center Monogram 'W' -->
  <text 
    x="${cx}" 
    y="${cy + size * 0.07}" 
    text-anchor="middle" 
    font-family="'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" 
    font-size="${size * 0.36}" 
    font-weight="700" 
    letter-spacing="-2"
    fill="url(#goldGrad)"
  >W</text>

  <!-- Subtitle Text -->
  <text 
    x="${cx}" 
    y="${cy + size * 0.24}" 
    text-anchor="middle" 
    font-family="'Inter', -apple-system, sans-serif" 
    font-size="${size * 0.055}" 
    font-weight="700" 
    letter-spacing="${size * 0.018}" 
    fill="#eedbb3" 
    opacity="0.9"
  >WARHOLA</text>

  <text 
    x="${cx}" 
    y="${cy + size * 0.31}" 
    text-anchor="middle" 
    font-family="'Inter', -apple-system, sans-serif" 
    font-size="${size * 0.04}" 
    font-weight="600" 
    letter-spacing="${size * 0.022}" 
    fill="#d9534f"
  >BLOODY GIN</text>
</svg>
  `.trim();
};

async function generate() {
  console.log('Generating PWA icons...');

  // SVG file
  const svg512 = createSvg(512, false);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svg512);

  // 192x192
  await sharp(Buffer.from(createSvg(192, false)))
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  // 512x512
  await sharp(Buffer.from(createSvg(512, false)))
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  // 512x512 maskable (has extra safe-zone padding)
  await sharp(Buffer.from(createSvg(512, true)))
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  // apple-touch-icon (180x180)
  await sharp(Buffer.from(createSvg(180, false)))
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // favicon.ico
  await sharp(Buffer.from(createSvg(64, false)))
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All PWA icons generated successfully in public/');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
