import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  gradient?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ gradient = false }) => {
  return (
    <div className="relative w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          {/* Left decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex-1 h-px bg-gradient-to-r from-transparent via-border-color to-border-color"
          />
          
          {/* Center element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-4 sm:mx-6"
          >
            {gradient ? (
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-primary/50" />
            )}
          </motion.div>
          
          {/* Right decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex-1 h-px bg-gradient-to-l from-transparent via-border-color to-border-color"
          />
        </div>
        
        {/* Subtle glow effect */}
        {gradient && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionDivider;
