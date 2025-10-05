import React, { useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [hoveredCards, setHoveredCards] = useState({});

  const products = [
    {
      id: 1,
      name: 'Luxury Skincare Set',
      defaultColor: 'rose',
      hoverColor: 'rose-dark',
    },
    {
      id: 2,
      name: 'Premium Cosmetics',
      defaultColor: 'amber',
      hoverColor: 'amber-dark',
    }
  ];

  const handleMouseEnter = (id) => {
    setHoveredCards(prev => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoveredCards(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-header">
          <span className="carousel-subtitle">Carousel Switch</span>
          <h2 className="carousel-title">Our Collections</h2>
        </div>
        
        <div className="carousel-scroll">
          {products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
              className="product-card"
            >
              <div 
                className={`product-card-content ${
                  hoveredCards[product.id] ? product.hoverColor : product.defaultColor
                }`}
              >
                <div className="product-info">
                  <span className="product-badge">NEW</span>
                  <h3 className="product-name">{product.name}</h3>
                </div>
                
                <div className={`add-to-bag-wrapper ${hoveredCards[product.id] ? 'visible' : ''}`}>
                  <button className="add-to-bag-btn">Add to Bag</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;