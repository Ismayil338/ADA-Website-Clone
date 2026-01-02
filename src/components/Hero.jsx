import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, description, buttonText, imageSrc, breadcrumb }) => {
  return (
    <section className="section call-to-actions p-0" style={{ position: 'relative' }}>
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
      <div className="breadcrumb-container" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50px',
        backgroundColor: 'rgba(0, 51, 102, 0.5)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
        paddingRight: '15px'
      }}>
        {breadcrumb && (
          <div className="container">
            <div style={{ color: '#fff', fontSize: '16px' }}>
              {breadcrumb.map((item, index) => (
                <span key={index}>
                  {index > 0 && <span style={{ margin: '0 8px' }}> &gt; </span>}
                  {item.link ? (
                    <Link 
                      to={item.link} 
                      style={{ 
                        color: '#fff', 
                        textDecoration: 'none',
                        transition: 'opacity 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>{item.label}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;