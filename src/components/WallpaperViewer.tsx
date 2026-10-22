import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { Wallpaper } from '../types/gallery';
import { NavigationControls } from './NavigationControls';

interface WallpaperViewerProps {
  wallpaper: Wallpaper | null;
  wallpapers: Wallpaper[];
  currentIndex: number | null;
  isOpen: boolean;
  slideDirection: number; // -1 for left, 1 for right
  onClose: () => void;
  onNavigate: (newIndex: number, direction: number) => void;
}

export function WallpaperViewer({
  wallpaper,
  wallpapers,
  currentIndex,
  isOpen,
  slideDirection,
  onClose,
  onNavigate,
}: WallpaperViewerProps) {
  // Global keyboard shortcuts while viewer is open
  useEffect(() => {
    if (!isOpen || currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length;
        onNavigate(prevIndex, -1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        onNavigate(nextIndex, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, wallpapers.length, onClose, onNavigate]);

  if (!isOpen || !wallpaper || currentIndex === null) {
    return null;
  }

  const prevIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length;
  const nextIndex = (currentIndex + 1) % wallpapers.length;
  const previousTitle = wallpapers[prevIndex].title;
  const nextTitle = wallpapers[nextIndex].title;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="wallpaper-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="wallpaper-viewer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={wallpaper.title}
        >
          {/* Main Content Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="wallpaper-viewer-modal relative"
          >
            {/* Close button at top-right of image frame */}
            <button
              type="button"
              onClick={onClose}
              title="Close wallpaper viewer (Esc)"
              aria-label="Close wallpaper viewer"
              className="viewer-close-btn absolute -top-12 right-0 sm:-right-12 sm:top-0 z-50 focus:outline-none"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Previous and Next Navigation Arrows */}
            <NavigationControls
              onPrevious={() => onNavigate(prevIndex, -1)}
              onNext={() => onNavigate(nextIndex, 1)}
              previousTitle={previousTitle}
              nextTitle={nextTitle}
            />

            {/* Animated Wallpaper Display Frame */}
            <AnimatePresence mode="popLayout" custom={slideDirection}>
              <motion.div
                key={wallpaper.id}
                custom={slideDirection}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  x: slideDirection * 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  x: slideDirection * -40,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="wallpaper-viewer-frame"
              >
                <img
                  src={wallpaper.image}
                  alt={wallpaper.alt}
                  className="wallpaper-viewer-image"
                />
              </motion.div>
            </AnimatePresence>

            {/* Minimalist Editorial Photo Info Bar */}
            <motion.div
              key={`info-${wallpaper.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="wallpaper-info-bar"
            >
              <div className="wallpaper-info-text">
                <div className="flex items-center gap-3">
                  <h2 className="wallpaper-info-title">{wallpaper.title}</h2>
                  {wallpaper.location && (
                    <span className="wallpaper-info-meta">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>{wallpaper.location}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-1 max-w-xl font-normal hidden sm:block">
                  {wallpaper.description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
