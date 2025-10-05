import React from 'react';
import './Parallax.css';

const Parallax = ({ towerOpacity, towerTranslate, textOpacity, scrollToSection }) => {
  return (
    <section id="home" className="hero-section">
      <div 
        className="parallax-bg"
        style={{
          transform: `translateY(${towerTranslate}px)`,
          opacity: towerOpacity
        }}
      >
        <div className="mountain-range">
          <div className="mountain mountain-back"></div>
          <div className="mountain mountain-main"></div>
          <div className="mountain mountain-front"></div>
          <div className="mountain mountain-front-right"></div>
        </div>
        <div className="snow"></div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="eiffel-tower">
          <div className="tower-top"></div>
          <div className="tower-upper"></div>
          <div className="tower-middle"></div>
          <div className="tower-lower"></div>
          <div className="tower-base"></div>
          <div className="light light-1"></div>
          <div className="light light-2"></div>
          <div className="light light-3"></div>
          <div className="light light-4"></div>
        </div>
        <div className="stars"></div>
        <div className="stars2"></div>
      </div>

      <div 
        className="hero-content"
        style={{ opacity: textOpacity }}
      >
        <h1 className="hero-title">
          Take your site to<br />
          <span className="gradient-text">new heights.</span>
        </h1>
        <p className="hero-subtitle">Experience excellence beyond boundaries</p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('features')}
          >
            Explore Features
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Parallax;