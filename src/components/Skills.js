import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Code,
  Palette,
  Globe,
  Database,
  GitBranch,
  Server,
  Wrench,
  Sparkles,
  Zap,
  Mail,
  Kanban,
  Brain,
  Rocket,
  MessageCircle
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
  SiVercel
} from "react-icons/si";

import { FaRobot, FaMagic } from "react-icons/fa";

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: Math.random() * 1.5 + 0.5,
          size: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.5 + 0.3,
          color: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 30 + 50}%)`,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    createParticles();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(8, 15, 30, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += particle.pulseSpeed;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * 0.00002 * force;
          particle.vy += dy * 0.00002 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1800;
          particle.y = (Math.random() - 0.5) * 1800;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 2);
        gradient.addColorStop(0, particle.color.replace(")", `, ${particle.opacity * scale})`).replace("hsl", "hsla"));
        gradient.addColorStop(0.4, particle.color.replace(")", `, ${particle.opacity * scale * 0.4})`).replace("hsl", "hsla"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);

          if (distance < 90) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - distance / 90) * scale * otherScale})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "radial-gradient(ellipse at top, #0f1729 0%, #050a14 50%, #000000 100%)"
      }}
    />
  );
};

const skillCategories = [
  {
    title: "Front-end",
    icon: Globe,
    gradient: "from-blue-500 via-cyan-500 to-teal-400",
    bgGlow: "bg-blue-500/20",
    skills: [
      { name: "HTML5", icon: <SiHtml5 className="text-orange-500" />, color: "from-orange-400 to-red-500" },
      { name: "CSS3", icon: <SiCss3 className="text-blue-500" />, color: "from-blue-400 to-indigo-500" },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, color: "from-yellow-400 to-orange-500" },
      { name: "React.js", icon: <SiReact className="text-cyan-400" />, color: "from-cyan-400 to-blue-500" },
      { name: "Next.js", icon: <SiReact className="text-white" />, color: "from-gray-700 to-gray-900" },
      { name: "Vite", icon: <SiReact className="text-purple-400" />, color: "from-purple-400 to-yellow-400" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" />, color: "from-teal-400 to-cyan-500" }
    ]
  },
  {
    title: "Back-end",
    icon: Server,
    gradient: "from-green-500 via-emerald-500 to-teal-400",
    bgGlow: "bg-green-500/20",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" />, color: "from-green-400 to-green-600" },
      { name: "Laravel", icon: <SiLaravel className="text-red-500" />, color: "from-red-400 to-orange-500" },
      { name: "MySQL", icon: <SiMysql className="text-blue-600" />, color: "from-blue-500 to-indigo-600" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" />, color: "from-green-400 to-teal-500" }
    ]
  },
  {
    title: "IA & Productivité",
    icon: Brain,
    gradient: "from-purple-500 via-pink-500 to-rose-400",
    bgGlow: "bg-purple-500/20",
    skills: [
      { name: "Cursor", icon: <MessageCircle className="text-green-400" />, color: "from-green-400 to-emerald-500" },
      { name: "v0.dev", icon: <SiVercel className="text-white" />, color: "from-gray-700 to-black" },
      { name: "GitHub Copilot", icon: <FaRobot className="text-blue-400" />, color: "from-blue-400 to-purple-500" },
      { name: "VS Code + IA", icon: <Code className="text-blue-300" />, color: "from-blue-300 to-cyan-400" }
    ]
  },
  {
    title: "Prototypage & Communication",
    icon: Rocket,
    gradient: "from-orange-500 via-red-500 to-pink-400",
    bgGlow: "bg-orange-500/20",
    skills: [
     
      { name: "EmailJS", icon: <Mail className="text-yellow-400" />, color: "from-yellow-400 to-orange-500" },
      { name: "Jira", icon: <SiJira className="text-blue-400" />, color: "from-blue-400 to-cyan-500" }
    ]
  },
  {
    title: "Outils & Versioning",
    icon: Wrench,
    gradient: "from-gray-500 via-gray-600 to-gray-700",
    bgGlow: "bg-gray-500/20",
    skills: [
      { name: "Git & GitHub", icon: <SiGithub className="text-gray-200" />, color: "from-gray-400 to-gray-600" },
     
      { name: "Postman", icon: <SiReact className="text-orange-500" />, color: "from-orange-400 to-red-500" },
     
    ]
  }
];

const SkillCard = ({ skill, index, catIndex }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: catIndex * 0.15 + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card */}
      <motion.div
        className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : {}}
          transition={{ duration: 0.6 }}
        />

        <div className="relative flex flex-col items-center space-y-3">
          {/* Icon Container */}
          <motion.div
            className="relative"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur-md opacity-50`} />
            <div className="relative text-4xl transform transition-transform duration-300 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              {skill.icon}
            </div>
          </motion.div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300 text-center">
            {skill.name}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <FloatingParticles />

      <motion.div 
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Stack Technique Complète</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Mes Compétences
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Maîtrise des technologies modernes, outils IA et méthodologies pour créer des expériences web exceptionnelles
            </p>

            <motion.div 
              className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full mt-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                {/* Category Background Glow */}
                <div className={`absolute -inset-4 ${category.bgGlow} blur-3xl rounded-3xl opacity-20`} />

                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
                  {/* Category Header */}
                  <motion.div
                    className="flex items-center justify-center gap-4 mb-10"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: catIndex * 0.15 + 0.2 }}
                  >
                    <motion.div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur" />
                      <category.icon className="w-7 h-7 text-white relative z-10" />
                    </motion.div>
                    
                    <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      {category.title}
                    </h2>
                  </motion.div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.skills.map((skill, index) => (
                      <SkillCard
                        key={index}
                        skill={skill}
                        index={index}
                        catIndex={catIndex}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;