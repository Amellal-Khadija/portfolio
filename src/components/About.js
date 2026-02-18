import React from 'react';
import { motion } from 'framer-motion';
import Img1 from '../images/profile.png';
import { Github, Linkedin, Mail, Sparkles, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-40 right-20 text-theme-yellow opacity-10 animate-pulse">
        <Star size={150} />
      </div>
      <div className="absolute bottom-40 left-20 text-theme-teal opacity-10 animate-bounce" style={{ animationDuration: '4s' }}>
        <Sparkles size={120} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-mauve/10 border border-theme-mauve/20 text-theme-mauve mb-6 shadow-sm">
            <Sparkles size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">Découvrez mon parcours</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-theme-text mb-4">
            À propos <span className="text-theme-mauve italic">de moi</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-theme-mauve to-theme-pink mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-theme-mauve via-theme-pink to-theme-blue rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-3xl overflow-hidden border-4 border-theme-surface0 shadow-2xl transform group-hover:rotate-3 transition-all duration-500">
                  <img
                    src={Img1}
                    alt="Khadija Amellal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6 text-theme-subtext leading-relaxed text-lg font-medium">
                <p>
                  Je suis <span className="text-theme-mauve font-black">développeuse web fullstack</span> passionnée,
                  diplômée et spécialisée dans la création d'applications modernes qui allient <span className="text-theme-pink font-black italic">esthétique</span> et performance.
                </p>

                <p>
                  Ma formation scientifique en <span className="text-theme-blue font-black underline decoration-theme-blue/30 underline-offset-4">Physique Électronique</span> m'a permis de développer une
                  rigueur et une logique d'analyse que je mets au service de chaque ligne de code.
                </p>

                <p>
                  De la conception d'interfaces utilisateur intuitives avec <span className="text-theme-teal font-black">React</span> à la
                  gestion d'architectures back-end robustes avec <span className="text-theme-red font-black">Laravel & Node.js</span>,
                  chaque projet est pour moi une opportunité d'innover.
                </p>

                <p className="italic text-theme-text/80 font-bold border-l-4 border-theme-mauve pl-6 py-2 bg-theme-mauve/5 rounded-r-xl">
                  "Mon objectif est de transformer vos idées les plus audacieuses en réalités numériques élégantes et performantes."
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-black text-theme-text mb-8">On discute ? ✨</h3>

          <div className="flex justify-center space-x-6">
            {[
              { Icon: Github, href: 'https://github.com/Amellal-Khadija', color: 'hover:text-theme-mauve', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/khadija-amellal', color: 'hover:text-theme-blue', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:khadijaamellal51@gmail.com', color: 'hover:text-theme-pink', label: 'Email' }
            ].map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl bg-theme-surface0/50 backdrop-blur-sm text-theme-subtext ${color} transform hover:scale-110 transition-all duration-300 border border-theme-surface1 shadow-xl`}
                whileHover={{ y: -5 }}
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;