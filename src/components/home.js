import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, Sparkles, Heart } from 'lucide-react';
import Img1 from '../images/profile.png';
import CV from '../images/CV-AMELLAL Khadija.pdf';

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const dynamicTexts = [
    "Développeuse Fullstack",
    "Créatrice d'expériences web",
    "Passionnée par l'innovation ✨",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Khadija_Amellal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-crust transition-colors duration-500">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-theme-mauve opacity-20 animate-float">
        <Sparkles size={100} />
      </div>
      <div className="absolute bottom-20 right-10 text-theme-pink opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Heart size={120} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-24 group inline-block"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-theme-mauve via-theme-pink to-theme-blue rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative">
            <div className="w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-theme-surface0 shadow-2xl relative">
              <img
                src={Img1}
                alt="Khadija Amellal"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="text-theme-text">Bonjour, je suis </span>
            <span className="bg-gradient-to-r from-theme-mauve to-theme-pink bg-clip-text text-transparent italic">
              Khadija Amellal
            </span>
          </h1>

          <div className="h-16 mb-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl md:text-3xl font-bold text-theme-subtext"
              >
                {dynamicTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-lg md:text-xl text-theme-subtext leading-relaxed font-medium">
            Passionnée par la création de solutions <span className="text-theme-mauve">innovantes</span> et <span className="text-theme-blue font-black underline decoration-theme-blue/30 underline-offset-4">performantes</span>.
            Je transforme des idées complexes en expériences web <span className="text-theme-pink italic">mignonnes</span> et efficaces.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <button
            onClick={handleDownloadCV}
            className="cute-button flex items-center gap-2 group"
          >
            <Download size={20} className="group-hover:bounce" />
            Télécharger CV
          </button>

          <div className="flex gap-4 items-center">
            {[
              { Icon: Github, href: "https://github.com/Amellal-Khadija", color: "hover:text-theme-mauve" },
              { Icon: Linkedin, href: "https://linkedin.com/in/khadija-amellal", color: "hover:text-theme-blue" },
              { Icon: Mail, href: "mailto:amellal.khadija@gmail.com", color: "hover:text-theme-pink" }
            ].map(({ Icon, href, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`text-theme-subtext transition-colors ${color}`}
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-theme-surface1 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-theme-mauve rounded-full" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-theme-crust to-transparent opacity-60"></div>
    </section>
  );
};

export default Home;