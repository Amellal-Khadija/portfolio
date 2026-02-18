import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Brain,
  Wrench,
  Sparkles,
  Zap,
  Cpu
} from "lucide-react";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiMysql,
  SiMongodb,
  SiGithub,
  SiJira,
  SiVercel,
  SiPostman
} from "react-icons/si";

const skillCategories = [
  {
    title: "Front-end",
    icon: Globe,
    color: "text-theme-blue",
    bg: "bg-theme-blue/10",
    skills: [
      { name: "HTML5", icon: <SiHtml5 />, color: "text-theme-red" },
      { name: "CSS3", icon: <SiCss3 />, color: "text-theme-blue" },
      { name: "JavaScript", icon: <SiJavascript />, color: "text-theme-yellow" },
      { name: "React.js", icon: <SiReact />, color: "text-theme-blue" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-theme-teal" }
    ]
  },
  {
    title: "Back-end",
    icon: Server,
    color: "text-theme-green",
    bg: "bg-theme-green/10",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-theme-green" },
      { name: "Laravel", icon: <SiLaravel />, color: "text-theme-red" },
      { name: "MySQL", icon: <SiMysql />, color: "text-theme-blue" },
      { name: "MongoDB", icon: <SiMongodb />, color: "text-theme-green" }
    ]
  },
  {
    title: "IA & Productivité",
    icon: Brain,
    color: "text-theme-mauve",
    bg: "bg-theme-mauve/10",
    skills: [
      { name: "Cursor IA", icon: <Cpu />, color: "text-theme-teal" },
      { name: "v0.dev", icon: <SiVercel />, color: "text-theme-text" },
      { name: "GitHub Copilot", icon: <Sparkles />, color: "text-theme-mauve" }
    ]
  },
  {
    title: "Outils & Déploiement",
    icon: Wrench,
    color: "text-theme-peach",
    bg: "bg-theme-peach/10",
    skills: [
      { name: "Git & GitHub", icon: <SiGithub />, color: "text-theme-subtext" },
      { name: "Postman", icon: <SiPostman />, color: "text-theme-peach" },
      { name: "Jira", icon: <SiJira />, color: "text-theme-blue" },
      { name: "Vercel", icon: <SiVercel />, color: "text-theme-text" }
    ]
  }
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -5, scale: 1.05 }}
    className="flex flex-col items-center p-6 glass-card group cursor-pointer border-transparent hover:border-theme-mauve/50"
  >
    <div className={`text-4xl mb-4 transition-transform duration-300 group-hover:rotate-12 ${skill.color}`}>
      {skill.icon}
    </div>
    <span className="text-sm font-black uppercase tracking-widest text-theme-subtext group-hover:text-theme-mauve transition-colors">
      {skill.name}
    </span>
  </motion.div>
);

const Skills = () => {
  return (
    <div className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-blue/10 border border-theme-blue/20 text-theme-blue mb-6 shadow-sm">
            <Zap size={16} />
            <span className="text-sm font-black uppercase tracking-widest">Mon arsenal technique</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-theme-text mb-6">
            Compétences <span className="text-theme-blue italic">& Outils</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-theme-blue to-theme-teal mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 flex flex-col"
            >
              <div className="flex items-center gap-6 mb-10">
                <div className={`p-4 rounded-2xl ${category.bg} ${category.color} shadow-lg`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-theme-text uppercase tracking-tight">{category.title}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
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