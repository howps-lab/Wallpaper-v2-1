import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  previousTitle: string;
  nextTitle: string;
}

export function NavigationControls({
  onPrevious,
  onNext,
  previousTitle,
  nextTitle,
}: NavigationControlsProps) {
  return (
    <>
      {/* Previous button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        title={`Previous: ${previousTitle}`}
        aria-label={`Previous wallpaper: ${previousTitle}`}
        className="viewer-nav-btn absolute left-2 sm:-left-16 md:-left-20 top-1/2 -translate-y-1/2 z-40 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        title={`Next: ${nextTitle}`}
        aria-label={`Next wallpaper: ${nextTitle}`}
        className="viewer-nav-btn absolute right-2 sm:-right-16 md:-right-20 top-1/2 -translate-y-1/2 z-40 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>
    </>
  );
}
