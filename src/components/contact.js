import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vz: Math.random() * 1 + 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 40}%)`,
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
      animationFrame += 0.015;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;
        particle.pulse += 0.015;

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        const dx = mouseRef.current.x - x2d;
        const dy = mouseRef.current.y - y2d;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx += dx * 0.000015 * force;
          particle.vy += dy * 0.000015 * force;
        }

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 1500;
          particle.y = (Math.random() - 0.5) * 1500;
        }

        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2);

        ctx.beginPath();
        ctx.arc(x2d, y2d, pulseSize * scale, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, pulseSize * scale * 1.5);
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * scale})`).replace('hsl', 'hsla'));
        gradient.addColorStop(0.6, particle.color.replace(')', `, ${particle.opacity * scale * 0.3})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX2d = otherParticle.x * otherScale + canvas.width / 2;
          const otherY2d = otherParticle.y * otherScale + canvas.height / 2;
          
          const distance = Math.sqrt((x2d - otherX2d) ** 2 + (y2d - otherY2d) ** 2);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - distance / 80)})`;
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

function Contact() {
    const sendEmail = (e) => {
        e.preventDefault();

        const serviceID = "service_9hegsr9";
        const templateID = "template_r4tud4s";
        const userID = "zeSAyUt2N4Tmzoy5Z";

        emailjs.sendForm(serviceID, templateID, e.target, userID)
            .then((result) => {
                console.log(result.text);
                alert("Message envoyé avec succès !");
            }, (error) => {
                console.log(error.text);
                alert("Une erreur s'est produite, veuillez réessayer.");
            });

        e.target.reset(); 
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <FloatingParticles />
            
            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4">
                            Contactez-moi
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter !
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Contact Form */}
                        <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Send className="text-blue-400" size={24} />
                                Envoyez-moi un message
                            </h2>
                            
                            <form className="space-y-6" onSubmit={sendEmail}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                                        Votre message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                                        placeholder="Décrivez votre projet ou votre message..."
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send size={20} />
                                    Envoyer le message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-6">Informations de contact</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                        <div className="p-3 bg-blue-500/20 rounded-full">
                                            <Mail className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 text-sm">Email</p>
                                            <p className="text-white font-semibold">khadijaamellal51@gmail.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                        <div className="p-3 bg-green-500/20 rounded-full">
                                            <Phone className="text-green-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 text-sm">Téléphone</p>
                                            <p className="text-white font-semibold">06 07 08 94 51</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                        <div className="p-3 bg-purple-500/20 rounded-full">
                                            <MapPin className="text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 text-sm">Localisation</p>
                                            <p className="text-white font-semibold">Casablanca, Maroc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-4">Disponibilité</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Je suis actuellement disponible pour de nouveaux projets. 
                                    N'hésitez pas à me contacter pour discuter de vos besoins 
                                    et voir comment nous pouvons collaborer ensemble.
                                </p>
                                
                                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-300 font-medium">Disponible pour de nouveaux projets</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MapPin className="text-purple-400" size={24} />
                            Ma localisation
                        </h2>
                        
                        <div className="rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                            <iframe
                                title="Localisation"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18394.408178834237!2d-7.578041622883153!3d33.53868804890426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63316b108b659%3A0x60b24f73eb53a9c0!2sSalmia%202%2C%20Casablanca!5e1!3m2!1sfr!2sma!4v1740438385790!5m2!1sfr!2sma"
                                width="100%"
                                height="400"
                                className="border-0"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;