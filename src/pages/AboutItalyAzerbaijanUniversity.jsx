import React from 'react';
import Hero from '../components/Hero';

const AboutItalyAzerbaijanUniversity = () => {
  const partnerUniversities = [
    'Luiss University',
    'Bologna University',
    'Politecnico di Milano',
    'Politecnico di Torino',
    'Sapienza University of Rome'
  ];

  const schools = [
    'School of Agricultural and Food Sciences',
    'School of Design and Architecture'
  ];

  const degreePrograms = [
    'Agricultural and Food Systems Management',
    'Agricultural Technologies',
    'Animal Science',
    'Architecture',
    'Communication Design',
    'Electrical and Electronic Engineering',
    'Food Technologies',
    'Global Management and Politics',
    'Interior Design',
    'Urban Planning'
  ];

  const certificatePrograms = [
    'Agricultural and Food Sciences',
    'Design and Architecture'
  ];

  return (
    <main className="page page-about">
      <Hero
        title="Italy-Azerbaijan University"
        description="Strengthening knowledge exchange between Azerbaijan and Italy"
        buttonText="Apply Now"
        imageSrc="https://www.ada.edu.az/static/images/hero-campus.jpg"
        breadcrumb={[
          { label: 'Home', link: '/en' },
          { label: 'About', link: null },
          { label: 'Italy-Azerbaijan University', link: null }
        ]}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-title mb-4" style={{ color: '#336178' }}>
              Italy-Azerbaijan University
            </h1>

            <section className="mb-5">
              <h2 className="mb-3" style={{ color: '#336178', fontSize: '32px' }}>
                About Us
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                In 2022, ADA University further expanded its operations through Italy-Azerbaijan University project. Established by a decree signed by President Ilham Aliyev, this new institution aims to strengthen knowledge exchange between Azerbaijan and Italy, promote innovation, and contribute to the economic development of our country.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                The University was established in partnership with five leading Italian Universities, namely Luiss University, Bologna University, Politecnico di Milano, Politecnico di Torino and Sapienza University of Rome.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                The Italy-Azerbaijan University focuses on disciplines such as design and architecture, agriculture and food sciences, business and engineering, providing a platform for collaborative research, student exchanges, and joint degree programs.
              </p>
            </section>

            <section className="mb-5">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div style={{
                    backgroundColor: '#336178',
                    color: '#fff',
                    padding: '40px',
                    borderRadius: '8px',
                    height: '100%'
                  }}>
                    <h3 style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      color: '#fff'
                    }}>
                      Campus
                    </h3>
                    <p style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      color: '#fff',
                      margin: 0
                    }}>
                      Italy-Azerbaijan University is currently located on ADA University's modern Baku campus. Two new buildings are being built and will be ready by September 2025.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div style={{
                    backgroundColor: '#ae485e',
                    color: '#fff',
                    padding: '40px',
                    borderRadius: '8px',
                    height: '100%'
                  }}>
                    <h3 style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      color: '#fff'
                    }}>
                      Schools
                    </h3>
                    <p style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      color: '#fff',
                      margin: 0
                    }}>
                      We offer two Schools within Italy-Azerbaijan University: Agricultural and Food Sciences, Design and Architecture. In addition to the Schools, separate programs are offered within the School of Business and School of IT and Engineering of ADA University.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-5 pt-5" style={{ borderTop: '2px solid #e0e0e0' }}>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
                <h3 className="mb-4" style={{ color: '#336178', fontSize: '24px', fontWeight: 'bold' }}>
                  Partners
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {partnerUniversities.map((university, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <a 
                        href="#" 
                        style={{
                          color: '#0066cc',
                          textDecoration: 'none',
                          fontSize: '16px',
                          lineHeight: '24px'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {university}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h3 className="mb-4" style={{ color: '#336178', fontSize: '24px', fontWeight: 'bold' }}>
                  Degrees
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {degreePrograms.map((program, index) => (
                    <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ 
                        color: '#28a745', 
                        marginRight: '8px',
                        fontSize: '18px',
                        lineHeight: '24px'
                      }}>
                        ✓
                      </span>
                      <a 
                        href="#" 
                        style={{
                          color: '#0066cc',
                          textDecoration: 'none',
                          fontSize: '16px',
                          lineHeight: '24px',
                          flex: 1
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {program}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h3 className="mb-4" style={{ color: '#336178', fontSize: '24px', fontWeight: 'bold' }}>
                  Certificate Programs
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {certificatePrograms.map((program, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <a 
                        href="#" 
                        style={{
                          color: '#0066cc',
                          textDecoration: 'none',
                          fontSize: '16px',
                          lineHeight: '24px'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {program}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h3 className="mb-4" style={{ color: '#336178', fontSize: '24px', fontWeight: 'bold' }}>
                  Students
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: '10px',
                      fontSize: '20px'
                    }}>
                      👤
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                      286 students
                    </span>
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: '10px',
                      fontSize: '20px'
                    }}>
                      🎓
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                      70% undergraduate
                    </span>
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: '10px',
                      fontSize: '20px'
                    }}>
                      🎓
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                      30% graduate
                    </span>
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: '10px',
                      fontSize: '20px'
                    }}>
                      ♀
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                      60% female
                    </span>
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: '10px',
                      fontSize: '20px'
                    }}>
                      ♂
                    </span>
                    <span style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                      40% male
                    </span>
                  </li>
                </ul>
              </div>
            </div>
        </section>
      </div>
    </main>
  );
};

export default AboutItalyAzerbaijanUniversity;

