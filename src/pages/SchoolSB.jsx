import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SchoolsCard from "../components/SchoolsCard";
import PageHeading from "../components/PageHeading";
import { generateBreadcrumbs } from "../utils/breadcrumbs";

const SchoolSB = () => {
  const location = useLocation();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const statsSectionRef = useRef(null);

  const stats = [
    { label: 'UNDERGRADUATE', value: 87, suffix: '%', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/book_16485020_1_.png' },
    { label: 'GRADUATE', value: 13, suffix: '%', color: '#336178', icon: 'https://www.ada.edu.az/media/2024/09/20/study_566985_3_1_.png' },
    { label: 'STUDENTS FROM COUNTRIES', value: 41, suffix: '', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/pandemic_2790625_1_1_.png' },
    { label: 'ALUMNI', value: 1534, suffix: '', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/employee_14641284_2_1_.png' },
    { label: 'MALE', value: 51, suffix: '%', color: '#336178', icon: 'https://www.ada.edu.az/media/2024/09/20/student_596717_1_.png' },
    { label: 'FEMALE', value: 49, suffix: '%', color: '#ae485e', icon: 'https://www.ada.edu.az/media/2024/09/20/graduated_1615715_2_-1.png' }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/sb_faculty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SB faculty");
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
        title="School of Business"
        imageSrc="https://www.ada.edu.az/assets/img/header/header_business.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />
      <section className="text-content pt-0 pb-0 mb-5">
        <div className="container">
          <div className="headline">
            <h2 className="title color-primary">School of Business</h2>
          </div>
          <p>
            The School of Business is founded in 2011 at ADA University. With
            core curricula focusing on both breadth and depth of knowledge,
            experiential learning, and a skill set necessary to succeed in the
            ever-changing labor market, we strive to be world-class business
            school. We prepare graduates who are ready to impact and challenge
            the boundaries of conventional thinking about the ways in which
            business is conducted and policy is formulated. Our graduates are
            entrepreneurs of innovative spirit with a solid sense of ethics,
            honor, and integrity.
          </p>
          <p>
            ADA University School of Business is ACBSP (Accreditation Council
            for Business Schools and Programs) member since November 2019. In
            March 2020, we reached the “candidacy” status, which means the
            accreditation process of our MBA and BBA programs officially
            started. ADA University School of Business BBA and MBA programs have
            been accredited by the Accreditation Council for Business Schools
            and Programs&nbsp;(ACBSP) in 2024.&nbsp;
          </p>
          <div className="rest-content active">
            <p style={{marginLeft: '0px'}}>
              ACBSP accreditation evaluates aspects of leadership, strategic
              planning, relationships with stakeholders, quality of academic
              programs, faculty credentials, and educational support to
              determine whether the business programs offer a rigorous
              educational experience and demonstrate continuous quality
              improvement.
            </p>
          </div>
          <p>
            The main purpose of this process is to provide external validation
            of our degree programs by benchmarking against a set of external
            quality standards. It provides reassurance both that the service
            meets the needs of customers, but also that it matches the quality
            that the market expects. Achieving accreditation will also help
            position our programs with external audiences and join a prestigious
            network of accredited business schools. Finally, data from the
            accreditation process can be used to support internal quality
            improvement, both for content and delivery of programs.
          </p>
          <p>
            <a href="/media/2025/02/13/student_achievement_results_1_.pdf">
              <strong>
                <u>
                  Check the Public disclosure of student achievement under ACBSP
                  standards.
                </u>
              </strong>
            </a>
          </p>
          <p>
            <strong>
              At ADA School of Business, we strive to cultivate highly educated,
              socially responsible and ethical citizens who can succeed in the
              local and global business environment. We strive to be the premier
              business school in the region, offering our students a high
              quality and innovative learning experience.
            </strong>
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
          <div className="col-md-6" style={{ marginBottom: '30px' }}>
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
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>Undergraduate</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/business-administration"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Business Administration <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/economics"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Economics <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Finance <i className="fa fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6" style={{ marginBottom: '30px' }}>
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
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>Graduate</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/mba"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    MBA <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/mba-in-finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    MBA in Finance <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/global-management-and-politics-gmap"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Global Management and Politics (GMAP) <i className="fa fa-chevron-right"></i>
                  </a>
                  <a 
                    href="https://www.ada.edu.az/en/schools/sb/programs/human-resource-management-hrm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.fontSize = '22px';
                      e.currentTarget.style.color = '#ffd700';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.fontSize = '20px';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Human Resource Management (HRM) <i className="fa fa-chevron-right"></i>
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
            src="https://www.ada.edu.az/media/2024/05/31/1to1_medium/huseyn_ismayilov.jpg"
            alt="Huseyn Ismayilov"
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
            color: '#333',
            fontStyle: 'italic',
            maxWidth: '800px',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            "At ADA School of Business, our goal is to equip students with the knowledge and skills required to succeed professionally anywhere in the world."
          </p>
          <h3 style={{
            fontSize: '28px',
            color: '#336178',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Huseyn Ismayilov</h3>
          <p style={{
            fontSize: '18px',
            color: '#666',
            margin: 0
          }}>Dean, School of Business</p>
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
            The School of Business faculty members are recognized experts in their fields and are dedicated to the study and practice of business and economics. They possess an extensive scholarship and wide-ranging real-world experience, which brings breadth and depth to classroom discussions.
          </p>
        </div>
        {(() => {
          const sevinjIndex = faculty.findIndex(member => member.name === 'Sevinj Mammadova');
          const facultyMembers = sevinjIndex >= 0 ? faculty.slice(0, sevinjIndex) : faculty;
          const staffMembers = sevinjIndex >= 0 ? faculty.slice(sevinjIndex) : [];
          
          return (
            <>
              <div className="row g-4" style={{ marginTop: '10px', justifyContent: facultyMembers.length % 4 !== 0 ? 'center' : 'flex-start' }}>
                {facultyMembers.map((member, index) => (
                  <div key={index} className="col-lg-6 col-xl-3">
                    <SchoolsCard
                      name={member.name}
                      role={member.role}
                      imageSrc={member.image_url}
                      department={member.department || "School of Business"}
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
                          department={member.department || "School of Business"}
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

export default SchoolSB;
