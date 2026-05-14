import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Brain, BarChart2, Wrench } from 'lucide-react';

import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiLaravel, SiPhp, SiPython, SiExpress,
  SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiGithub, SiDocker, SiPostman, SiStreamlit, SiN8N,
} from 'react-icons/si';
import { FaRobot } from 'react-icons/fa';
import { Zap, Code, Settings } from 'lucide-react';

const skillCategories = [
  {
    title: 'Front-end',
    Icon: Globe,
    skills: [
      { name: 'HTML5', icon: <SiHtml5 /> },
      { name: 'CSS3', icon: <SiCss3 /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'React.js', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    title: 'Back-end',
    Icon: Server,
    skills: [
      { name: 'PHP', icon: <SiPhp /> },
      { name: 'Laravel', icon: <SiLaravel /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
    ],
  },
  {
    title: 'Bases de données',
    Icon: Database,
    skills: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    title: 'Automatisation IA',
    Icon: Brain,
    skills: [
      { name: 'n8n', icon: <SiN8N /> },
      { name: 'GitHub Copilot', icon: <FaRobot /> },
      { name: 'Power Automate', icon: <Zap size={20} /> },
      { name: 'Copilot Studio', icon: <Brain size={20} /> },
    ],
  },
  {
    title: 'Data & Visualisation',
    Icon: BarChart2,
    skills: [
      { name: 'Streamlit', icon: <SiStreamlit /> },
    ],
  },
  {
    title: 'Outils & DevOps',
    Icon: Wrench,
    skills: [
      { name: 'Git & GitHub', icon: <SiGithub /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'VS Code', icon: <Code size={20} /> },
      { name: 'Azure', icon: <Settings size={20} /> },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <div className="relative min-h-screen bg-[#09090b] py-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
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
            Stack Technique
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">
            Mes Compétences
          </h2>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">
            Technologies modernes, outils IA et méthodologies pour créer des expériences web exceptionnelles.
          </p>
          <div className="w-10 h-0.5 bg-indigo-400 mx-auto mt-6" />
        </motion.div>

        {/* Categories */}
        <div className="space-y-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-1.5 rounded-lg bg-indigo-400/10 border border-indigo-400/20">
                  <category.Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-indigo-400/30 hover:bg-indigo-400/5 transition-all duration-200"
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span className="text-base text-zinc-400 leading-none">{skill.icon}</span>
                    <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
