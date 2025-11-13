import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Users, Brain, Zap } from 'lucide-react';

interface SkillItemProps {
  name: string;
  level: number;
  icon: string;
  delay: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, level, icon, delay }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img src={icon} alt={name} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-primary transition-colors duration-300">
            {name}
          </h4>
          <div className="text-xs sm:text-sm text-text-secondary">{level}% Proficiency</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-bg-secondary rounded-full h-1.5 sm:h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${animatedLevel}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

interface SoftSkillProps {
  title: string;
  icon: string;
  description: string;
  delay: number;
}

const SoftSkillCard: React.FC<SoftSkillProps> = ({ title, icon, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="bg-gradient-to-br from-bg-card/40 to-bg-card/20 backdrop-blur-sm border border-border-color rounded-2xl p-4 sm:p-6 text-center hover:border-primary/50 transition-all duration-300 relative overflow-hidden h-full">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
            <img src={icon} alt={title} className="w-6 h-6 sm:w-10 sm:h-10 object-contain" />
          </div>
          
          <h4 className="font-bold text-sm sm:text-base text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h4>
          
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technicalSkills = [
    { name: "Python", level: 90, icon: `${process.env.PUBLIC_URL}/assets/images/TS/python.png` },
    { name: "JavaScript", level: 95, icon: `${process.env.PUBLIC_URL}/assets/images/TS/java-script.png` },
    { name: "TypeScript", level: 85, icon: `${process.env.PUBLIC_URL}/assets/images/TS/typescript.png` },
    { name: "Java", level: 80, icon: `${process.env.PUBLIC_URL}/assets/images/TS/java.png` },
    { name: "Data Structures & Algorithms", level: 85, icon: `${process.env.PUBLIC_URL}/assets/images/TS/algorithm.png` },
    { name: "Django", level: 85, icon: `${process.env.PUBLIC_URL}/assets/images/TS/django (1).png` },
    { name: "MySQL", level: 80, icon: `${process.env.PUBLIC_URL}/assets/images/TS/mysql.png` },
    { name: "MongoDB", level: 75, icon: `${process.env.PUBLIC_URL}/assets/images/TS/database-storage.png` },
    { name: "HTML", level: 95, icon: `${process.env.PUBLIC_URL}/assets/images/TS/programming.png` },
    { name: "CSS", level: 88, icon: `${process.env.PUBLIC_URL}/assets/images/TS/coding.png` },
    { name: "Django REST", level: 82, icon: `${process.env.PUBLIC_URL}/assets/images/TS/django.png` },
    { name: "AIML", level: 75, icon: `${process.env.PUBLIC_URL}/assets/images/TS/ai.png` }
  ];

  const softSkills = [
    {
      title: "Problem Solving",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/problem-solving_10645621.png`,
      description: "Expert in breaking down complex problems into manageable solutions"
    },
    {
      title: "Teamwork",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/partners_5371115.png`,
      description: "Collaborative approach to achieving project goals"
    },
    {
      title: "Communication",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/language_2761083.png`,
      description: "Clear and effective communication across all levels"
    },
    {
      title: "Adaptability",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/Adaptibility.png`,
      description: "Quick to adapt to new technologies and methodologies"
    },
    {
      title: "Creativity",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/Creativity.png`,
      description: "Innovative thinking to create unique solutions"
    },
    {
      title: "Time Management",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/productive_2753156.png`,
      description: "Efficient prioritization and deadline management"
    },
    {
      title: "Leadership",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/partners_5371115.png`,
      description: "Guiding teams toward common goals with confidence and vision"
    },
    {
      title: "Critical Thinking",
      icon: `${process.env.PUBLIC_URL}/assets/images/SS/problem-solving_10645621.png`,
      description: "Analytical approach to evaluating information and making informed decisions"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-primary/3 to-secondary/3 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-secondary/3 to-primary/3 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-3 sm:px-4 py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20"
          >
            What I know
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6"
          >
            Skills & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Technologies</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed px-4"
          >
            A comprehensive overview of my technical expertise and soft skills that enable me to deliver exceptional results
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-gradient-to-br from-bg-card/50 to-bg-card/30 backdrop-blur-lg border border-border-color rounded-3xl p-6 sm:p-8 shadow-2xl h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center">
                <Code className="mr-2 sm:mr-3 text-primary" size={24} />
                Technical Skills
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {technicalSkills.map((skill, index) => (
                  <SkillItem
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="bg-gradient-to-br from-bg-card/50 to-bg-card/30 backdrop-blur-lg border border-border-color rounded-3xl p-6 sm:p-8 shadow-2xl h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center">
                <Users className="mr-2 sm:mr-3 text-secondary" size={24} />
                Soft Skills
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {softSkills.map((skill, index) => (
                  <SoftSkillCard
                    key={skill.title}
                    title={skill.title}
                    icon={skill.icon}
                    description={skill.description}
                    delay={0.1 * index}
                  />
                ))}
              </div>

              {/* Hobbies & Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-6 pt-6 border-t border-border-color"
              >
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <Zap className="mr-2 text-primary" size={20} />
                  Hobbies & Interests
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: '📚', label: 'Reading Books' },
                    { icon: '💻', label: 'Coding Challenges' },
                    { icon: '🌱', label: 'Open Source' },
                    { icon: '🎯', label: 'Competitive Programming' }
                  ].map((hobby, index) => (
                    <motion.div
                      key={hobby.label}
                      whileHover={{ scale: 1.05 }}
                      className="bg-bg-secondary/50 rounded-xl p-3 text-center hover:bg-primary/10 transition-all duration-300 border border-border-color/50"
                    >
                      <div className="text-2xl mb-1">{hobby.icon}</div>
                      <div className="text-xs text-text-secondary font-medium">{hobby.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Additional Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-bg-card/50 to-bg-card/30 backdrop-blur-lg border border-border-color rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
              >
                <Brain className="text-white" size={32} />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Always Learning & Growing
              </h3>
              
              <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                I'm constantly exploring new technologies, frameworks, and methodologies to stay at the 
                forefront of web development. My passion for learning drives me to tackle new challenges 
                and expand my skill set continuously.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 