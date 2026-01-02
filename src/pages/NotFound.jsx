import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="page">
      <PageHeading
        title="404 - Page Not Found"
        imageSrc="https://www.ada.edu.az/static/images/hero-campus.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname, '404 - Page Not Found')}
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 style={{ color: '#003366', marginBottom: '20px' }}>Oops! Page Not Found</h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
              We're sorry, but the page you requested could not be found. 
              It may have been moved, deleted, or the URL may have been typed incorrectly.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/en" 
                className="btn"
                style={{
                  backgroundColor: '#336178',
                  color: '#fff',
                  padding: '12px 30px',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ae485e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#336178'}
              >
                Go to Homepage
              </Link>
              <Link 
                to="/en/news" 
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#336178',
                  border: '2px solid #336178',
                  padding: '12px 30px',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#336178';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#336178';
                }}
              >
                Browse News
              </Link>
              <Link 
                to="/en/events" 
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#336178',
                  border: '2px solid #336178',
                  padding: '12px 30px',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#336178';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#336178';
                }}
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

