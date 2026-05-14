import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const contactInfo = [
  {
    id: 'email',
    Icon: Mail,
    label: 'Email',
    value: 'khadijaamellal51@gmail.com',
    href: 'mailto:khadijaamellal51@gmail.com',
  },
  {
    id: 'phone',
    Icon: Phone,
    label: 'Téléphone',
    value: '06 07 08 94 51',
    href: 'tel:+212607089451',
  },
  {
    id: 'location',
    Icon: MapPin,
    label: 'Localisation',
    value: 'Casablanca, Maroc',
    href: null,
  },
];

function Contact() {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9hegsr9',
        'template_r4tud4s',
        e.target,
        'zeSAyUt2N4Tmzoy5Z'
      )
      .then(
        () => alert('Message envoyé avec succès !'),
        () => alert("Une erreur s'est produite, veuillez réessayer.")
      );
    e.target.reset();
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] py-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-indigo-400 text-xs font-semibold tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">
            Travaillons ensemble
          </h2>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter.
          </p>
          <div className="w-10 h-0.5 bg-indigo-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <h3 className="text-white font-semibold text-base mb-6 flex items-center gap-2">
                <Send size={16} className="text-indigo-400" />
                Envoyez-moi un message
              </h3>

              <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Décrivez votre projet..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <Send size={15} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Contact details */}
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <h3 className="text-white font-semibold text-base mb-5">Informations</h3>
              <div className="space-y-4">
                {contactInfo.map(({ id, Icon, label, value, href }) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-400/10 border border-indigo-400/20 flex-shrink-0">
                      <Icon size={15} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-zinc-200 hover:text-white transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-zinc-200">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <h3 className="text-white font-semibold text-base mb-3">Disponibilité</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Je suis actuellement disponible pour de nouveaux projets. Contactez-moi
                pour discuter de vos besoins.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">
                  Disponible pour de nouveaux projets
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
