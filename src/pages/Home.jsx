import React from 'react';
import Hero from '../components/Hero';

const Home = () => (
  <main className="page page-home">
    <Hero 
      title="Leading Innovation and Responsible Citizenship"
      description="ADA University is a vision of the future brought to life."
      buttonText="ADMISSIONS"
      imageSrc="https://www.ada.edu.az/static/images/hero-campus.jpg" 
    />

    <div className="container py-5">
      <h1>ADA University</h1>
      <p>Welcome to the ADA University website.</p>
    </div>
  </main>
);

export default Home;