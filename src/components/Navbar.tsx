import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (scrollPos >= top && scrollPos <= bottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionChange);
    };
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Small delay to allow menu to close
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

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
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 cursor-pointer"
            variants={nameVariants}
            initial="hidden"
            animate="visible"
          >
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
            
            {/* Animated underline */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative rounded-lg ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* My Clicks Button */}
              <motion.a
                href="https://photos.amitadhikary.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Camera size={16} />
                <span>My Clicks</span>
              </motion.a>
              
              {/* Resume Button */}
              <motion.a
                href="/assets/images/Amit_Adhikary_resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Download size={16} />
                <span>Resume</span>
              </motion.a>
            </div>
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-bg-card/98 backdrop-blur-xl border-t border-primary/20 relative z-40 shadow-2xl shadow-primary/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-all duration-300 touch-manipulation ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Mobile My Clicks Button */}
              <motion.a
                href="https://photos.amitadhikary.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full px-3 py-3 mt-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-medium transition-all duration-300 touch-manipulation"
              >
                <Camera size={16} />
                <span>My Clicks</span>
              </motion.a>
              
              {/* Mobile Resume Button */}
              <motion.a
                href="/assets/images/Amit_Adhikary_resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full px-3 py-3 mt-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 touch-manipulation"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 