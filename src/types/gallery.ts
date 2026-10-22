export interface Wallpaper {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  alt: string;
  location?: string;
}

export type ThemeId = 'summer' | 'sunset' | 'night';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  label: string;
  tooltip: string;
  videoSrc: string;
  posterSrc: string;
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  highlight: string;
  textPrimary: string;
  textMuted: string;
  surfaceGlass: string;
  borderSubtle: string;
  shadowColor: string;
  overlayColor: string;
  dotColor: string;
}
