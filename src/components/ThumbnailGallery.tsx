import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Wallpaper } from '../types/gallery';
import { ThumbnailCard } from './ThumbnailCard';

interface ThumbnailGalleryProps {
  wallpapers: Wallpaper[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ThumbnailGallery({
  wallpapers,
  selectedIndex,
  onSelect,
}: ThumbnailGalleryProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll boundary status
  const updateScrollStatus = useCallback(() => {
    if (!stripRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = stripRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    updateScrollStatus();
    el.addEventListener('scroll', updateScrollStatus, { passive: true });
    window.addEventListener('resize', updateScrollStatus);

    return () => {
      el.removeEventListener('scroll', updateScrollStatus);
      window.removeEventListener('resize', updateScrollStatus);
    };
  }, [updateScrollStatus, wallpapers.length]);

  // Slide left by approximately 2-3 thumbnail widths
  const handleSlideLeft = () => {
    if (!stripRef.current) return;
    const scrollAmount = Math.max(280, stripRef.current.clientWidth * 0.65);
    stripRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Slide right by approximately 2-3 thumbnail widths
  const handleSlideRight = () => {
    if (!stripRef.current) return;
    const scrollAmount = Math.max(280, stripRef.current.clientWidth * 0.65);
    stripRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Auto-scroll selected thumbnail into view smoothly
  useEffect(() => {
    if (selectedIndex === null || !stripRef.current) return;
    const cards = stripRef.current.children;
    if (cards[selectedIndex]) {
      (cards[selectedIndex] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      // Recheck scroll boundaries after scrolling finishes
      setTimeout(updateScrollStatus, 350);
    }
  }, [selectedIndex, updateScrollStatus]);

  return (
    <footer className="thumbnail-gallery-container" aria-label="Wallpaper thumbnails">
      <div className="thumbnail-carousel-wrapper">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handleSlideLeft}
          disabled={!canScrollLeft}
          aria-label="Slide thumbnails left"
          title="Slide thumbnails left"
          className="thumbnail-nav-btn focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Scrollable Thumbnail Strip */}
        <div
          ref={stripRef}
          role="region"
          aria-label="Gallery thumbnail slider"
          className="thumbnail-strip"
        >
          {wallpapers.map((wallpaper, idx) => (
            <ThumbnailCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              index={idx}
              isActive={selectedIndex === idx}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleSlideRight}
          disabled={!canScrollRight}
          aria-label="Slide thumbnails right"
          title="Slide thumbnails right"
          className="thumbnail-nav-btn focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </footer>
  );
}
