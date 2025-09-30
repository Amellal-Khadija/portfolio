import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Code2, Sparkles, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder images - remplacez avec vos vraies images
const Authentification = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop';
const RecetteApp = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop';
const AutoVision = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop';
const CafeSite = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop';

const projects = [
  {
    title: 'Authentification',
    category: 'Full Stack',
    description: 'Application web avec une interface d\'inscription/connexion et une page d\'accueil pour utilisateurs authentifiés, utilisant React.js pour le frontend et MongoDB pour la gestion des données.',
    image: Authentification,
    technologies: ['React.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com/Khadija123-hub/react-mongodb-auth.git'
  },  
  {
    title: 'RecetteApp',
    category: 'Frontend',
    description: 'SuityDélice est une application de recettes de cuisine créée avec React et Bootstrap. Elle permet de rechercher, explorer des recettes par catégories et de naviguer facilement grâce à une barre de navigation moderne et fonctionnelle.',
    image: RecetteApp,
    technologies: ['React.js', 'React Router', 'Bootstrap', 'EmailJS'],
    link: 'https://github.com/Khadija123-hub/recettes-react.git'
  },
  {
    title: "AutoVision",
    category: 'Full Stack',
    description: "Une plateforme web pour explorer et gérer des voitures neuves ou d'occasion. Développé avec PHP, MySQLi, HTML, CSS, Bootstrap et JavaScript.",
    image: AutoVision,
    technologies: ["PHP", "MySQLi", "HTML", "CSS", "Bootstrap"],
    link: "https://github.com/Khadija123-hub/AutoCollection-Manager.git"
  },
  {
    title: "Café Site Web",
    category: 'Full Stack',
    description: "Un site web moderne pour un café avec présentation du menu, système de commande en ligne, galerie de photos et formulaire de contact. Interface élégante et responsive pour une expérience utilisateur optimale.",
    image: CafeSite,
    technologies: ["React.js", "Tailwind CSS", "Laravel", "Responsive Design"],
    link: "https://github.com/Khadija123-hub/projet_fin_cafe"
  }
];



const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 15, 30, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += 0.02;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx += dx * 0.00002 * force;
          particle.vy += dy * 0.00002 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1800;
          particle.y = (Math.random() - 0.5) * 1800;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 2);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${particle.opacity * scale * 0.3})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 90) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.25 * (1 - distance / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at top, #0f1729 0%, #050a14 50%, #000000 100%)' }}
    />
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card */}
      <motion.div
        className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-56">
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className={`px-3 py-1 rounded-full bg-gradient-to-r  text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {project.category}
            </motion.div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />

          {/* Image */}
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Hover Icon */}
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3 
            className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              Voir les détails
            </span>
            <motion.div
              className={`w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Github className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : {}}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full border border-white/20 shadow-2xl overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec image */}
        <div className="relative h-72 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br  opacity-20`} />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r  text-white text-sm font-semibold mb-3`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.category}
            </motion.div>
            <motion.h2
              className="text-4xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[50vh] overflow-y-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Technologies utilisées
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`px-4 py-2 rounded-xl bg-gradient-to-r  bg-opacity-10 border border-white/20 text-white font-medium backdrop-blur-sm`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r  text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Github className="w-5 h-5" />
                Voir le code source
              </motion.a>

              <motion.button
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedProject]);

  return (
    <section className="relative min-h-screen overflow-hidden py-20">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Portfolio</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Mes Projets
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection de mes réalisations récentes alliant créativité, performance et innovation
          </p>

          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>


      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;