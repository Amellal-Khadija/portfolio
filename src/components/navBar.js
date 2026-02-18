import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Moon, Sun, Palette, Coffee } from 'lucide-react';

const NavBar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', to: 'home' },
    { name: 'À propos', to: 'about' },
    { name: 'Projets', to: 'projects' },
    { name: 'Compétences', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  const getThemeIcon = () => {
    if (theme === 'catppuccin-latte') return <Coffee size={20} />;
    if (theme === 'catppuccin-mocha') return <Moon size={20} />;
    return <Sun size={20} />; // Dracula or default
  };

  const getThemeName = () => {
    if (theme === 'catppuccin-latte') return 'Latte';
    if (theme === 'catppuccin-mocha') return 'Mocha';
    return 'Dracula';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-theme-crust/80 backdrop-blur-xl border-b border-theme-surface0 py-2 shadow-lg' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="home" smooth={true} duration={500} className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 bg-gradient-to-br from-theme-mauve to-theme-pink rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Rocket size={24} className="text-theme-base" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-theme-mauve to-theme-pink bg-clip-text text-transparent">
              Khadija.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="text-theme-text font-bold hover:text-theme-mauve cursor-pointer transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-mauve transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-2xl bg-theme-surface0 text-theme-mauve hover:bg-theme-surface1 transition-all duration-300 group shadow-lg flex items-center gap-2 border border-theme-surface1/50"
              aria-label="Toggle Theme"
            >
              <div className="transition-transform group-hover:rotate-12">
                {getThemeIcon()}
              </div>
              <span className="text-xs font-black uppercase tracking-widest">{getThemeName()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-theme-surface0 text-theme-mauve"
            >
              {getThemeIcon()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-theme-text hover:text-theme-mauve transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-theme-crust border-b border-theme-surface0 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-bold text-theme-text hover:text-theme-mauve transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;