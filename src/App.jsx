

import React, { useState, useEffect } from 'react';

import Parallax from './Components/Parallex-scrolling/Parallax';
import Card from './Components/Cards/Card';
import Ripple from './Components/Ripple-effect/Ripple';
import Test from './Components/Miscellaneous/Testimonials/Test';
import Testimonial from './Components/Testimonial-flipping-names/Testimonial';

import './App.css';

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const towerOpacity = Math.max(0, 1 - scrollY / 1200);
  const towerTranslate = -scrollY * 0.3;
  const textOpacity = Math.max(0, 1 - scrollY / 800);
  const contentOpacity = Math.min(1, (scrollY - 800) / 500);

  return (
    <div className="app">
      {/* <Navbar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        scrollToSection={scrollToSection} 
      /> */}
      
      <Parallax 
        towerOpacity={towerOpacity}
        towerTranslate={towerTranslate}
        textOpacity={textOpacity}
        scrollToSection={scrollToSection}
      />
      
      <Card contentOpacity={contentOpacity} />
      
      <Ripple />
      
      <Test />
      
      {/* <ContactSection /> */}
      
      <Testimonial />
    </div>
  );
};

export default App;