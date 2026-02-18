import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import NavBar from './components/navBar';
import Home from './components/home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';
import Background from './components/Background';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'catppuccin-latte');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'catppuccin-latte') return 'catppuccin-mocha';
      if (prev === 'catppuccin-mocha') return 'dracula';
      return 'catppuccin-latte';
    });
  };

  return (
    <div className="bg-theme-crust min-h-screen text-theme-text transition-colors duration-500">
      <Background theme={theme} />
      <NavBar theme={theme} toggleTheme={toggleTheme} />

      <div className="relative z-10">
        <Element name="home">
          <section id="home">
            <Home />
          </section>
        </Element>

        <Element name="about">
          <section id="about">
            <About />
          </section>
        </Element>

        <Element name="projects">
          <section id="projects" className="bg-theme-base/30">
            <Projects />
          </section>
        </Element>

        <Element name="skills">
          <section id="skills">
            <Skills />
          </section>
        </Element>

        <Element name="contact">
          <section id="contact" className="bg-theme-base/30">
            <Contact />
          </section>
        </Element>
      </div>
    </div>
  );
}

export default App;