import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleEffect = ({ children, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none';
      
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      container.appendChild(particle);

      const animation = particle.animate([
        { 
          transform: `translate(${x}px, ${y}px) scale(1)`,
          opacity: 1
        },
        { 
          transform: `translate(${x + (Math.random() - 0.5) * 100}px, ${y + (Math.random() - 0.5) * 100}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: Math.random() * 1000 + 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      animation.onfinish = () => {
        particle.remove();
      };
    };

    const handleMouseMove = (e) => {
      if (Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default ParticleEffect;