import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Code2, Sparkles, ArrowUpRight, X } from 'lucide-react';

// Placeholder images
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
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialiser les particules
    particlesRef.current = [];
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push({
        x: (Math.random() - 0.5) * 1800,
        y: (Math.random() - 0.5) * 1800,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

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

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
      }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
        
        {/* Image Container */}
        <div className="relative overflow-hidden h-56">
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white text-xs font-semibold">
              {project.category}
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />

          {/* Image */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover Icon */}
          <div className={`absolute top-4 right-4 z-20 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm"
              >
                {tech}
              </span>
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
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Github className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="bg-slate-900/98 backdrop-blur-xl rounded-3xl max-w-4xl w-full border border-slate-700/50 shadow-2xl overflow-hidden"
        style={{
          animation: 'scaleIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec image */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-600/50 hover:bg-slate-700/80 hover:rotate-90 transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white text-sm font-semibold mb-3">
              {project.category}
            </div>
            <h2 className="text-4xl font-bold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[50vh] overflow-y-auto">
          <div>
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
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-white font-medium backdrop-blur-sm hover:bg-slate-700/60 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                Voir le code source
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold border border-slate-700 transition-all duration-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700 backdrop-blur-sm mb-6">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Portfolio</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Mes Projets
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection de mes réalisations récentes alliant créativité, performance et innovation
          </p>

          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full mt-8"></div>
        </div>

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
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;