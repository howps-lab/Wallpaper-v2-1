import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { wallpapers } from './data/wallpapers';
import { BackgroundVideo } from './components/BackgroundVideo';
import { ThemeSelector } from './components/ThemeSelector';
import { GalleryCounter } from './components/GalleryCounter';
import { ThumbnailGallery } from './components/ThumbnailGallery';
import { WallpaperViewer } from './components/WallpaperViewer';

export default function App() {
  const { activeTheme, setActiveTheme, themeConfig } = useTheme();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<number>(0);

  // Thumbnail selection handler
  const handleSelectWallpaper = (index: number) => {
    const direction = selectedIndex === null ? 0 : index > selectedIndex ? 1 : -1;
    setSlideDirection(direction);
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  // Navigation handlers (Next / Prev)
  const handleNavigate = (newIndex: number, direction: number) => {
    setSlideDirection(direction);
    setSelectedIndex(newIndex);
  };

  // Close viewer handler
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const currentWallpaper = selectedIndex !== null ? wallpapers[selectedIndex] : null;

  return (
    <main className="relative w-screen h-screen h-[100dvh] overflow-hidden select-none">
      {/* 1. Fullscreen Background Video & Theme Overlays */}
      <BackgroundVideo
        themeConfig={themeConfig}
        activeTheme={activeTheme}
      />

      {/* 2. Minimal Top Interface */}
      {/* Top Left: Gallery Counter */}
      <GalleryCounter
        selectedIndex={isViewerOpen ? selectedIndex : null}
        totalCount={wallpapers.length}
      />

      {/* Top Right: Unobtrusive 9-12px Theme Selector Dots */}
      <ThemeSelector
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
      />

      {/* 3. Main Wallpaper Viewer (Open only when a thumbnail is selected) */}
      <WallpaperViewer
        wallpaper={currentWallpaper}
        wallpapers={wallpapers}
        currentIndex={selectedIndex}
        isOpen={isViewerOpen}
        slideDirection={slideDirection}
        onClose={handleCloseViewer}
        onNavigate={handleNavigate}
      />

      {/* 4. Bottom Horizontal Thumbnail Gallery Strip */}
      <ThumbnailGallery
        wallpapers={wallpapers}
        selectedIndex={selectedIndex}
        onSelect={handleSelectWallpaper}
      />
    </main>
  );
}
