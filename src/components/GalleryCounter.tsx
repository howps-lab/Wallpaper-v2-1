interface GalleryCounterProps {
  selectedIndex: number | null;
  totalCount: number;
}

export function GalleryCounter({ selectedIndex, totalCount }: GalleryCounterProps) {
  return (
    <div
      aria-live="polite"
      className="fixed top-5 left-5 md:top-7 md:left-8 z-50 flex items-center gap-3 pointer-events-none select-none transition-all duration-300"
    >
      {/* Title with font inspired by the Regal Crest reference */}
      <span className="font-stylish-title text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] text-white/80 font-bold italic tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
        Cinematic Gallery
      </span>

      {/* Gallery Index Counter displayed alongside title when an image is selected */}
      {selectedIndex !== null && (
        <div className="flex items-baseline gap-1 font-display tracking-widest text-xs md:text-sm font-medium bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-md">
          <span className="text-[var(--accent-primary)] font-semibold transition-colors duration-300">
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40 text-[10px]">/</span>
          <span className="text-white/60 text-[10px]">
            {String(totalCount).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
