import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Img1 from '../images/profile.png';
import { Github, Linkedin, Mail, Code, Database, Server, Globe } from 'lucide-react';

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
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          vz: Math.random() * 1.2 + 0.4,
          size: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.55 + 0.35,
          color: `hsl(${Math.random() * 60 + 200}, 75%, ${Math.random() * 30 + 45}%)`,
          pulse: Math.random() * Math.PI * 2
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
      ctx.fillStyle = 'rgba(17, 24, 39, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += 0.018;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 130) {
          const force = (130 - distance) / 130;
          particle.vx += dx * 0.000018 * force;
          particle.vy += dy * 0.000018 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1800;
          particle.y = (Math.random() - 0.5) * 1800;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.25);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 1.8);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${particle.opacity * scale * 0.4})`).replace('hsl', 'hsla'));
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
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.35 * (1 - distance / 90)})`;
            ctx.lineWidth = 0.8;
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
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
      }}
    />
  );
};

const FloatingIcons = () => {
  const icons = [
    { Icon: Code, delay: 0, x: '8%', y: '15%' },
    { Icon: Database, delay: 0.7, x: '92%', y: '25%' },
    { Icon: Server, delay: 1.4, x: '12%', y: '75%' },
    { Icon: Globe, delay: 2.1, x: '88%', y: '85%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute animate-pulse opacity-8 hover:opacity-15 transition-opacity duration-1000"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
            animationDuration: '4s'
          }}
        >
          <Icon size={35} className="text-blue-300/40" />
        </div>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles />
      <FloatingIcons />
      
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4">
              À propos de moi
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Image */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white/30 backdrop-blur-sm shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                    <img 
                      src={Img1}
                      alt="Khadija Amellal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-spin" style={{ animationDuration: '25s' }}></div>
                  <div className="absolute inset-3 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="space-y-6 text-gray-200 leading-relaxed">
                  <p className="text-lg">
                    Je suis <span className="text-blue-400 font-semibold">Développeuse Fullstack</span> spécialisée en{' '}
                    <span className="text-purple-400 font-semibold">automatisation intelligente et Intelligence Artificielle</span>.
                    J'ai une expérience confirmée dans la conception d'applications web modernes avec{' '}
                    <span className="text-cyan-400 font-semibold">React.js, Next.js, Laravel et Python</span>,
                    la création de workflows automatisés avec <span className="text-orange-400 font-semibold">n8n</span>,
                    et l'intégration d'APIs pour transformer les processus métier.
                  </p>

                  <p className="text-lg">
                    Titulaire d'un <span className="text-green-400 font-semibold">Diplôme de Technicienne Spécialisée en Développement Fullstack</span> (OFPPT, 2025)
                    et d'une <span className="text-purple-400 font-semibold">Formation Qualifiante en Intelligence Artificielle</span> (Centre CTPES, 2025–2026),
                    avec une licence en Sciences Physiques qui m'a dotée d'une rigueur analytique solide.
                  </p>

                  <p className="text-lg">
                    J'ai travaillé en entreprise sur des projets variés : plateformes de gestion de formation,
                    sites web SEO-optimisés, <span className="text-blue-400 font-semibold">systèmes de matching de CV avec IA</span>,
                    et applications d'automatisation événementielle. Je maîtrise les bases de données
                    <span className="text-indigo-400 font-semibold"> MySQL, MongoDB, PostgreSQL et Supabase</span>.
                  </p>

                  <p className="text-lg">
                    Certifiée <span className="text-yellow-400 font-semibold">Microsoft Power Automate</span>,{' '}
                    <span className="text-yellow-400 font-semibold">Microsoft Copilot Studio</span> et{' '}
                    <span className="text-yellow-400 font-semibold">Azure</span> (2026).
                    Je suis passionnée par l'innovation et déterminée à créer des{' '}
                    <span className="text-cyan-400 font-semibold">solutions intelligentes à fort impact</span>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Expériences</span>
            </h3>
            <div className="relative space-y-6">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 hidden md:block" />
              {[
                {
                  role: 'Développeuse Fullstack — DS Office',
                  period: 'Avril 2026 — Présent',
                  color: 'bg-cyan-500',
                  tags: ['React.js', 'Express.js', 'MySQL'],
                  desc: 'Conception et développement du site web officiel de DS Office. Création d\'interfaces modernes et responsives.'
                },
                {
                  role: 'Développeuse Fullstack — Prodig',
                  period: 'Sept. 2025 — Avril 2026',
                  color: 'bg-blue-500',
                  tags: ['React.js', 'Laravel', 'MySQL'],
                  desc: 'Développement de 2 projets : plateforme de gestion de formation et site web ENJOY Experiences optimisé SEO.'
                },
                {
                  role: 'Développeuse Fullstack — SMART Expos',
                  period: 'Mars 2025',
                  color: 'bg-purple-500',
                  tags: ['React.js', 'Express.js', 'Laravel'],
                  desc: 'Refonte visuelle du site SMART Expos et création d\'une application de traitement automatique de CV.'
                },
                {
                  role: 'Freelance — Projets IA & Automatisation',
                  period: '2026 — Présent',
                  color: 'bg-pink-500',
                  tags: ['n8n', 'Next.js', 'OCR', 'IA'],
                  desc: 'Plateforme QCM médecins, système de matching CV avec IA, automatisation d\'inscriptions événementielles.'
                }
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  className="relative md:pl-12 flex flex-col gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                >
                  <div className={`absolute left-2.5 top-2 w-3 h-3 ${exp.color} rounded-full shadow-lg hidden md:block ring-2 ring-white/20`} />
                  <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="text-white font-semibold text-lg">{exp.role}</h4>
                      <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Restons connectés</h3>
            
            <div className="flex justify-center space-x-8">
              {[
                { Icon: Github, href: 'https://github.com/Amellal-Khadija', color: 'hover:text-gray-300', bg: 'hover:bg-gray-500/20' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/khadija-amellal', color: 'hover:text-blue-400', bg: 'hover:bg-blue-500/20' },
                { Icon: Mail, href: 'mailto:khadijaamellal51@gmail.com?subject=Contact depuis le portfolio', color: 'hover:text-green-400', bg: 'hover:bg-green-500/20' }
              ].map(({ Icon, href, color, bg }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target={href.includes('http') ? '_blank' : '_self'}
                  rel={href.includes('http') ? 'noopener noreferrer' : undefined}
                  className={`p-4 rounded-full bg-white/5 backdrop-blur-sm text-gray-300 ${color} ${bg} transform hover:scale-110 transition-all duration-300 hover:shadow-lg border border-white/10`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Icon size={28} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;