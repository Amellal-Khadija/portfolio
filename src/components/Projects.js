import React, { useState, useEffect } from 'react';
import { Github, ArrowUpRight, X, Code2 } from 'lucide-react';

const projects = [
  {
    id: 'qcm-medecins',
    title: 'Plateforme QCM pour Médecins',
    category: 'Freelance · IA',
    description:
      "Plateforme interactive de QCM dédiée aux médecins pour faciliter la préparation aux examens médicaux. Interface intuitive avec système de scoring, correction automatique et suivi des performances.",
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'cv-matching',
    title: 'Système de Matching CV avec IA',
    category: 'Freelance · Automatisation',
    description:
      "Analyse automatique des CV et scoring des candidats grâce à l'IA. Intégration OCR pour extraction de données, automatisation complète avec n8n et APIs Google.",
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    technologies: ['n8n', 'OCR', 'Google APIs', 'IA'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'inscription-feedback',
    title: 'Automatisation Inscription & Feedback',
    category: 'Freelance · n8n',
    description:
      "Système automatisé de gestion des inscriptions événementielles et envoi d'emails. Collecte et analyse de sentiment des feedbacks via IA.",
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    technologies: ['n8n', 'IA', 'Email Automation', 'NLP'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'traitement-cv',
    title: 'Application de Traitement de CV',
    category: 'Stage SMART · Full Stack',
    description:
      "Application d'analyse et de traitement automatique de CV. Extraction intelligente des données et présentation claire des profils candidats.",
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'gestion-formation',
    title: 'Plateforme de Gestion de Formation',
    category: 'Stage Prodig · Full Stack',
    description:
      "Système complet de gestion des étudiants, modules et paiements pour un organisme de formation. Développé en environnement Agile.",
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Laravel', 'MySQL'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'enjoy-experiences',
    title: 'Site Web ENJOY Experiences',
    category: 'Stage Prodig · Full Stack',
    description:
      "Site web responsive optimisé pour le SEO. Interface moderne et performante avec navigation fluide et contenu optimisé pour le référencement naturel.",
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Laravel', 'MySQL', 'SEO'],
    link: 'https://github.com/Amellal-Khadija',
  },
  {
    id: 'auth-fullstack',
    title: 'Authentification Full Stack',
    category: 'Projet Personnel',
    description:
      "Application web avec inscription/connexion sécurisée. Architecture REST avec gestion des sessions et JWT.",
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com/Khadija123-hub/react-mongodb-auth.git',
  },
  {
    id: 'autovision',
    title: 'AutoVision — Gestion Auto',
    category: 'Projet Personnel',
    description:
      "Plateforme web pour explorer et gérer des voitures neuves ou d'occasion. Recherche avancée et fiches détaillées.",
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    technologies: ['PHP', 'MySQLi', 'HTML', 'CSS', 'Bootstrap'],
    link: 'https://github.com/Khadija123-hub/AutoCollection-Manager.git',
  },
];

const ProjectCard = ({ project, onClick }) => {
  const handleKey = (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(project); };
  return (
    <div
      role="button"
      tabIndex={0}
      className="group cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 overflow-hidden"
      onClick={() => onClick(project)}
      onKeyDown={handleKey}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-indigo-300 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-500"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-600">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!project) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111113] rounded-2xl max-w-2xl w-full border border-white/[0.08] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-4 left-5">
            <span className="text-xs font-medium text-zinc-400 bg-black/50 px-2.5 py-1 rounded-full border border-white/10 mb-2 inline-block">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              Voir le code
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#09090b] py-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-xs font-semibold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">
            Mes Projets
          </h2>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">
            Une sélection de mes réalisations récentes alliant créativité, performance et innovation.
          </p>
          <div className="w-10 h-0.5 bg-indigo-400 mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

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
