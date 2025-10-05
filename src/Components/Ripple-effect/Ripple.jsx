import React, { useState } from 'react';
import './Ripple.css';

const Ripple = () => {
  const [ripples, setRipples] = useState({});

  const createRipple = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rippleId = Date.now();
    setRipples(prev => ({
      ...prev,
      [cardId]: [...(prev[cardId] || []), { id: rippleId, x, y }]
    }));

    setTimeout(() => {
      setRipples(prev => ({
        ...prev,
        [cardId]: (prev[cardId] || []).filter(r => r.id !== rippleId)
      }));
    }, 800);
  };

  const services = [
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
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id}
              className="service-card"
              onMouseMove={(e) => createRipple(e, service.id)}
            >
              <div className="ripple-container">
                {(ripples[service.id] || []).map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                    }}
                  />
                ))}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="btn btn-outline">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ripple;