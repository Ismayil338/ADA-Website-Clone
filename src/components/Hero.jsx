import React from 'react';

const Hero = ({ title, description, buttonText, imageSrc }) => {
  return (
    <section className="section call-to-actions p-0">
      <div className="image-bg-box">
        <img 
          src={imageSrc || "https://www.ada.edu.az/static/images/hero-campus.jpg"} 
          alt="ADA Campus" 
          className="img-bg" 
        />
        <img 
          src={imageSrc || "https://www.ada.edu.az/static/images/hero-campus.jpg"} 
          alt="ADA Campus Mobile" 
          className="img-bg --mobile" 
        />
      </div>
      
      <div className="container position-relative py-5">
        <div className="row">
          <div className="col-lg-8 col-md-10 content-call-to-actions py-5">
            <h1 className="title text-white fw-bold mb-4">
              {title || "Leading Innovation and Responsible Citizenship"}
            </h1>
            <p className="description text-white mb-4" style={{ fontSize: '22px', lineHeight: '40px' }}>
              {description || "Welcome to ADA University, where we cultivate the next generation of global leaders."}
            </p>
            <div className="col-lg-4 p-0">
               <button className="btn btn-o text-white border-white w-100">
                 {buttonText || "Learn More"}
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;