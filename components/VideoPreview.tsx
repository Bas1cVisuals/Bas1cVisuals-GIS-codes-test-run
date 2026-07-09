import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export const VideoPreview = ({ embedId, title, className = "" }: { embedId: string, title: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "200px" });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasLoaded(true);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      {!hasLoaded ? (
        <img 
          src={`https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`}
          onError={(e) => {
             // Fallback to hqdefault if maxresdefault fails
             (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`;
          }}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&modestbranding=1&rel=0&playlist=${embedId}`}
          title={title}
          allow="autoplay; encrypted-media"
          className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none" // Scale up to hide UI controls if any appear
        ></iframe>
      )}
    </div>
  );
};
