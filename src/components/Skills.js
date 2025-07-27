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
      for (let i = 0; i < 90; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          vz: Math.random() * 1.1 + 0.35,
          size: Math.random() * 1.6 + 0.7,
          opacity: Math.random() * 0.5 + 0.3,
          color: `hsl(${Math.random() * 60 + 200}, 72%, ${Math.random() * 30 + 42}%)`,
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
      ctx.fillStyle = 'rgba(17, 24, 39, 0.065)';
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
        
        if (distance < 125) {
          const force = (125 - distance) / 125;
          particle.vx += dx * 0.000016 * force;
          particle.vy += dy * 0.000016 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1700;
          particle.y = (Math.random() - 0.5) * 1700;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.22);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 1.7);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${particle.opacity * scale * 0.35})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 85) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.32 * (1 - distance / 85)})`;
            ctx.lineWidth = 0.7;
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
    { Icon: Code, delay: 0, x: '5%', y: '12%' },
    { Icon: Database, delay: 0.8, x: '95%', y: '20%' },
    { Icon: Palette, delay: 1.6, x: '8%', y: '78%' },
    { Icon: Server, delay: 2.4, x: '92%', y: '88%' },
    { Icon: Globe, delay: 3.2, x: '15%', y: '45%' },
    { Icon: GitBranch, delay: 4.0, x: '85%', y: '55%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute animate-pulse opacity-6 hover:opacity-12 transition-opacity duration-1000"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
            animationDuration: '5s'
          }}
        >
          <Icon size={32} className="text-blue-300/30" />
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
      
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4">
              🛠️ Mes Compétences
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez les technologies et outils que j'utilise pour créer des expériences web exceptionnelles
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-16">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="backdrop-blur-md bg-white/8 rounded-3xl shadow-2xl border border-white/15 p-8 md:p-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: catIndex * 0.3 }}
              >
                {/* Category Header */}
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: catIndex * 0.3 + 0.2 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} shadow-lg`}>
                      <category.icon size={32} className="text-white" />
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.title}
                    </h2>
                  </div>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: catIndex * 0.3 + index * 0.1 + 0.4 }}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
                      
                      {/* Card */}
                      <div className="relative backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="flex flex-col items-center text-center space-y-4">
                          {/* Icon */}
                          <div className="relative">
                            <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                              {skill.icon}
                            </div>
                            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                          </div>
                          
                          {/* Name */}
                          <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </h3>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: '85%' }}
                              transition={{ duration: 1.5, delay: catIndex * 0.3 + index * 0.1 + 0.8 }}
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

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;