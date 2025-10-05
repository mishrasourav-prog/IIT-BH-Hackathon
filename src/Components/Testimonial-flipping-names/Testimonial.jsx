// CustomerFooter.jsx
import React, { useState, useEffect } from 'react';
import './Testimonial.css';

const Testimonial = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Multiple sets of company names (3 per row, 2 rows = 6 companies per set)
  const companySets = [
    [
      ['perplexity', 'SUPERCELL', 'monzo'],
      ['Raycast', 'Retool', 'MERCURY']
    ],
    [
      ['stripe', 'NOTION', 'figma'],
      ['linear', 'vercel', 'GITHUB']
    ],
    [
      ['slack', 'ZOOM', 'spotify'],
      ['dropbox', 'reddit', 'TWITCH']
    ],
    [
      ['discord', 'ADOBE', 'netflix'],
      ['airbnb', 'uber', 'LYFT']
    ]
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentSet((prev) => (prev + 1) % companySets.length);
          setIsTransitioning(false);
        }, 300);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isHovered, companySets.length]);

  return (
    <div className="footer-container">
      <div 
        className="footer-content"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Company Grid */}
        <div className="company-grid">
          {companySets[currentSet].map((row, rowIndex) => (
            <div key={rowIndex} className="company-row">
              {row.map((company, compIndex) => (
                <div
                  key={`${rowIndex}-${compIndex}-${currentSet}`}
                  className="company-item"
                  style={{
                    animation: isTransitioning 
                      ? `exitBlur 0.3s ease-in-out` 
                      : `enterBlur 0.5s ease-in-out ${rowIndex * 0.08}s`
                  }}
                >
                  <span 
                    className={`company-name ${
                      isHovered ? 'hovered' : ''
                    } ${
                      isTransitioning ? 'transitioning' : ''
                    }`}
                  >
                    {company}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* "Our Customers" Button Overlay */}
        <div className={`button-overlay ${isHovered ? 'visible' : 'hidden'}`}>
          <button className="customers-button">
            Our Customers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;