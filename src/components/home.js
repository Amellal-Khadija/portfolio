import React, { useState, useEffect } from 'react';
import { Github, Download, ArrowDown } from 'lucide-react';
import Img1 from '../images/profile.png';
import CV from '../images/CV AMELLAL Kadija.pdf';

const dynamicTexts = [
  "Développeuse Fullstack",
  "Experte en Automatisation IA",
  "Spécialiste n8n & Intelligence Artificielle",
  "Créatrice de Solutions Web",
];

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
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
    link.remove();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-indigo-400/6 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 pt-16 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Photo */}
        <div className="relative w-28 h-28 mx-auto mb-10">
          <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10">
            <img src={Img1} alt="Khadija Amellal" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 rounded-full ring-1 ring-indigo-400/30 ring-offset-4 ring-offset-[#09090b]" />
        </div>

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-400/10 border border-indigo-400/20 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-300 text-xs font-medium">Disponible pour de nouveaux projets</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight">
          Khadija Amellal
        </h1>

        {/* Dynamic role */}
        <div className="h-10 mb-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-zinc-400 transition-all duration-500">
            {dynamicTexts[textIndex]}
            <span className="text-indigo-400 ml-1">|</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Je conçois des applications web modernes avec React.js, Next.js et Laravel,
          et crée des workflows automatisés avec n8n et l'Intelligence Artificielle.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Download size={16} />
            Télécharger CV
          </button>
          <a
            href="https://github.com/Amellal-Khadija"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-24 flex justify-center">
          <ArrowDown className="text-zinc-700 animate-bounce" size={20} />
        </div>
      </div>
    </section>
  );
};

export default Home;
