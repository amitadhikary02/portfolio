import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    'Full Stack Developer',
    'React Developer',
    'TypeScript Expert',
    'Python Enthusiast',
    'Web Developer',
    'Software Engineer'
  ];

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTitleIndex, isDeleting, titles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-16 md:pt-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1 overflow-hidden"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-text-secondary font-medium"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-tight overflow-visible"

            >
              <span className="inline-block whitespace-nowrap">Amit <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">Adhikary</span></span>
            </motion.h1>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-12 sm:h-14 md:h-16 flex items-center justify-center lg:justify-start overflow-hidden"
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-text-secondary">
                {displayText}
                <span className="animate-pulse ml-1">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
            <p> Welcome to amitadhikary.com!</p>
            I'm Amit Adhikary, a Software Engineer and Full Stack Web Developer from India, skilled in React, TypeScript, Python, Django, Node.js, and modern technologies.
            I build scalable, high-performance applications with clean architecture and strong problem-solving skills.

            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl hover:shadow-primary/30 group w-full sm:w-auto"
              >
                <span>View My Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary bg-primary/5 text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 group w-full sm:w-auto backdrop-blur-sm"
              >
                <Mail size={20} />
                <span>Get In Touch</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 overflow-hidden"
          >
            <div className="relative">
              {/* Morphing Blob Background */}
              <motion.div
                animate={{ 
                  borderRadius: [
                    "60% 40% 30% 70%",
                    "30% 60% 70% 40%", 
                    "50% 60% 30% 60%",
                    "60% 40% 30% 70%"
                  ],
                  scale: [1, 1.05, 0.98, 1]
                }}
                transition={{ 
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-8 bg-gradient-to-br from-purple-500/25 via-cyan-400/20 to-pink-500/25 blur-2xl"
              />
              
              {/* Pulsing Glow Ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-xl"
              />

              {/* Floating Particles */}
              <motion.div
                animate={{ 
                  x: [0, 15, -10, 0],
                  y: [0, -20, 10, 0],
                  opacity: [0.5, 0.8, 0.6, 0.5]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 w-3 h-3 bg-cyan-400 rounded-full blur-sm"
              />
              
              <motion.div
                animate={{ 
                  x: [0, -18, 12, 0],
                  y: [0, 15, -20, 0],
                  opacity: [0.4, 0.7, 0.5, 0.4]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-6 -left-6 w-2 h-2 bg-pink-400 rounded-full blur-sm"
              />

              <motion.div
                animate={{ 
                  x: [0, 10, -8, 0],
                  y: [0, -12, 8, 0],
                  scale: [0.8, 1.2, 0.9, 0.8]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
                className="absolute top-1/3 -right-8 w-2 h-2 bg-purple-400/70 rounded-full"
              />

              {/* Main Profile Image Container - Elegant Floating */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              >
                {/* Gradient Border with Subtle Animation */}
                <motion.div 
                  animate={{ 
                    background: [
                      "linear-gradient(0deg, #8b5cf6, #06b6d4, #ec4899)",
                      "linear-gradient(72deg, #06b6d4, #ec4899, #8b5cf6)",
                      "linear-gradient(144deg, #ec4899, #8b5cf6, #06b6d4)",
                      "linear-gradient(216deg, #8b5cf6, #06b6d4, #ec4899)",
                      "linear-gradient(288deg, #06b6d4, #ec4899, #8b5cf6)",
                      "linear-gradient(360deg, #ec4899, #8b5cf6, #06b6d4)"
                    ]
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full p-1"
                >
                  <div className="w-full h-full bg-bg-primary rounded-full p-3 sm:p-4 relative overflow-hidden">
                    {/* Image with Professional Hover Effect */}
                    <motion.img
                      src={`${process.env.PUBLIC_URL}/assets/images/Pi7_Passport_Photo_v2.jpeg`}
                      alt="Amit Adhikary"
                      whileHover={{ 
                        scale: 1.02,
                        filter: "brightness(1.05) saturate(1.1)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover rounded-full shadow-2xl"
                    />
                    
                    {/* Subtle Overlay Glow Effect */}
                    <motion.div
                      animate={{ 
                        opacity: [0, 0.15, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-cyan-400/10 to-pink-400/10 rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Professional Floating Tech Icons */}
                <motion.div
                  animate={{ 
                    y: [-8, 8, -8],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg cursor-pointer"
                >
                  💻
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [8, -8, 8],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg cursor-pointer"
                >
                  🚀
                </motion.div>

                <motion.div
                  animate={{ 
                    x: [8, -8, 8],
                    y: [5, -5, 5],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                  }}
                  whileHover={{ 
                    scale: 1.3,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="absolute top-1/2 -right-6 sm:-right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-400/90 to-blue-500/90 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg cursor-pointer backdrop-blur-sm"
                >
                  ⚡
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-text-secondary hover:text-primary transition-colors duration-300 p-2 flex items-center justify-center"
          >
            <ChevronDown size={28} className="sm:w-8 sm:h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 