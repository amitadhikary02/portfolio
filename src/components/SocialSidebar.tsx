import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  iconSrc: string;
  label: string;
  color: string;
  bgColor: string;
  index: number;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, iconSrc, label, color, bgColor, index }) => {
  return (
    <motion.div
      initial={{ 
        x: -100, 
        opacity: 0,
        scale: 0.9
      }}
      animate={{ 
        x: 0, 
        opacity: 1,
        scale: 1
      }}
      exit={{ 
        x: -100, 
        opacity: 0,
        scale: 0.9
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
        delay: index * 0.08
      }}
      whileHover={{ 
        x: 12,
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
      className="mb-2.5 last:mb-0"
    >
      <motion.a
        href={href}
        target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className={`group relative flex items-center ${bgColor} backdrop-blur-md rounded-r-2xl pl-3 pr-5 py-2.5 shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[190px] border border-white/10`}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-r-2xl"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Icon container with glow */}
        <motion.div 
          className={`relative w-9 h-9 ${color} rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 p-2 shadow-md`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={iconSrc} 
            alt={label} 
            className="w-full h-full object-contain relative z-10"
          />
          {/* Icon glow effect */}
          <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        
        {/* Label with better typography */}
        <span className="relative z-10 text-white font-semibold text-sm tracking-wide">
          {label}
        </span>
        
        {/* Shine effect */}
        <motion.div
          className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white/20 to-transparent rounded-r-2xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.div>
  );
};

const SocialSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close sidebar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as HTMLElement;
        // Check if click is outside the sidebar container
        const sidebarElement = document.getElementById('social-sidebar-container');
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
      color: 'bg-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
    },
    {
      href: 'https://www.facebook.com/amitadhikary02',
      iconSrc: '/assets/images/Contacts/facebook.png',
      label: 'Facebook',
      color: 'bg-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-500'
    },
    {
      href: 'https://wa.me/+918101029684',
      iconSrc: '/assets/images/Contacts/whatsapp.png',
      label: 'WhatsApp',
      color: 'bg-green-500',
      bgColor: 'bg-gradient-to-r from-green-500 to-green-400'
    },
    {
      href: 'https://www.linkedin.com/in/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/linkedin.png',
      label: 'LinkedIn',
      color: 'bg-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-500'
    },
    {
      href: 'mailto:amitadhikary59684@gmail.com',
      iconSrc: '/assets/images/Contacts/email.png',
      label: 'Email Me',
      color: 'bg-red-500',
      bgColor: 'bg-gradient-to-r from-red-600 to-red-500'
    },
    {
      href: 'https://github.com/amitadhikary02',
      iconSrc: '/assets/images/Contacts/github.png',
      label: 'GitHub',
      color: 'bg-gray-800',
      bgColor: 'bg-gradient-to-r from-gray-800 to-gray-700'
    },
    {
      href: 'https://leetcode.com/u/amitadhikary02/',
      iconSrc: '/assets/images/Contacts/leetcode.png',
      label: 'LeetCode',
      color: 'bg-orange-500',
      bgColor: 'bg-gradient-to-r from-orange-600 to-orange-500'
    },
    {
      href: 'https://www.hackerrank.com/profile/amitadhikary02',
      iconSrc: '/assets/images/Contacts/hackerrank.png',
      label: 'HackerRank',
      color: 'bg-green-600',
      bgColor: 'bg-gradient-to-r from-green-600 to-green-500'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <div 
      id="social-sidebar-container"
      className="fixed left-0 top-1/2 transform -translate-y-1/2" 
      style={{ 
        zIndex: 2147483640,
        pointerEvents: 'auto',
        visibility: 'visible',
        opacity: 1,
      }}
    >
      {/* Main container */}
      <div className="flex items-center">
        
        {/* Social links container with glassmorphism */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mr-2 overflow-hidden"
            >
              {/* Backdrop with blur */}
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl rounded-r-3xl" />
                
                {/* Content container */}
                <div className="relative bg-bg-card/40 backdrop-blur-xl border-r border-t border-b border-border-color rounded-r-3xl py-3 px-2 shadow-2xl">
                  {/* Header badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3 px-2"
                  >
                    <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl py-2 px-3 border border-primary/20">
                      <Sparkles size={14} className="text-primary" />
                      <span className="text-xs font-bold text-text-primary">Connect With Me</span>
                    </div>
                  </motion.div>

                  {/* Social links */}
                  <div className="space-y-2">
                    {socialLinks.map((link, index) => (
                      <SocialLink
                        key={link.label}
                        href={link.href}
                        iconSrc={link.iconSrc}
                        label={link.label}
                        color={link.color}
                        bgColor={link.bgColor}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Footer accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-3 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-2"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          
        {/* Enhanced toggle button */}
        <motion.button
          onClick={toggleMenu}
          className={`relative w-16 h-16 rounded-r-2xl flex items-center justify-center shadow-2xl transition-all duration-300 overflow-hidden border-r border-t border-b ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 border-red-400/30' 
              : 'bg-gradient-to-br from-primary via-secondary to-primary border-primary/30'
          }`}
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0'
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0"
            animate={{ 
              background: isOpen 
                ? ['linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                   'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #ef4444 100%)',
                   'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)']
                : ['linear-gradient(135deg, #6366f1 0%, #f59e0b 50%, #6366f1 100%)',
                   'linear-gradient(135deg, #f59e0b 0%, #6366f1 50%, #f59e0b 100%)',
                   'linear-gradient(135deg, #6366f1 0%, #f59e0b 50%, #6366f1 100%)']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          {/* Icon with smooth rotation */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isOpen ? (
              <X size={24} className="text-white drop-shadow-lg" strokeWidth={2.5} />
            ) : (
              <Menu size={24} className="text-white drop-shadow-lg" strokeWidth={2.5} />
            )}
          </motion.div>
          
          {/* Continuous pulse effect */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-r-2xl"
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0'
              }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(99, 102, 241, 0.4)',
                  '0 0 0 10px rgba(99, 102, 241, 0)',
                  '0 0 0 0 rgba(99, 102, 241, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.button>
      </div>

      {/* Enhanced mobile hint with animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 lg:hidden"
          >
            <div className="relative bg-gradient-to-r from-primary to-secondary p-[1px] rounded-xl shadow-2xl">
              <div className="bg-bg-card/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                <div className="flex items-center justify-center2">
                  <Sparkles size={12} className="text-secondary" />
                  <span className="text-xs font-semibold">Social Links</span>
                </div>
              </div>
              {/* Arrow pointer */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-primary"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Use portal to render sidebar directly to body
  if (!mounted) return null;
  
  return ReactDOM.createPortal(
    sidebarContent,
    document.body
  );
};

export default SocialSidebar; 