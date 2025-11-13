import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-bg-card/95 backdrop-blur-xl border-b border-primary/20 shadow-2xl shadow-primary/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Animated Name Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 cursor-pointer"
            variants={nameVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center space-x-2">
              <Camera size={28} className="text-primary" />
              <div className="flex items-center space-x-1">
                {/* First Name - Amit */}
                <motion.div className="flex">
                  {"Amit".split("").map((letter, index) => (
                    <motion.span
                      key={`amit-${index}`}
                      variants={letterVariants}
                      whileHover={{ 
                        scale: 1.2, 
                        color: "#6366f1",
                        transition: { duration: 0.2 }
                      }}
                      className="text-xl sm:text-2xl font-bold text-text-primary hover:text-primary transition-colors duration-300"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Space */}
                <span className="text-xl sm:text-2xl font-bold text-text-primary">&nbsp;</span>
                
                {/* Last Name - Adhikary */}
                <motion.div className="flex">
                  {"Adhikary".split("").map((letter, index) => (
                    <motion.span
                      key={`adhikary-${index}`}
                      variants={letterVariants}
                      whileHover={{ 
                        scale: 1.2, 
                        color: "#f59e0b",
                        transition: { duration: 0.2 }
                      }}
                      className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all duration-300"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
            
            {/* Animated underline */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://amitadhikary.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Home size={16} />
              <span>Portfolio</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMobileMenuToggle}
              className="relative z-50 bg-bg-secondary p-2 rounded-lg text-text-primary hover:text-primary transition-colors duration-300 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-bg-card/98 backdrop-blur-xl border-t border-primary/20 relative z-40 shadow-2xl shadow-primary/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <motion.a
              href="https://amitadhikary.com"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full px-3 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 touch-manipulation"
            >
              <Home size={16} />
              <span>Back to Portfolio</span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
