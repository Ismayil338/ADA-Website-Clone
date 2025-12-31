import React from 'react';
import Hero from '../components/Hero';

const AboutADA = () => {
  const schools = [
    'School of Public and International Affairs',
    'School of Business',
    'School of IT and Engineering',
    'School of Education',
    'School of Law',
    'School of Agricultural and Food Sciences',
    'School of Design and Architecture'
  ];

  const coreValues = [
    'Academic excellence',
    'Accountability and shared governance',
    'Honor, integrity and transparency',
    'Diversity, collaboration and communication',
    'Social responsibility'
  ];

  return (
    <main className="page page-about">
      <Hero
        title="ADA University"
        description="A vision of the future brought to life"
        buttonText="Apply Now"
        imageSrc="https://www.ada.edu.az/static/images/hero-campus.jpg"
        breadcrumb={[
          { label: 'Home', link: '/en' },
          { label: 'About', link: null },
          { label: 'ADA University', link: null }
        ]}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-title mb-4" style={{ color: '#336178' }}>
              ADA University
            </h1>

            <section className="mb-5">
              <h2 className="mb-3" style={{ color: '#336178', fontSize: '32px' }}>
                Our Story
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                ADA University was established on January 13th, 2014, by the decree of President of the Republic of Azerbaijan. The University is a state higher education institution engaged in the delivery of undergraduate and graduate degree programs in addition to the advancement of research.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                The University is the legal heir of the Azerbaijan Diplomatic Academy (ADA) and Information Technologies University. They were merged in January 2014 to establish ADA University.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                Founded on March 6, 2006, the Azerbaijan Diplomatic Academy began offering an Advanced Foreign Service Program to diplomats of the Ministry of Foreign Affairs and civil servants in the government, as of January 2007. The Academy launched its first master degree in September 2009, followed by bachelor degrees in September 2011.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '20px' }}>
                In 2022, ADA University further expanded its operations through Italy-Azerbaijan University project. Established by a decree signed by President Ilham Aliyev, this new institution aims to strengthen knowledge exchange between Azerbaijan and Italy, promote innovation, and contribute to the economic development of our country.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3" style={{ color: '#336178', fontSize: '28px' }}>
                Mission
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929' }}>
                Our mission is to cultivate highly intellectual solution providers who are closely collaborating, efficiently communicating members of the global community, possessing ethics and a sense of citizenship.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3" style={{ color: '#336178', fontSize: '28px' }}>
                Vision
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929' }}>
                We continually strive to be a world-class university in Azerbaijan with the excellence of "müəllim and alim" embedded into an innovative learning culture.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3" style={{ color: '#336178', fontSize: '28px' }}>
                Core Values
              </h3>
              <ul style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', paddingLeft: '20px' }}>
                {coreValues.map((value, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    {value}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-5">
              <h3 className="mb-3" style={{ color: '#336178', fontSize: '28px' }}>
                Schools
              </h3>
              <ul style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', paddingLeft: '20px' }}>
                {schools.map((school, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    {school}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="col-lg-4">
            <div style={{ 
              position: 'sticky',
              top: '20px',
              alignSelf: 'flex-start'
            }}>
              <div className="card mb-4" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                  <h4 className="mb-3" style={{ color: '#336178' }}>Students</h4>
                  <div className="mb-3">
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ae485e', marginBottom: '5px' }}>
                      4,340
                    </div>
                    <div style={{ fontSize: '14px', color: '#7c889b' }}>students</div>
                  </div>
                  <div className="mb-3">
                    <div style={{ fontSize: '18px', color: '#292929', marginBottom: '5px' }}>
                      <strong>84%</strong> undergraduate
                    </div>
                    <div style={{ fontSize: '18px', color: '#292929', marginBottom: '5px' }}>
                      <strong>16%</strong> graduate
                    </div>
                    <div style={{ fontSize: '18px', color: '#292929', marginBottom: '5px' }}>
                      <strong>52%</strong> female
                    </div>
                    <div style={{ fontSize: '18px', color: '#292929' }}>
                      <strong>48%</strong> male
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                  <h4 className="mb-3" style={{ color: '#336178' }}>Alumni</h4>
                  <div className="mb-3">
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ae485e', marginBottom: '5px' }}>
                      2,500
                    </div>
                    <div style={{ fontSize: '14px', color: '#7c889b', marginBottom: '15px' }}>alumni in 48 countries</div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ae485e', marginBottom: '5px' }}>
                      4,442
                    </div>
                    <div style={{ fontSize: '14px', color: '#7c889b' }}>alumni of ADA University Executive Education</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                  <p style={{ fontSize: '16px', lineHeight: '24px', color: '#292929' }}>
                    With students, faculty, and staff from <strong>53 countries</strong> around the world, diversity illustrates one of our core values. International representation creates a stimulating environment and learning happens everywhere around us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5 pt-5" style={{ borderTop: '2px solid #e0e0e0' }}>
          <div className="row">
            <div className="col-lg-12">
              <h2 className="mb-4" style={{ color: '#336178', fontSize: '32px' }}>
                Our Brand
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '30px', color: '#292929', marginBottom: '30px' }}>
                ADA University is a vision of the future brought to life. Ours is a community of academic excellence, accountability, shared governance, honor, integrity, transparency, diversity, collaboration, communication and social responsibility that empowers individuals to challenge conventional thinking in pursuit of new ideas. Rallying around the ADA Flag, we uphold its symbols.
              </p>
              
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <div style={{ 
                    backgroundColor: '#336178', 
                    color: '#fff', 
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}>
                    <h5 style={{ marginBottom: '10px' }}>Blue</h5>
                    <p style={{ fontSize: '14px', margin: 0, color: '#fff' }}>
                      Blue in the ADA Flag stands for loyalty and communication. Our loyalty to core values has been rock solid. We communicate our story well and transmit our values among ourselves through the years.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div style={{ 
                    backgroundColor: '#fff', 
                    color: '#292929', 
                    padding: '20px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}>
                    <h5 style={{ marginBottom: '10px' }}>White</h5>
                    <p style={{ fontSize: '14px', margin: 0 }}>
                      White means purity of honor, integrity and transparency. We pledge to honor and live by honor. White also stands for the purity of mind, clean of prejudices, in search of knowledge and enlightenment.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div style={{ 
                    backgroundColor: '#ae485e', 
                    color: '#fff', 
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}>
                    <h5 style={{ marginBottom: '10px' }}>Red</h5>
                    <p style={{ fontSize: '14px', margin: 0, color: '#fff' }}>
                      Red symbolizes vibrancy, change, and innovation. ADA is a thriving locale. In this volcano of ideas and initiatives, we encourage minds to erupt. We challenge static thoughts. We conquer heights through continuous learning and restless innovation of selves.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mt-4">
                  <h5 className="mb-3" style={{ color: '#336178' }}>Primary Colors</h5>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div style={{ 
                        backgroundColor: '#336178', 
                        height: '80px',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>
                        Caspian Blue
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div style={{ 
                        backgroundColor: '#fff', 
                        height: '80px',
                        borderRadius: '4px',
                        border: '2px solid #e0e0e0',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#292929',
                        fontWeight: 'bold'
                      }}>
                        White
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div style={{ 
                        backgroundColor: '#ae485e', 
                        height: '80px',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>
                        Pomegranate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutADA;
