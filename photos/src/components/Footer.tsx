import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Mail, Camera, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <Github size={20} />, 
      href: 'https://github.com/amitadhikary02',
      color: 'hover:text-[#6e5494]'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={20} />, 
      href: 'https://linkedin.com/in/amit-adhikary-02',
      color: 'hover:text-[#0077b5]'
    },
    { 
      name: 'Email', 
      icon: <Mail size={20} />, 
      href: 'mailto:amitadhikary0604@gmail.com',
      color: 'hover:text-primary'
    },
  ];

  return (
    <footer className="relative py-16 lg:py-20 overflow-hidden border-t border-border-color">
      {/* Enhanced Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-secondary" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-secondary/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center space-x-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                <Camera size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">My Clicks</h3>
                <p className="text-sm text-text-secondary">By Amit Adhikary</p>
              </div>
            </motion.div>
            <p className="text-text-secondary leading-relaxed max-w-md mb-6">
              Capturing moments, creating memories. Exploring the world through my lens
              and sharing the beauty I find along the way.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  viewport={{ once: true }}
                  className={`w-10 h-10 bg-bg-card border border-border-color rounded-lg flex items-center justify-center text-text-secondary ${social.color} transition-all duration-300 hover:border-primary/50`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center space-x-2">
              <Sparkles size={18} className="text-secondary" />
              <span>Links</span>
            </h4>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://amitadhikary.com"
                  className="text-text-secondary hover:text-primary transition-colors duration-300 inline-flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>Portfolio</span>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://amitadhikary.com#contact"
                  className="text-text-secondary hover:text-primary transition-colors duration-300 inline-flex items-center space-x-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>Contact</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-text-secondary text-sm">
              &copy; {new Date().getFullYear()} Amit Adhikary. All rights reserved.
            </p>
            <motion.p 
              className="text-text-secondary text-sm flex items-center justify-center md:justify-start space-x-2 mt-1"
              whileHover={{ scale: 1.02 }}
            >
              <span>Crafted with</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.3, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={14} className="text-red-500 fill-current" />
              </motion.span>
              <span>and</span>
              <span className="text-primary font-medium">passion</span>
            </motion.p>
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Back to Top</span>
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
