import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * Alternative Social Sidebar Design - Bottom Dock Style (macOS inspired)
 * 
 * To use this version instead:
 * 1. Import this component in App.tsx instead of SocialSidebar
 * 2. Replace <SocialSidebar /> with <SocialSidebarDock />
 * 
 * Features:
 * - macOS dock-inspired design
 * - Icons at the bottom of screen
 * - Magnification effect on hover
 * - Collapsible for better UX
 * - Mobile-friendly
 */

interface SocialLink {
  href: string;
  iconSrc: string;
  label: string;
  color: string;
}

const SocialSidebarDock: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Close on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as HTMLElement;
        const sidebarElement = document.getElementById('social-sidebar-dock');
        if (sidebarElement && !sidebarElement.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const socialLinks: SocialLink[] = [
    {
      href: 'https://www.instagram.com/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/instagram.png',
      label: 'Instagram',
      color: 'from-purple-500 to-pink-500'
    },
    {
      href: 'https://www.facebook.com/amitadhikary02',
      iconSrc: '/assets/images/Contacts/facebook.png',
      label: 'Facebook',
      color: 'from-blue-600 to-blue-400'
    },
    {
      href: 'https://wa.me/+918101029684',
      iconSrc: '/assets/images/Contacts/whatsapp.png',
      label: 'WhatsApp',
      color: 'from-green-500 to-green-400'
    },
    {
      href: 'https://www.linkedin.com/in/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/linkedin.png',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-500'
    },
    {
      href: 'mailto:amitadhikary59684@gmail.com',
      iconSrc: '/assets/images/Contacts/email.png',
      label: 'Email',
      color: 'from-red-600 to-red-500'
    },
    {
      href: 'https://github.com/amit59684',
      iconSrc: '/assets/images/Contacts/github.png',
      label: 'GitHub',
      color: 'from-gray-800 to-gray-600'
    },
    {
      href: 'https://leetcode.com/u/amitadhikary/',
      iconSrc: '/assets/images/Contacts/leetcode.png',
      label: 'LeetCode',
      color: 'from-orange-600 to-orange-500'
    },
    {
      href: 'https://www.hackerrank.com/profile/amit059684',
      iconSrc: '/assets/images/Contacts/hackerrank.png',
      label: 'HackerRank',
      color: 'from-green-600 to-green-500'
    }
  ];

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  return ReactDOM.createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <div id="social-sidebar-dock" className="pointer-events-auto">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-primary to-secondary rounded-t-xl px-4 py-2 shadow-xl border border-b-0 border-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <ChevronDown size={20} className="text-white" strokeWidth={2.5} />
            ) : (
              <ChevronUp size={20} className="text-white" strokeWidth={2.5} />
            )}
          </motion.div>
        </motion.button>

        {/* Dock Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/95 to-bg-card/80 backdrop-blur-2xl rounded-t-3xl border-t border-x border-border-color shadow-2xl" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-t from-primary/20 to-secondary/20 rounded-t-3xl blur-xl" />
              
              {/* Icons Container */}
              <div className="relative flex items-end justify-center gap-3 px-6 py-4">
                {socialLinks.map((link, index) => {
                  const scale = getScale(index);
                  const isHovered = hoveredIndex === index;

                  return (
                    <motion.div
                      key={link.label}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      animate={{ scale }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute -top-14 bg-gray-900/95 text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-2xl backdrop-blur-sm"
                          >
                            {link.label}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <motion.a
                        href={link.href}
                        target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-xl border-2 border-white/20 transition-all duration-300`}
                        whileHover={{ y: -10, rotate: [0, -5, 5, 0] }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <img 
                          src={link.iconSrc} 
                          alt={link.label} 
                          className="w-7 h-7 md:w-8 md:h-8 object-contain"
                        />
                      </motion.a>

                      {/* Active indicator dot */}
                      {isHovered && (
                        <motion.div
                          layoutId="activeDot"
                          className="absolute -bottom-2 w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
};

export default SocialSidebarDock;
