import React, { useState, useEffect } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past a certain point
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('correspondence');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-50 pointer-events-none"
        >
          <button
            onClick={scrollToContact}
            className="pointer-events-auto px-5 py-3 bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-black/20 hover:bg-neutral-800 transition-colors border border-neutral-700 hover:scale-105 duration-300"
          >
            <span>Start Project</span>
            <ArrowDownRight size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
