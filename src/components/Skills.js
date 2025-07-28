import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Globe, Database, GitBranch, Server, Wrench } from 'lucide-react';

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
      for (let i = 0; i < 70; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vz: Math.random() * 1 + 0.3,
          size: Math.random() * 1.2 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 25 + 40}%)`,
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

    let animationFrame = 0;
    const animate = () => {
      animationFrame += 0.016;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += 0.016;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * 0.000012 * force;
          particle.vy += dy * 0.000012 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1500;
          particle.y = (Math.random() - 0.5) * 1500;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.15);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 1.5);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${particle.opacity * scale * 0.3})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 70) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.25 * (1 - distance / 70)})`;
            ctx.lineWidth = 0.5;
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
    { Icon: Database, delay: 0.8, x: '92%', y: '25%' },
    { Icon: Palette, delay: 1.6, x: '12%', y: '75%' },
    { Icon: Server, delay: 2.4, x: '88%', y: '85%' },
    { Icon: Globe, delay: 3.2, x: '18%', y: '50%' },
    { Icon: GitBranch, delay: 4.0, x: '82%', y: '60%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute animate-pulse opacity-4 hover:opacity-8 transition-opacity duration-1000"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
            animationDuration: '6s'
          }}
        >
          <Icon size={24} className="text-blue-300/20" />
        </div>
      ))}
    </div>
  );
};

const skillCategories = [
  {
    title: "Front-end",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "HTML", icon: "🌐", color: "from-orange-400 to-red-500" },
      { name: "CSS", icon: "🎨", color: "from-blue-400 to-indigo-500" },
      { name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-orange-500" },
      { name: "React.js", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
      { name: "Tailwind CSS", icon: "💎", color: "from-teal-400 to-cyan-500" }
    ]
  },
  {
    title: "Back-end",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
      { name: "Laravel", icon: "🚀", color: "from-red-400 to-orange-500" },
      { name: "MySQL", icon: "💾", color: "from-blue-500 to-indigo-600" }
    ]
  },
  {
    title: "Outils",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git & GitHub", icon: "🐙", color: "from-gray-400 to-gray-600" }
    ]
  }
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles />
      <FloatingIcons />
      
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          {/* Header - Plus compact */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3">
              🛠️ Mes Compétences
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Technologies et outils que j'utilise pour créer des expériences web
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-4"></div>
          </motion.div>

          {/* Skills Categories - Plus compactes */}
          <div className="space-y-10">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="backdrop-blur-md bg-white/6 rounded-2xl shadow-xl border border-white/10 p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              >
                {/* Category Header - Plus petit */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: catIndex * 0.2 + 0.1 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${category.color} shadow-md`}>
                      <category.icon size={24} className="text-white" />
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.title}
                    </h2>
                  </div>
                </motion.div>

                {/* Skills Grid - Plus petites cartes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.2 + index * 0.08 + 0.3 }}
                    >
                      {/* Glow Effect - Plus subtil */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-700`}></div>
                      
                      {/* Card - Plus petite */}
                      <div className="relative backdrop-blur-sm bg-white/8 rounded-xl p-4 border border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-102 hover:shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-2">
                          {/* Icon - Plus petit */}
                          <div className="relative">
                            <div className="text-3xl transform group-hover:scale-105 transition-transform duration-300">
                              {skill.icon}
                            </div>
                            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-lg opacity-15 group-hover:opacity-25 transition-opacity duration-300`}></div>
                          </div>
                          
                          {/* Name - Plus petit */}
                          <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </h3>
                          
                          {/* Progress Bar - Plus fine */}
                          <div className="w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: '85%' }}
                              transition={{ duration: 1.2, delay: catIndex * 0.2 + index * 0.08 + 0.6 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;