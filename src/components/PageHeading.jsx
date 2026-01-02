import React from 'react';
import { Link } from 'react-router-dom';

const PageHeading = ({ title, imageSrc, breadcrumb }) => {
  return (
    <section className="page-heading-content mb-5" data-cid="603">
      {imageSrc && (
        <img 
          className="bg-image" 
          src={imageSrc} 
          alt={title || "Page heading"} 
        />
      )}
      <div className="heading-content">
        <div className="container title">
          <h1>{title || "Find your Program"}</h1>
        </div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="breadcrumb">
            <div className="container">
              <ul>
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={index}>
                      {item.link ? (
                        <Link to={item.link} className={isLast ? 'active' : ''}>
                          {item.label}
                          {!isLast && (
                            <i className="fa fa-chevron-right"></i>
                          )}
                        </Link>
                      ) : (
                        <span className={isLast ? 'active' : ''}>
                          {item.label}
                          {!isLast && (
                            <i className="fa fa-chevron-right"></i>
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeading;

