import { ThemeId } from '../types/gallery';
import { themes, themeIds } from '../data/themes';

interface ThemeSelectorProps {
  activeTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export function ThemeSelector({ activeTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <nav
      aria-label="Theme selection"
      className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-3.5"
    >
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

            {/* Subtle floating tooltip on hover */}
            <span
              role="tooltip"
              className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white bg-black/80 backdrop-blur-md border border-white/10 rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50 shadow-xl"
            >
              {theme.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
