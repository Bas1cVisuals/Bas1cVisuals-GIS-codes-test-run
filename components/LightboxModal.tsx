import React, { useEffect } from 'react';

interface LightboxImage {
  full: string;
  alt: string;
  category: string;
  title: string;
}

interface LightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('media-active');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('media-active');
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} preview`}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity"></div>

      <div 
        className="relative z-[105] flex h-full w-full max-w-[88vw] sm:max-w-[78vw] lg:max-w-[62vw] flex-col items-center justify-center gap-3 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex max-h-[68svh] sm:max-h-[70svh] max-w-full items-center justify-center">
          <img
            src={image.full}
            alt={image.alt}
            decoding="async"
            className="max-h-[68svh] sm:max-h-[70svh] max-w-full object-contain rounded-[8px] bg-white shadow-2xl shadow-black/50"
          />
          <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 text-left shadow-lg shadow-black/20 backdrop-blur-md">
            <span className="block text-[9px] font-mono uppercase tracking-widest text-white/75 mix-blend-difference">{image.category}</span>
            <h4 className="truncate text-sm sm:text-base font-semibold text-white mix-blend-difference">{image.title}</h4>
          </div>
        </div>
        <div className="max-w-xl text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/35">
            Tap outside or press Esc to return
          </p>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
