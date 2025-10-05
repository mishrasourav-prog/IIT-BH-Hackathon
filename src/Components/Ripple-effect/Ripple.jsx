import React, { useState } from 'react';
import './Ripple.css';

const Ripple = () => {
  const [waterEffects, setWaterEffects] = useState({});

  const createWaterRipple = (e, itemId) => {
    const item = e.currentTarget;
    const bounds = item.getBoundingClientRect();
    const xPos = e.clientX - bounds.left;
    const yPos = e.clientY - bounds.top;

    const effectId = Date.now() + Math.random();
    setWaterEffects(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), { id: effectId, x: xPos, y: yPos }]
    }));

    setTimeout(() => {
      setWaterEffects(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || []).filter(r => r.id !== effectId)
      }));
    }, 1200);
  };

  const servicesList = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Custom websites built with the latest technologies and frameworks.'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love to interact with.'
    },
    {
      id: 'digital',
      title: 'Digital Strategy',
      description: 'Comprehensive planning to achieve your business goals online.'
    }
  ];

  return (
    <section className="water-ripple-section">
      <div className="services-wrapper">
        <h2 className="main-heading">Our Services</h2>
        <div className="service-cards-grid">
          {servicesList.map((service) => (
            <div 
              key={service.id}
              className="interactive-card"
              onMouseMove={(e) => createWaterRipple(e, service.id)}
            >
              <div className="water-effect-layer">
                {(waterEffects[service.id] || []).map((effect) => (
                  <span
                    key={effect.id}
                    className="water-wave"
                    style={{
                      left: `${effect.x}px`,
                      top: `${effect.y}px`,
                    }}
                  />
                ))}
              </div>
              <h3 className="card-heading">{service.title}</h3>
              <p className="card-text">{service.description}</p>
              <button className="action-button">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ripple;