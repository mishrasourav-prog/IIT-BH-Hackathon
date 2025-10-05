import React, { useState } from 'react';
import './Card.css';

const Card = ({ contentOpacity }) => {
  const [selectedCards, setSelectedCards] = useState([2]);

  const toggleCard = (index) => {
    setSelectedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const features = [
    {
      id: 0,
      name: 'Lightning Fast',
      icon: '🚀',
      color: '#10b981'
    },
    {
      id: 1,
      name: 'Modern Design',
      icon: '🎨',
      color: '#f59e0b'
    },
    {
      id: 2,
      name: 'Fully Responsive',
      icon: '📱',
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Secure & Reliable',
      icon: '🔒',
      color: '#8b5cf6'
    }
  ];

  return (
    <section 
      id="features" 
      className="card-section"
      style={{ opacity: contentOpacity }}
    >
      <div className="container">
        <h2 className="section-title">Brand Kits</h2>
        <div className="brand-kits-container">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="brand-kit-card"
              onClick={() => toggleCard(feature.id)}
            >
              <div className="brand-kit-content">
                <div className="brand-kit-left">
                  <div 
                    className={`checkbox ${selectedCards.includes(feature.id) ? 'checked' : ''}`}
                  >
                    {selectedCards.includes(feature.id) && (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="brand-icon-wrapper">
                    <div 
                      className="brand-icon"
                      style={{ backgroundColor: feature.color }}
                    >
                      <span>{feature.icon}</span>
                    </div>
                  </div>
                  <span className="brand-name">{feature.name}</span>
                </div>
                <button className="settings-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5h4M11 5h6M3 10h10M17 10h0M3 15h2M9 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8.5" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="15.5" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="6.5" cy="15" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;