import React from 'react';
import './Test.css';
import Carousel from '../../Carousel-switch/Carousel';
import Striking from '../../Striking/Striking';



const Test = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Our Work</h2>
        <div className="contact-content">
          <div className="contact-info">
           <Carousel/>

            <Striking  />         
         
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default Test;  