# Cinematic Wallpaper Slider

An immersive, full-screen 3D nature wallpaper gallery web application built with React 19, TypeScript, Vite, Tailwind CSS, and Motion.

## Features

- **Full-Screen Looping Video Backgrounds**: High-definition, seamless video loops playing continuously without black bars, stutter, or interruption.
- **Three Cinematic Color Themes**:
  - **Summer Day**: Bright sky blue & cyan palette (`#48D9F5`), airy daylight highlights, soft reflections.
  - **Sunset Field**: Warm amber & golden hour palette (`#FF9D42`), deep sunset shadows, warm glow.
  - **Night Time**: Deep indigo & midnight navy palette (`#8B9CFF`), celestial moonlight illumination.
- **Interactive 3D Thumbnail Slider with Navigation Arrows**:
  - Tactile, horizontally scrollable bottom gallery featuring 12 distinct nature wallpapers.
  - Left and right glass arrow buttons at both ends of the strip to smoothly slide through the collection.
  - Maintains comfortable card dimensions across all screen sizes while accommodating arbitrarily many wallpapers.
  - Dynamic 3D perspective tilting on mouse movement, subtle card elevation, and theme-colored active outlines.
  - Selected thumbnail automatically scrolls into view.
- **Enlarged Cinematic Wallpaper Viewer**:
  - Hidden by default; opens upon selecting any thumbnail.
  - Keeps the background video visible and playing continuously behind a translucent blurred backdrop.
  - Wraparound navigation (`ArrowLeft`, `ArrowRight`, on-screen thin chevron buttons).
  - Smooth scale and horizontal slide entrance transitions.
  - Closes via `Escape` key, close button, or backdrop click.
- **Minimalist Top Navigation**:
  - Discreet `01 / 12` gallery index counter in the top-left corner.
  - Three unobtrusive circular theme dots (9–12px) in the top-right corner with 44px touch targets on mobile.
  - Compact Full-Screen toggle button (`Maximize2` / `Minimize2`) right beside the theme dots with theme-glow hover effects and native Fullscreen API support.
- **Responsive Layout**: Designed for seamless viewing across mobile (viewport-fit, 100dvh safe areas, touch-friendly swipe/scroll), tablet, and desktop viewports.
- **Theme Persistence**: Preserves user's theme preference in `localStorage`.

## Wallpapers Included

1. **Alpine Dawn** — Snow-capped mountains illuminated by first light with valley mist.
2. **Lavender Fields** — Expansive purple lavender fields under a soft blue sky.
3. **Emerald Waterfall** — Majestic waterfall flowing into a crystal pool surrounded by tropical vegetation.
4. **Misty Forest** — Towering evergreen pines veiled in soft morning fog and sunbeams.
5. **Golden Meadow** — Tall grasses and wildflowers glowing in late-afternoon sunlight.
6. **Ocean Horizon** — Dramatic ocean waves, turquoise water, and rocky shoreline cliffs.
7. **Autumn Valley** — Mountain canyon ablaze with orange, amber, and crimson foliage.
8. **Starry Wilderness** — Remote mountain landscape under a starry Milky Way night sky.
9. **Desert Dunes** — Sculpted wind-carved desert sand dunes glowing with warm golden contours.
10. **Glacial Fjord** — Towering glacial cliffs framing sapphire fjord waters with tranquil reflections.
11. **Northern Aurora** — Ethereal emerald and violet polar lights waving gracefully across the arctic night sky.
12. **Sakura Blossom** — Gentle cherry blossoms in full spring bloom with soft petal drifts and serene morning light.

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 + CSS Custom Properties
- **Motion**: Motion for React
- **Icons**: Lucide React

## Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Type check and build for production
npm run build
```

## Vercel Deployment

The project is configured for one-click deployment on Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- All video and wallpaper assets are stored in `/public` using root-relative paths and served with immutable caching headers.
