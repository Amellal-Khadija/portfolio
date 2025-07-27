import React from 'react';
import { Element } from 'react-scroll';
import NavBar from './components/navBar';
import Home from './components/home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';

function App() {
  return (
    <div className="bg-gray-900 scroll-smooth">
      <NavBar />
      
      {/* Ajout d'un padding-top pour compenser la navbar fixe */}
      <div className="pt-16">
        <Element name="home" className="border-b border-gray-700/50">
          <section id="home">
            <Home />
          </section>
        </Element>

        <Element name="about" className="border-b border-gray-700/50">
          <section id="about">
            <About />
          </section>
        </Element>

        <Element name="projects" className="border-b border-gray-700/50">
          <section id="projects">
            <Projects />
          </section>
        </Element>

        <Element name="skills" className="border-b border-gray-700/50">
          <section id="skills">
            <Skills />
          </section>
        </Element>

        <Element name="contact">
          <section id="contact">
            <Contact />
          </section>
        </Element>
      </div>
    </div>
  );
}

export default App;