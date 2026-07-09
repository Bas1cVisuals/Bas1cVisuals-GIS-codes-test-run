import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ImageSkeleton = ({ src, alt, className = '' }: { src: string, alt: string, className?: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <motion.div 
          className="absolute inset-0 bg-neutral-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
