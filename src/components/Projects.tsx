import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  delay: number;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  delay
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full flex flex-col"
    >
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative h-full flex flex-col bg-gradient-to-br from-bg-card/60 to-bg-card/40 backdrop-blur-lg border border-border-color rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 sm:h-56">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Technology badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: delay + 0.2 + (idx * 0.1) }}
                className="px-2 py-1 text-xs font-medium bg-bg-card/90 backdrop-blur-sm text-text-primary border border-primary/30 rounded-lg"
              >
                {tech}
              </motion.span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-bg-card/90 backdrop-blur-sm text-text-secondary border border-border-color rounded-lg">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4 flex-1">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <motion.a
              href={liveUrl && liveUrl !== "#" ? liveUrl : githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {liveUrl && liveUrl !== "#" ? (
                <>
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </>
              ) : (
                <>
                  <Github size={16} />
                  <span>View Code</span>
                </>
              )}
            </motion.a>

            {liveUrl && liveUrl !== "#" && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 bg-bg-secondary border border-border-color hover:border-primary/50 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary transition-all duration-300"
                aria-label="View GitHub Repository"
              >
                <Github size={18} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "ParthaEducare",
      description: "A comprehensive medical education consultancy website based in Ranaghat, West Bengal, India. The platform connects students with medical and pharmacy educational opportunities across India, offering expert career guidance and admission assistance with modern web technologies.",
      image: `${process.env.PUBLIC_URL}/assets/images/Projects/parthaeducare.png`,
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
      githubUrl: "https://github.com/amit59684/ParthaEducare",
      liveUrl: "https://parthaeducare.com"
    },
    {
      title: "Admission Junction",
      description: "A comprehensive platform for college admissions and educational institution management built with the MERN stack. Features college listings, application management, user profiles, admin dashboard, and responsive design for seamless user experience.",
      image: `${process.env.PUBLIC_URL}/assets/images/Projects/admissionjunction.png`,
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      githubUrl: "https://github.com/amit59684/AdmissionJunction",
      liveUrl: "https://admissionjunction.com"
    },
    {
      title: "Sudoku Solver",
      description: "Created an intelligent Sudoku puzzle solver using backtracking algorithm that efficiently solves puzzles of varying difficulty levels.",
      image: `${process.env.PUBLIC_URL}/assets/images/Projects/sudoku.png`,
      technologies: ["Python", "Backtracking", "Logic"],
      githubUrl: "https://github.com/amit59684/sudoku_solver",
      liveUrl: "#"
    },
    {
      title: "Terminal Based Maze Solver",
      description: "Developed a sophisticated terminal-based application that solves complex mazes using various pathfinding algorithms including BFS, DFS, and A*.",
      image: `${process.env.PUBLIC_URL}/assets/images/Projects/maze.png`,
      technologies: ["Python", "Algorithms", "Data Structures"],
      githubUrl: "https://github.com/amit59684/Terminal-Based-Maze-Solver",
      liveUrl: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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
    <section id="projects" className="py-12 sm:py-16 lg:py-24 relative">
      {/* Background decorative elements - Smaller and more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            x: [0, 50, 0],
            y: [0, -25, 0]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-5 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-primary/8 to-secondary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Compact */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-14 lg:mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 border border-secondary/30 hover:border-secondary/60 transition-all duration-300"
          >
            ✨ Featured Work
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Showcase of my recent work and technical expertise in building modern web applications
          </motion.p>
        </motion.div>

  {/* Projects Grid - Better responsive spacing */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Call to Action - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10 sm:mt-12"
        >
          <motion.a
            href="https://github.com/amit59684"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Github size={18} />
            <span>View All</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 