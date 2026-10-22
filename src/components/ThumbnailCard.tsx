import { useState, useRef, MouseEvent } from 'react';
import { Wallpaper } from '../types/gallery';

interface ThumbnailCardProps {
  wallpaper: Wallpaper;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}

export function ThumbnailCard({
  wallpaper,
  index,
  isActive,
  onSelect,
}: ThumbnailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Subtle 3D perspective tilt on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Small, restrained tilt angles (-6deg to +6deg)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(index);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View ${wallpaper.title}`}
      aria-selected={isActive}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="thumbnail-card-wrapper focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
      style={{
        transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div
        className={`thumbnail-card ${
          isActive ? 'is-active ring-2 ring-[var(--accent-primary)] ring-offset-1 ring-offset-black/50' : 'is-inactive'
        }`}
      >
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Tactile glass reflection */}
        <div className="thumbnail-shine" />

        {/* Clean caption */}
        <div className="thumbnail-caption">
          <span>{wallpaper.title}</span>
        </div>
      </div>
    </div>
  );
}
