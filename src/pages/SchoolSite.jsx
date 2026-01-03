import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SchoolsCard from "../components/SchoolsCard";
import PageHeading from "../components/PageHeading";
import { generateBreadcrumbs } from "../utils/breadcrumbs";

const SchoolSite = () => {
  const location = useLocation();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const statsSectionRef = useRef(null);

  const stats = [
    { label: 'UNDERGRADUATE', value: 93, suffix: '%', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/book_16485020_1_.png' },
    { label: 'GRADUATE', value: 7, suffix: '%', color: '#336178', icon: 'https://www.ada.edu.az/media/2024/09/20/study_566985_3_1_.png' },
    { label: 'STUDENTS FROM COUNTRIES', value: 39, suffix: '', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/pandemic_2790625_1_1_.png' },
    { label: 'ALUMNI', value: 543, suffix: '', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/employee_14641284_2_1_.png' },
    { label: 'MALE', value: 68, suffix: '%', color: '#336178', icon: 'https://www.ada.edu.az/media/2024/09/20/student_596717_1_.png' },
    { label: 'FEMALE', value: 32, suffix: '%', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/graduated_1615715_2_-1.png' }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/site_faculty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SITE faculty");
        return res.json();
      })
      .then((data) => {
        setFaculty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (statsAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);

            const duration = 1500;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              const newValues = {};
              stats.forEach((stat, index) => {
                newValues[index] = Math.floor(progress * stat.value);
              });
              setAnimatedValues(newValues);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                const finalValues = {};
                stats.forEach((stat, index) => {
                  finalValues[index] = stat.value;
                });
                setAnimatedValues(finalValues);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [statsAnimated, stats]);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="container py-5 text-center text-danger">
        <h2>Error: {error}</h2>
      </div>
    );

  return (
    <main className="page">
      <PageHeading
        title="School Of Information Technologies And Engineering"
        imageSrc="https://www.ada.edu.az/assets/img/header/header_it.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />
      <section className="text-content pt-0 pb-0 mb-5">
        <div className="container">
          <div className="headline">
            <h2 className="title color-primary">School of IT and Engineering</h2>
          </div>
          <p>
            The School of Information Technologies and Engineering (SITE) was
            founded in 2013. IT was founded with a vision to become a center of
            excellence in education and a hub of scientific research and
            discovery of global caliber in the region. Our mission is to produce
            highly intellectual solution providers with innovative and creative
            minds and enhanced communication skills who will give back to
            society by finding and designing new ways in which cutting edge
            technology will improve lives. We strive to create a thriving
            environment, which encourages gender inclusivity, where education,
            research and industry meet and melt into practical applications
            through our initiatives in Big Data research, applications of
            Artificial Intelligence, and techno-entrepreneurship.
          </p>
        </div>
      </section>
      
      <div className="container py-5" ref={statsSectionRef}>
        <div className="row" style={{ marginBottom: '5px' }}>
          {stats.map((stat, index) => {
            const filterColor = stat.color === '#ae485e' 
              ? 'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1352%) hue-rotate(315deg) brightness(92%) contrast(88%)'
              : 'brightness(0) saturate(100%) invert(24%) sepia(47%) saturate(1234%) hue-rotate(169deg) brightness(95%) contrast(88%)';
            
            return (
              <div key={index} className="col-md-4" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <img 
                    src={stat.icon} 
                    alt={stat.label} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      filter: filterColor
                    }} 
                  />
                  <span style={{ fontSize: '80px', fontWeight: 'bold', color: stat.color, lineHeight: '80px' }}>
                    {animatedValues[index] !== undefined ? animatedValues[index] : stat.value}{stat.suffix}
                  </span>
                </div>
                <div style={{ 
                  height: '2px', 
                  backgroundColor: stat.color, 
                  width: '85%',
                  marginTop: '10px'
                }}></div>
                <div style={{ marginTop: '15px', fontSize: '20px', fontWeight: '600', textTransform: 'uppercase', color: stat.color }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container py-5">
        <div className="headline" style={{ marginBottom: '30px', marginTop: '10px' }}>
          <h2 className="title color-primary">Programs</h2>
        </div>
        <div className="row" style={{ marginBottom: '50px' }}>
          <div className="col-md-4" style={{ marginBottom: '30px' }}>
            <div style={{
              position: 'relative',
              height: '400px',
              backgroundImage: 'url(https://www.ada.edu.az/assets/img/content/program1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(51, 97, 120, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '40px',
                paddingTop: '60px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  textAlign: 'center',
                  marginTop: 0
                }}>Undergraduate</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/computer-science"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Computer Science <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/computer-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Computer Engineering <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/information-technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Information Technology <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/mathematics"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Mathematics <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/electrical-and-electronics-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Electrical and Electronics Engineering <i className="fa fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4" style={{ marginBottom: '30px' }}>
            <div style={{
              position: 'relative',
              height: '400px',
              backgroundImage: 'url(https://www.ada.edu.az/assets/img/content/program2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(174, 72, 94, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '40px',
                paddingTop: '60px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textAlign: 'center',
                  marginTop: 0
                }}>Graduate</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/computer-science-and-data-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Computer Science and Data Analytics <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/electrical-and-power-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Electrical and Power Engineering <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs/computer-engineering-and-high-performance-computing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Computer Engineering and High Performance Computing <i className="fa fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4" style={{ marginBottom: '30px' }}>
            <div style={{
              position: 'relative',
              height: '400px',
              backgroundImage: 'url(https://www.ada.edu.az/assets/img/content/program1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(51, 97, 120, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '40px',
                paddingTop: '60px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textAlign: 'center',
                  marginTop: 0
                }}>PhD</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <a 
                    href="https://www.ada.edu.az/en/schools/site/programs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '18px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '16px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    PhD Programs <i className="fa fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '60px 40px',
          marginBottom: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <img 
            src="https://www.ada.edu.az/media/2024/05/31/1to1_medium/abzatdin_adamov.jpg"
            alt="Abzatdin Adamov"
            style={{
              width: '280px',
              height: '280px',
              objectFit: 'cover',
              marginBottom: '30px',
              border: '4px solid #fff',
              borderTop: '8px solid #fff',
              boxShadow: '0 0 0 2px #fff, 0 0 30px rgba(255, 255, 255, 0.9), 0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <p style={{
            fontSize: '24px',
            color: '#000',
            fontStyle: 'italic',
            maxWidth: '800px',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            "To be the next World changers, engineering students must grasp certain fundamental knowledge in their primary field understanding essential concepts and how they work together. When the next Big Thing comes (AI, IoT, Big Data, Blockchain, etc.), it will not be just buzzword to chase, instead they will understand all technical implications behind and its real value."
          </p>
          <h3 style={{
            fontSize: '28px',
            color: '#336178',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Abzatdin Adamov</h3>
          <p style={{
            fontSize: '18px',
            color: '#666',
            margin: 0
          }}>Dean</p>
        </div>
        
      </div>

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div style={{ marginBottom: '15px' }}>
          <div className="headline" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ flex: '1', height: '2px', background: 'linear-gradient(to right, rgba(51, 97, 120, 0), rgba(51, 97, 120, 1))', marginRight: '20px' }}></div>
            <h2 className="title color-primary" style={{ margin: 0, whiteSpace: 'nowrap' }}>Meet Our Faculty</h2>
            <div style={{ flex: '1', height: '2px', background: 'linear-gradient(to left, rgba(51, 97, 120, 0), rgba(51, 97, 120, 1))', marginLeft: '20px' }}></div>
          </div>
          <p style={{
            fontSize: '18px',
            color: '#000',
            lineHeight: '1.8',
            textAlign: 'left',
            paddingLeft: '15px',
            paddingRight: '15px'
          }}>
            The School of it faculty members are recognized experts in their fields and are dedicated to the study and practice of it and economics. They possess an extensive scholarship and wide-ranging real-world experience, which brings breadth and depth to classroom discussions.
          </p>
        </div>
        {(() => {
          const aydanIndex = faculty.findIndex(member => member.name === 'Aydan Aghayeva');
          const facultyMembers = aydanIndex >= 0 ? faculty.slice(0, aydanIndex) : faculty;
          const staffMembers = aydanIndex >= 0 ? faculty.slice(aydanIndex) : [];
          
          return (
            <>
              <div className="row g-4" style={{ marginTop: '10px', justifyContent: facultyMembers.length % 4 !== 0 ? 'center' : 'flex-start' }}>
                {facultyMembers.map((member, index) => (
                  <div key={index} className="col-lg-6 col-xl-3">
                    <SchoolsCard
                      name={member.name}
                      role={member.role}
                      imageSrc={member.image_url}
                      department={member.department || "School of IT and Engineering"}
                      profileUrl={member.profile_url}
                    />
                  </div>
                ))}
              </div>
              
              {staffMembers.length > 0 && (
                <>
                  <div style={{ marginTop: '60px', marginBottom: '15px' }}>
                    <div className="headline" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', width: '100%' }}>
                      <div style={{ flex: '1', height: '2px', background: 'linear-gradient(to right, rgba(51, 97, 120, 0), rgba(51, 97, 120, 1))', marginRight: '20px' }}></div>
                      <h2 className="title color-primary" style={{ margin: 0, whiteSpace: 'nowrap' }}>Staff Members</h2>
                      <div style={{ flex: '1', height: '2px', background: 'linear-gradient(to left, rgba(51, 97, 120, 0), rgba(51, 97, 120, 1))', marginLeft: '20px' }}></div>
                    </div>
                  </div>
                  <div className="row g-4" style={{ marginTop: '10px', justifyContent: staffMembers.length % 4 !== 0 ? 'center' : 'flex-start' }}>
                    {staffMembers.map((member, index) => (
            <div key={index} className="col-lg-6 col-xl-3">
              <SchoolsCard
                name={member.name}
                role={member.role}
                imageSrc={member.image_url}
                department={member.department || "School of IT and Engineering"}
                profileUrl={member.profile_url}
              />
            </div>
          ))}
        </div>
                </>
              )}
            </>
          );
        })()}
      </div>
    </main>
  );
};

export default SchoolSite;
