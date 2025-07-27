import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code, Database, Palette } from 'lucide-react';
import Img1 from '../images/profile.png';
import CV from '../images/CV-AMELLAL Khadija.pdf';


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
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: Math.random() * 1.5 + 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.4,
          color: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 30 + 50}%)`,
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
      animationFrame += 0.02;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += 0.02;

       
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
          particle.x = (Math.random() - 0.5) * 2000;
          particle.y = (Math.random() - 0.5) * 2000;
        }

    
        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.3);

        
        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
       
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 2);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${particle.opacity * scale * 0.5})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
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
    { Icon: Code, delay: 0, x: '10%', y: '20%' },
    { Icon: Database, delay: 0.5, x: '90%', y: '30%' },
    { Icon: Palette, delay: 1, x: '15%', y: '70%' },
    { Icon: Github, delay: 1.5, x: '85%', y: '80%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute animate-pulse opacity-10 hover:opacity-20 transition-opacity duration-1000"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
            animationDuration: '3s'
          }}
        >
          <Icon size={40} className="text-blue-400" />
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const dynamicTexts = [
    "Développeuse Fullstack",
    "Créatrice d'expériences web",
    "Passionnée par l'innovation",
  ];

  useEffect(() => {
    setIsVisible(true);
    
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      <FloatingIcons />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
       
        <div className="relative mt-24 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
          <div className="relative">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <img 
                src={Img1}
                alt="Khadija Amellal"
                className="w-64 h-full object-cover "
              />
            </div>
          
            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          </div>
        </div>

       
        <div className="mb-6">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Bonjour, je suis
            </span>
          </h1>
          
          <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Khadija Amellal
          </h2>
        </div>

      
        <div className="h-16 mb-8 flex items-center justify-center">
          <p className={`text-2xl md:text-3xl font-semibold text-gray-300 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block min-w-0">
              {dynamicTexts[textIndex]}
            </span>
            <span className="animate-pulse text-blue-400 ml-2">|</span>
          </p>
        </div>

    
        <div className={`max-w-4xl mx-auto mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
            Passionnée par la création de solutions innovantes et performantes,
            j'aime travailler avec des technologies modernes telles que{' '}
            <span className="text-blue-400 font-semibold bg-blue-400/10 px-2 py-1 rounded">React</span>,{' '}
            <span className="text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded">Node.js</span>,{' '}
            <span className="text-purple-400 font-semibold bg-purple-400/10 px-2 py-1 rounded">PHP</span> et{' '}
            <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded">Laravel</span>
            {' '}pour concevoir des applications web dynamiques et interactives.
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            À travers ce portfolio, vous découvrirez mes projets, ma philosophie de travail et les compétences 
            que j'ai développées au cours de mes études et de mes expériences professionnelles.
          </p>
        </div>

       
        <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button 
            onClick={handleDownloadCV}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Download size={20} />
              Télécharger CV
            </div>
          </button>
          
        
        </div>

       
      

        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Home;