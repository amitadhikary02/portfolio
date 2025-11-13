import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X } from 'lucide-react';

/**
 * Alternative Social Sidebar Design - Floating Orb Style
 * 
 * To use this version instead:
 * 1. Import this component in App.tsx instead of SocialSidebar
 * 2. Replace <SocialSidebar /> with <SocialSidebarFloating />
 * 
 * Features:
 * - Floating orb design
 * - Icons orbit around main button when open
 * - Minimalist and modern
 * - Better for mobile devices
 */

interface SocialIcon {
  href: string;
  iconSrc: string;
  label: string;
  color: string;
  angle: number;
}

const SocialSidebarFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        const sidebarElement = document.getElementById('social-sidebar-floating');
        if (sidebarElement && !sidebarElement.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const socialLinks = [
    {
      href: 'https://www.instagram.com/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/instagram.png',
      label: 'Instagram',
      color: 'from-purple-500 to-pink-500',
      angle: 0
    },
    {
      href: 'https://www.facebook.com/amitadhikary02',
      iconSrc: '/assets/images/Contacts/facebook.png',
      label: 'Facebook',
      color: 'from-blue-600 to-blue-400',
      angle: 45
    },
    {
      href: 'https://wa.me/+918101029684',
      iconSrc: '/assets/images/Contacts/whatsapp.png',
      label: 'WhatsApp',
      color: 'from-green-500 to-green-400',
      angle: 90
    },
    {
      href: 'https://www.linkedin.com/in/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/linkedin.png',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-500',
      angle: 135
    },
    {
      href: 'mailto:amitadhikary59684@gmail.com',
      iconSrc: '/assets/images/Contacts/email.png',
      label: 'Email',
      color: 'from-red-600 to-red-500',
      angle: 180
    },
    {
      href: 'https://github.com/amit59684',
      iconSrc: '/assets/images/Contacts/github.png',
      label: 'GitHub',
      color: 'from-gray-800 to-gray-600',
      angle: 225
    },
    {
      href: 'https://leetcode.com/u/amitadhikary/',
      iconSrc: '/assets/images/Contacts/leetcode.png',
      label: 'LeetCode',
      color: 'from-orange-600 to-orange-500',
      angle: 270
    },
    {
      href: 'https://www.hackerrank.com/profile/amit059684',
      iconSrc: '/assets/images/Contacts/hackerrank.png',
      label: 'HackerRank',
      color: 'from-green-600 to-green-500',
      angle: 315
    }
  ];

  const radius = 120; // Distance from center

  return ReactDOM.createPortal(
    <div id="social-sidebar-floating" className="fixed left-6 bottom-6 md:left-8 md:bottom-8 z-[9999]">
      {/* Social Icons - Orbit Style */}
      <AnimatePresence>
        {isOpen && socialLinks.map((link, index) => {
          const angleRad = (link.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={`absolute top-1/2 left-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center shadow-2xl border-2 border-white/20 group`}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x, 
                y, 
                scale: 1,
                opacity: 1 
              }}
              exit={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0 
              }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.05
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              style={{ 
                transformOrigin: 'center',
                marginLeft: '-28px',
                marginTop: '-28px'
              }}
            >
              <img 
                src={link.iconSrc} 
                alt={link.label} 
                className="w-7 h-7 object-contain"
              />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl backdrop-blur-sm"
              >
                {link.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </motion.div>
            </motion.a>
          );
        })}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${
          isOpen 
            ? 'from-red-500 to-red-600' 
            : 'from-primary via-secondary to-primary'
        } flex items-center justify-center shadow-2xl border-2 border-white/20 z-10`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 90 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background pulse */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}

        {isOpen ? (
          <X size={28} className="text-white" strokeWidth={2.5} />
        ) : (
          <Share2 size={28} className="text-white" strokeWidth={2.5} />
        )}
      </motion.button>
    </div>,
    document.body
  );
};

export default SocialSidebarFloating;
