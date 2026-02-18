import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Sparkles, X, Layout, Code2, Eye } from 'lucide-react';

const projects = [
  {
    title: 'Authentification System',
    category: 'Full Stack',
    description: 'Interface d\'inscription et connexion sécurisée haut de gamme avec React et MongoDB.',
    technologies: ['React.js', 'Express.js', 'MongoDB', 'Tailwind'],
    link: 'https://github.com/Khadija123-hub/react-mongodb-auth.git',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
    color: 'from-theme-mauve to-theme-pink'
  },
  {
    title: 'SuityDélice',
    category: 'Frontend',
    description: 'Une application de recettes gourmandes avec une expérience utilisateur fluide et moderne.',
    technologies: ['React.js', 'Framer Motion', 'EmailJS'],
    link: 'https://github.com/Khadija123-hub/recettes-react.git',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
    color: 'from-theme-blue to-theme-teal'
  },
  {
    title: "AutoVision",
    category: 'PHP Fullstack',
    description: "Plateforme de gestion de parc automobile performante avec une architecture MVC.",
    technologies: ["PHP", "MySQL", "JavaScript"],
    link: "https://github.com/Khadija123-hub/AutoCollection-Manager.git",
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    color: 'from-theme-teal to-theme-green'
  },
  {
    title: "Zahra Café",
    category: 'Premium Web',
    description: "Expérience digitale immersive pour un café moderne, incluant une commande en ligne.",
    technologies: ["React.js", "Laravel", "Tailwind"],
    link: "https://github.com/Khadija123-hub/projet_fin_cafe",
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2070&auto=format&fit=crop',
    color: 'from-theme-peach to-theme-yellow'
  }
];

const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="glass-card overflow-hidden group h-full flex flex-col"
  >
    {/* Image Container */}
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-theme-crust/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl`}>
          {project.category}
        </span>
      </div>
      <motion.button
        onClick={() => onClick(project)}
        className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="p-4 rounded-full bg-theme-mauve text-theme-crust scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
          <Eye size={24} />
        </div>
      </motion.button>
    </div>

    {/* Content */}
    <div className="p-8 flex-1 flex flex-col">
      <h3 className="text-2xl font-bold text-theme-text mb-3 group-hover:text-theme-mauve transition-colors">
        {project.title}
      </h3>
      <p className="text-theme-subtext mb-6 line-clamp-2 text-sm">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech, i) => (
          <span key={i} className="px-3 py-1 text-[10px] font-bold rounded-lg bg-theme-surface0 text-theme-subtext border border-theme-surface1/50">
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="px-3 py-1 text-[10px] font-bold rounded-lg bg-theme-surface0 text-theme-subtext">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-theme-crust/90 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="max-w-4xl w-full glass-card overflow-hidden relative shadow-[0_0_50px_rgba(var(--accent-mauve),0.2)]"
    >
      <div className="flex flex-col md:flex-row">
        {/* Modal Image */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-theme-base/10"></div>
        </div>

        {/* Modal Content */}
        <div className="md:w-1/2 p-8 md:p-12">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-theme-surface0 transition-colors text-theme-text"
          >
            <X size={24} />
          </button>

          <div className={`w-20 h-2 bg-gradient-to-r ${project.color} rounded-full mb-8`} />
          <h2 className="text-4xl font-black text-theme-text mb-4 leading-tight">{project.title}</h2>
          <p className="text-lg text-theme-subtext mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-theme-mauve mb-4 flex items-center gap-2">
              <Sparkles size={14} /> Technologies utilisées
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-theme-surface0/50 border border-theme-surface1 text-theme-text text-sm font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full cute-button inline-flex items-center justify-center gap-3 py-4 text-lg"
          >
            <Github size={24} />
            Découvrir sur GitHub
          </a>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-mauve/10 border border-theme-mauve/20 text-theme-mauve mb-6 shadow-[0_0_20px_rgba(var(--accent-mauve),0.1)]">
            <Code2 size={16} />
            <span className="text-sm font-black uppercase tracking-widest">Portfolio</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-theme-text mb-6">
            Projets <span className="text-theme-mauve italic">Sélectionnés</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-theme-mauve to-theme-pink mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} onClick={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;