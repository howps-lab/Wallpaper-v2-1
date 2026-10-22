interface GalleryCounterProps {
  selectedIndex: number | null;
  totalCount: number;
}

export function GalleryCounter({ selectedIndex, totalCount }: GalleryCounterProps) {
  return (
    <div
      aria-live="polite"
      className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 pointer-events-none select-none transition-opacity duration-300"
    >
      {selectedIndex !== null ? (
        <div className="flex items-baseline gap-1.5 font-display tracking-widest text-sm md:text-base font-medium">
          <span className="text-[var(--accent-primary)] font-semibold transition-colors duration-300">
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-white/60 text-xs">
            {String(totalCount).padStart(2, '0')}
          </span>
        </div>
      ) : (
        <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
          Cinematic Gallery
        </span>
      )}
    </div>
  );
}
