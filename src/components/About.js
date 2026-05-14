import React from 'react';
import { motion } from 'framer-motion';
import Img1 from '../images/profile.png';
import { Github, Linkedin, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const experiences = [
  {
    role: 'Développeuse Fullstack',
    company: 'DS Office',
    period: 'Avril 2026 — Présent',
    tags: ['React.js', 'Express.js', 'MySQL'],
    desc: "Conception et développement du site web officiel. Interfaces modernes et responsives.",
  },
  {
    role: 'Développeuse Fullstack',
    company: 'Prodig',
    period: 'Sept. 2025 — Avril 2026',
    tags: ['React.js', 'Laravel', 'MySQL'],
    desc: "Développement d'une plateforme de gestion de formation et du site ENJOY Experiences optimisé SEO.",
  },
  {
    role: 'Développeuse Fullstack',
    company: 'SMART Expos',
    period: 'Mars 2025',
    tags: ['React.js', 'Express.js', 'Laravel'],
    desc: "Refonte visuelle du site et création d'une application de traitement automatique de CV.",
  },
  {
    role: 'Freelance',
    company: 'Projets IA & Automatisation',
    period: '2026 — Présent',
    tags: ['n8n', 'Next.js', 'OCR', 'IA'],
    desc: "Plateforme QCM médecins, système de matching CV avec IA, automatisation d'inscriptions événementielles.",
  },
];

const socialLinks = [
  { Icon: Github, href: 'https://github.com/Amellal-Khadija', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/khadija-amellal', label: 'LinkedIn' },
  { Icon: Mail, href: 'mailto:khadijaamellal51@gmail.com', label: 'Email' },
];

const About = () => {
  return (
    <div className="relative min-h-screen bg-[#09090b]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-indigo-400 text-xs font-semibold tracking-widest uppercase">
              À propos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">
              Qui suis-je ?
            </h2>
            <div className="w-10 h-0.5 bg-indigo-400 mx-auto" />
          </motion.div>

          {/* Profile block */}
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-12 mb-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Photo */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative w-44 h-44">
                <img
                  src={Img1}
                  alt="Khadija Amellal"
                  className="w-44 h-44 rounded-2xl object-cover border border-white/10"
                />
                <div className="absolute -bottom-2.5 -right-2.5 w-full h-full rounded-2xl border border-indigo-400/20 -z-10" />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p className="text-base">
                Je suis{' '}
                <span className="text-white font-semibold">Développeuse Fullstack</span> spécialisée en{' '}
                <span className="text-indigo-300">automatisation intelligente et Intelligence Artificielle</span>.
              </p>
              <p className="text-base">
                Titulaire d'un{' '}
                <span className="text-white">Diplôme de Technicienne Spécialisée en Développement Fullstack</span>{' '}
                (OFPPT, 2025) et d'une{' '}
                <span className="text-white">Formation en Intelligence Artificielle</span>{' '}
                (Centre CTPES, 2025–2026).
              </p>
              <p className="text-base">
                J'ai travaillé sur des plateformes de gestion, des sites SEO-optimisés, des systèmes
                de matching CV avec IA et des applications d'automatisation. Je maîtrise MySQL,
                MongoDB, PostgreSQL et Supabase.
              </p>
              <p className="text-base">
                Certifiée{' '}
                <span className="text-white">Microsoft Power Automate</span>,{' '}
                <span className="text-white">Copilot Studio</span> et{' '}
                <span className="text-white">Azure</span> (2026).
              </p>

              {/* Social links */}
              <div className="flex gap-2 pt-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200 text-sm"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience timeline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Expériences</h3>
            <div className="space-y-3">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-200"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                >
                  <div className="sm:w-44 flex-shrink-0 pt-0.5">
                    <span className="text-xs text-zinc-600">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <h4 className="text-white text-sm font-semibold">
                        {exp.role} — {exp.company}
                      </h4>
                    </div>
                    <p className="text-zinc-500 text-sm mb-3 pl-3.5">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pl-3.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-500 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
