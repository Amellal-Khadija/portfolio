import React from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function Contact() {
    const sendEmail = (e) => {
        e.preventDefault();

        const serviceID = "service_9hegsr9";
        const templateID = "template_r4tud4s";
        const userID = "zeSAyUt2N4Tmzoy5Z";

        emailjs.sendForm(serviceID, templateID, e.target, userID)
            .then((result) => {
                alert("Message envoyé avec succès ! ✨");
            }, (error) => {
                alert("Une erreur s'est produite, veuillez réessayer.");
            });

        e.target.reset();
    };

    return (
        <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-peach/10 border border-theme-peach/20 text-theme-peach mb-6 shadow-sm">
                        <MessageCircle size={16} />
                        <span className="text-sm font-bold uppercase tracking-widest">Parlons de votre projet</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-theme-text mb-6">
                        Contactez <span className="text-theme-peach italic">-moi</span>
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-theme-peach to-theme-yellow mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12 shadow-2xl"
                    >
                        <form className="space-y-8" onSubmit={sendEmail}>
                            <div className="space-y-3">
                                <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-theme-subtext ml-2 flex items-center gap-2">
                                    <Sparkles size={14} className="text-theme-peach" /> Nom Complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-6 py-4 bg-theme-surface0/50 border border-theme-surface1 rounded-2xl text-theme-text placeholder-theme-surface1 focus:ring-2 focus:ring-theme-peach focus:border-transparent transition-all duration-300 outline-none font-medium"
                                    placeholder="Khadija Amellal"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-theme-subtext ml-2 flex items-center gap-2">
                                    <Mail size={14} className="text-theme-peach" /> Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-6 py-4 bg-theme-surface0/50 border border-theme-surface1 rounded-2xl text-theme-text placeholder-theme-surface1 focus:ring-2 focus:ring-theme-peach focus:border-transparent transition-all duration-300 outline-none font-medium"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-theme-subtext ml-2 flex items-center gap-2">
                                    <MessageCircle size={14} className="text-theme-peach" /> Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    className="w-full px-6 py-4 bg-theme-surface0/50 border border-theme-surface1 rounded-2xl text-theme-text placeholder-theme-surface1 focus:ring-2 focus:ring-theme-peach focus:border-transparent transition-all duration-300 outline-none resize-none font-medium"
                                    placeholder="Dites-m'en plus sur votre projet..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full cute-button py-5 text-xl bg-theme-peach text-theme-crust hover:bg-theme-yellow shadow-[0_10px_30px_rgba(var(--accent-peach),0.2)]"
                                style={{ background: 'var(--accent-peach)' }}
                            >
                                <Send size={24} />
                                Envoyer le message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="glass-card p-8 md:p-10 space-y-10">
                            <h3 className="text-3xl font-black text-theme-text uppercase tracking-tight">Informations</h3>

                            <div className="space-y-8">
                                {[
                                    { icon: Mail, label: 'Email', value: 'khadijaamellal51@gmail.com', color: 'text-theme-blue', bg: 'bg-theme-blue/10' },
                                    { icon: Phone, label: 'Téléphone', value: '06 07 08 94 51', color: 'text-theme-green', bg: 'bg-theme-green/10' },
                                    { icon: MapPin, label: 'Localisation', value: 'Casablanca, Maroc', color: 'text-theme-mauve', bg: 'bg-theme-mauve/10' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 group">
                                        <div className={`p-5 rounded-2xl ${item.bg} ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-theme-mauve uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                            <p className="text-xl text-theme-text font-bold leading-tight">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700">
                                <Sparkles size={120} className="text-theme-yellow" />
                            </div>
                            <h3 className="text-3xl font-black text-theme-text mb-6">Disponibilité</h3>
                            <p className="text-lg text-theme-subtext leading-relaxed mb-8 font-medium">
                                Je suis actuellement à la recherche de nouvelles opportunités pour mettre mon expertise à profit.
                                Discutons ensemble de vos besoins !
                            </p>
                            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-theme-green/10 border border-theme-green/20 shadow-inner">
                                <span className="relative flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-theme-green"></span>
                                </span>
                                <span className="text-theme-green font-black text-sm uppercase tracking-widest">Disponible immédiatement</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;