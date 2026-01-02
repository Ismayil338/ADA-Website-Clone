import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="page not-found-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="not-found-content">
              <h1 className="not-found-title">404</h1>
              <h2 className="not-found-heading">Oops! Page Not Found</h2>
              <p className="not-found-description">
                We're sorry, but the page you requested could not be found. 
                It may have been moved, deleted, or the URL may have been typed incorrectly.
              </p>
              <div className="not-found-actions">
                <Link to="/en" className="not-found-btn not-found-btn-primary">
                  Go to Homepage
                </Link>
                <Link to="/en/news" className="not-found-btn not-found-btn-secondary">
                  Browse News
                </Link>
                <Link to="/en/events" className="not-found-btn not-found-btn-secondary">
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

