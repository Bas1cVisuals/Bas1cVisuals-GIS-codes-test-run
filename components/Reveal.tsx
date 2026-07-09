import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
  variant?: 'fadeUp' | 'fade' | 'stagger' | 'slideRight';
}

export const Reveal = ({ 
  children, 
  width = '100%', 
  delay = 0, 
  className = '',
  variant = 'fadeUp'
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        }
      }
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`relative ${className}`}>
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: variant === 'stagger' ? 0 : delay, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
