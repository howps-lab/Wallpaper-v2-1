import { useState, useEffect, useRef } from 'react';
import { ThemeConfig } from '../types/gallery';

interface BackgroundVideoProps {
  themeConfig: ThemeConfig;
  activeTheme: string;
}

interface VideoTrack {
  id: string;
  src: string;
  poster: string;
}

export function BackgroundVideo({ themeConfig, activeTheme }: BackgroundVideoProps) {
  const [currentTrack, setCurrentTrack] = useState<VideoTrack>({
    id: activeTheme,
    src: themeConfig.videoSrc,
    poster: themeConfig.posterSrc,
  });
  const [incomingTrack, setIncomingTrack] = useState<VideoTrack | null>(null);
  const [hasError, setHasError] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const incomingVideoRef = useRef<HTMLVideoElement>(null);

  // When activeTheme changes, initiate crossfade
  useEffect(() => {
    if (activeTheme !== currentTrack.id) {
      setIncomingTrack({
        id: activeTheme,
        src: themeConfig.videoSrc,
        poster: themeConfig.posterSrc,
      });
      setHasError(false);
    }
  }, [activeTheme, themeConfig.videoSrc, themeConfig.posterSrc, currentTrack.id]);

  // Handle incoming video ready to play
  const handleIncomingCanPlay = () => {
    if (!incomingTrack) return;
    const incomingEl = incomingVideoRef.current;
    if (incomingEl) {
      incomingEl.play().catch(() => {
        // Autoplay policy or interrupt
      });
    }

    // Switch tracks after short transition
    const timer = setTimeout(() => {
      setCurrentTrack(incomingTrack);
      setIncomingTrack(null);
    }, 450);

    return () => clearTimeout(timer);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <div className="cinematic-bg-container" aria-hidden="true">
      {/* Current playing video or poster fallback */}
      {hasError ? (
        <img
          src={currentTrack.poster}
          alt="Cinematic background fallback"
          className="cinematic-bg-video opacity-100"
        />
      ) : (
        <video
          key={currentTrack.id}
          ref={currentVideoRef}
          src={currentTrack.src}
          poster={currentTrack.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={handleVideoError}
          className={`cinematic-bg-video ${incomingTrack ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      {/* Incoming video for smooth crossfade */}
      {incomingTrack && (
        <video
          key={incomingTrack.id}
          ref={incomingVideoRef}
          src={incomingTrack.src}
          poster={incomingTrack.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleIncomingCanPlay}
          onError={handleVideoError}
          className="cinematic-bg-video opacity-100 z-1"
        />
      )}

      {/* Theme-specific gradient overlay */}
      <div className="cinematic-bg-overlay" />

      {/* Subtle cinematic vignette */}
      <div className="cinematic-vignette" />
    </div>
  );
}
