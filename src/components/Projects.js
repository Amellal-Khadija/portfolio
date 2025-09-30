import React, { useState, useEffect, useRef } from 'react';
import { Github } from 'lucide-react';
import Authentification from '../images/authentification.jpeg';
import RecetteApp from '../images/proRecettes.jpg';
import AutoVision from '../images/AutoVision.jpg';
import CafeSite from '../images/CafeSite.jpg';

const projects = [
  {
    title: 'Authentification',
    description: 'Application web avec une interface d\'inscription/connexion et une page d\'accueil pour utilisateurs authentifiés, utilisant React.js pour le frontend et MongoDB pour la gestion des données.',
    image: Authentification,
    technologies: ['React.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com/Khadija123-hub/react-mongodb-auth.git'
  },  
  {
    title: 'RecetteApp',
    description: 'SuityDélice est une application de recettes de cuisine créée avec React et Bootstrap. Elle permet de rechercher, explorer des recettes par catégories et de naviguer facilement grâce à une barre de navigation moderne et fonctionnelle.',
    image: RecetteApp,
    technologies: ['React.js', 'React Router', 'Bootstrap', 'EmailJS'],
    link: 'https://github.com/Khadija123-hub/recettes-react.git',  
  },
  {
    title: "AutoVision",
    description: "Une plateforme web pour explorer et gérer des voitures neuves ou d'occasion. Développé avec PHP, MySQLi, HTML, CSS, Bootstrap et JavaScript.",
    image: AutoVision,
    technologies: ["PHP", "MySQLi", "HTML", "CSS", "Bootstrap"],
    link: "https://github.com/Khadija123-hub/AutoCollection-Manager.git"
  },
  {
    title: "Café Site Web",
    description: "Un site web moderne pour un café avec présentation du menu, système de commande en ligne, galerie de photos et formulaire de contact. Interface élégante et responsive pour une expérience utilisateur optimale.",
    image: CafeSite, // N'oublie pas d'importer l'image en haut : import CafeSite from './assets/cafe.jpg'
    technologies: ["React.js", "Tailwind CSS", "Laravel", "Responsive Design"],
    link: "https://github.com/Khadija123-hub/projet_fin_cafe" // Mets ton lien GitHub ici
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

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: Math.random() * 2 + 1,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
        });
      }
    };

    createParticles();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx += dx * 0.00001;
          particle.vy += dy * 0.00001;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 2000;
          particle.y = (Math.random() - 0.5) * 2000;
        }

        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla');
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - distance / 80)})`;
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
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
    />
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fonction pour bloquer/débloquer le scroll du body
  useEffect(() => {
    if (selectedProject) {
      // Bloquer le scroll quand la modal est ouverte
      document.body.style.overflow = 'hidden';
    } else {
      // Débloquer le scroll quand la modal est fermée
      document.body.style.overflow = 'unset';
    }

    // Nettoyer lors du démontage du composant
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const closeCard = () => {
    setSelectedProject(null);
  };

  // Fermer la modal en cliquant sur le backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCard();
    }
  };

  // Fermer la modal avec la touche Échap
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeCard();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedProject]);

  return (
    <section className="relative min-h-screen text-white py-20 overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
            Mes Projets
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                hoveredCard === index ? 'z-20' : 'z-10'
              }`}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
              
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {project.title}
                </h2>
                
                <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-2">Technologies :</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <span className="text-sm text-gray-400">Cliquez pour plus de détails</span>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <Github className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal avec backdrop cliquable */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-2xl max-w-2xl w-full border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h2>
                <button 
                  onClick={closeCard} 
                  className="text-gray-400 hover:text-white transition-colors text-2xl leading-none hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                {selectedProject.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Technologies utilisées :</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-full text-blue-300 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  Voir le code
                </a>
                
                <button 
                  onClick={closeCard} 
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;