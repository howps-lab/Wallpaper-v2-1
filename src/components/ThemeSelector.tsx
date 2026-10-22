import { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { ThemeId } from '../types/gallery';
import { themes, themeIds } from '../data/themes';

interface ThemeSelectorProps {
  activeTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export function ThemeSelector({ activeTheme, onSelectTheme }: ThemeSelectorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeElement =
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      setIsFullscreen(Boolean(activeElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
        webkitFullscreenElement?: Element;
      };

      if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request could not be completed:', err);
    }
  };

  return (
    <nav
      aria-label="Theme selection and display controls"
      className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2.5 sm:gap-3"
    >
      {/* 3 Circular Theme Selector Dots */}
      <div className="flex items-center gap-3">
        {themeIds.map((id) => {
          const theme = themes[id];
          const isActive = activeTheme === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTheme(id)}
              title={theme.tooltip}
              aria-label={theme.tooltip}
              aria-pressed={isActive}
              className="group relative flex items-center justify-center p-2.5 -m-2.5 focus:outline-none"
            >
              {/* 9-12px visible circle with active state ring */}
              <span
                className={`block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'scale-125 ring-2 ring-offset-2 ring-offset-black/60 shadow-lg'
                    : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'
                }`}
                style={{
                  backgroundColor: theme.dotColor,
                  boxShadow: isActive ? `0 0 12px ${theme.accentPrimary}` : undefined,
                  ['--tw-ring-color' as string]: theme.dotColor,
                }}
              />

              {/* Tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white bg-black/85 backdrop-blur-md border border-white/10 rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50 shadow-xl"
              >
                {theme.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subtle Hairline Divider */}
      <span
        className="w-[1px] h-3.5 bg-white/20 mx-0.5"
        aria-hidden="true"
      />

      {/* Small Full-Screen Button */}
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
        title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
        className="group relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 hover:border-[var(--accent-primary)] text-white/75 hover:text-[var(--highlight)] transition-all duration-200 shadow-sm hover:shadow-[0_0_12px_var(--hover-glow)] focus:outline-none"
      >
        {isFullscreen ? (
          <Minimize2 className="w-3.5 h-3.5 stroke-[1.75]" />
        ) : (
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.75]" />
        )}

        {/* Tooltip */}
        <span
          role="tooltip"
          className="pointer-events-none absolute top-full mt-2 right-0 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white bg-black/85 backdrop-blur-md border border-white/10 rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50 shadow-xl"
        >
          {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        </span>
      </button>
    </nav>
  );
}
