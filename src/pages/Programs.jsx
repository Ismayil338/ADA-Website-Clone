import { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import Hero from '../components/Hero';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const programsPerPage = 12;

  const schools = [
    { name: 'SPIA', label: 'School of Public and International Affairs' },
    { name: 'SB', label: 'School of Business' },
    { name: 'SITE', label: 'School of IT and Engineering' },
    { name: 'SE', label: 'School of Education' },
    { name: 'LAW', label: 'School of Law' },
    { name: 'SAFS', label: 'School of Agricultural and Food Sciences' },
    { name: 'SDA', label: 'School of Design and Architecture' }
  ];

  const levels = [
    { name: 'Undergraduate', count: 0 },
    { name: 'Graduate', count: 0 }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/programs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch programs');
        return res.json();
      })
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getLevelCounts = () => {
    const counts = {};
    levels.forEach(level => {
      counts[level.name] = programs.filter(p => p.level === level.name).length;
    });
    return counts;
  };

  const getSchoolCounts = () => {
    const counts = {};
    schools.forEach(school => {
      counts[school.name] = programs.filter(p => p.school_label === school.name).length;
    });
    return counts;
  };

  const levelCounts = getLevelCounts();
  const schoolCounts = getSchoolCounts();

  const filteredPrograms = programs.filter(program => {
    const matchesSchool = !selectedSchool || program.school_label === selectedSchool;
    const matchesLevel = !selectedLevel || program.level === selectedLevel;
    return matchesSchool && matchesLevel;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSchool, selectedLevel]);

  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const startIndex = (currentPage - 1) * programsPerPage;
  const endIndex = startIndex + programsPerPage;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  const leftColumnPrograms = currentPrograms.slice(0, 6);
  const rightColumnPrograms = currentPrograms.slice(6, 12);

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          buttons.push(i);
        }
        buttons.push('...');
        buttons.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        buttons.push(1);
        buttons.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        buttons.push(1);
        buttons.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(i);
        }
        buttons.push('...');
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  if (loading) {
    return (
      <main className="page page-programs">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading programs...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page page-programs">
        <div className="container py-5 text-center text-danger">
          <h2>Error: {error}</h2>
          <p>Please make sure JSON-Server is running on port 5000</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-programs">
      <Hero
        title="Programs at ADA University"
        description="Explore our diverse range of undergraduate and graduate programs"
        buttonText="Apply Now"
        imageSrc="https://www.ada.edu.az/static/images/hero-campus.jpg"
        breadcrumb={[
          { label: 'Home', link: '/en' },
          { label: 'Admissions', link: null },
          { label: 'Find your Program', link: null }
        ]}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-title mb-4" style={{ color: '#003366' }}>
              Programs
            </h1>

            {filteredPrograms.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fa fa-info-circle me-2"></i>
                No programs found.
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6">
                    {leftColumnPrograms.map((program) => (
                      <div key={program.id} className="mb-4">
                        <ProgramCard
                          title={program.title}
                          schoolLabel={program.school_label}
                          level={program.level}
                          link={program.link}
                          dataName={program.title}
                          dataSchool={(program.school_label || '').toLowerCase()}
                          dataDegree={(program.level || '').toLowerCase()}
                          className="w-100"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="col-md-6">
                    {rightColumnPrograms.map((program) => (
                      <div key={program.id} className="mb-4">
                        <ProgramCard
                          title={program.title}
                          schoolLabel={program.school_label}
                          level={program.level}
                          link={program.link}
                          dataName={program.title}
                          dataSchool={(program.school_label || '').toLowerCase()}
                          dataDegree={(program.level || '').toLowerCase()}
                          className="w-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: currentPage === 1 ? '#ccc' : '#003366',
                        border: '1px solid #003366',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        opacity: currentPage === 1 ? 0.5 : 1
                      }}
                      disabled={currentPage === 1}
                      onMouseEnter={(e) => {
                        if (currentPage !== 1 && !e.target.disabled) {
                          e.target.style.backgroundColor = '#003366';
                          e.target.style.color = '#fff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== 1 && !e.target.disabled) {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#003366';
                        }
                      }}
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    >
                      &lt;
                    </button>

                    {getPaginationButtons().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2">
                            ...
                          </span>
                        );
                      }
                      
                      const isActive = currentPage === page;
                      const lightBlue = '#003366';
                      
                      return (
                        <button
                          key={page}
                          type="button"
                          className="btn"
                          style={{
                            width: '40px',
                            height: '40px',
                            padding: 0,
                            backgroundColor: isActive ? lightBlue : 'transparent',
                            color: isActive ? '#fff' : lightBlue,
                            border: `1px solid ${lightBlue}`,
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.target.style.backgroundColor = lightBlue;
                              e.target.style.color = '#fff';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = lightBlue;
                            }
                          }}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      className="btn"
                      style={{
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: currentPage === totalPages ? '#ccc' : '#003366',
                        border: '1px solid #003366',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        opacity: currentPage === totalPages ? 0.5 : 1
                      }}
                      disabled={currentPage === totalPages}
                      onMouseEnter={(e) => {
                        if (currentPage !== totalPages && !e.target.disabled) {
                          e.target.style.backgroundColor = '#003366';
                          e.target.style.color = '#fff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== totalPages && !e.target.disabled) {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#003366';
                        }
                      }}
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-lg-4">
            <div style={{ 
              position: 'sticky',
              top: '20px',
              alignSelf: 'flex-start'
            }}>
              <h3 className="mb-3" style={{ color: '#003366', paddingBottom: '10px', position: 'relative' }}>
                Filter by Level:
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '50%',
                  height: '2px',
                  backgroundColor: '#003366'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '50%',
                  height: '2px',
                  backgroundColor: '#e0e0e0'
                }}></div>
              </h3>
              <div className="d-flex flex-column gap-2 mb-4">
                {levels.map((level) => {
                  const count = levelCounts[level.name] || 0;
                  const isActive = selectedLevel === level.name;
                  
                  return (
                    <button
                      key={level.name}
                      type="button"
                      className="btn text-start"
                      style={{
                        backgroundColor: isActive ? '#dc3545' : 'transparent',
                        color: isActive ? '#fff' : '#000',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        padding: '10px 15px 10px 25px',
                        position: 'relative',
                        boxShadow: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#dc3545';
                          const dot = e.target.querySelector('.level-dot');
                          if (dot) {
                            dot.style.borderColor = '#dc3545';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#000';
                          const dot = e.target.querySelector('.level-dot');
                          if (dot) {
                            dot.style.borderColor = '#000';
                          }
                        }
                      }}
                      onClick={() => {
                        setSelectedLevel(isActive ? null : level.name);
                      }}
                    >
                      <span
                        className="level-dot"
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          border: `2px solid ${isActive ? '#fff' : '#000'}`,
                          backgroundColor: 'transparent',
                          transition: 'border-color 0.3s ease'
                        }}
                      />
                      {level.name} ({count})
                    </button>
                  );
                })}
              </div>

              <h3 className="mb-3" style={{ color: '#003366', paddingBottom: '10px', position: 'relative' }}>
                Filter by School:
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '50%',
                  height: '2px',
                  backgroundColor: '#003366'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '50%',
                  height: '2px',
                  backgroundColor: '#e0e0e0'
                }}></div>
              </h3>
              <div className="d-flex flex-column gap-2">
                {schools.map((school) => {
                  const count = schoolCounts[school.name] || 0;
                  const isActive = selectedSchool === school.name;
                  
                  return (
                    <button
                      key={school.name}
                      type="button"
                      className="btn text-start"
                      style={{
                        backgroundColor: isActive ? '#dc3545' : 'transparent',
                        color: isActive ? '#fff' : '#000',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        padding: '10px 15px 10px 25px',
                        position: 'relative',
                        boxShadow: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#dc3545';
                          const dot = e.target.querySelector('.school-dot');
                          if (dot) {
                            dot.style.borderColor = '#dc3545';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#000';
                          const dot = e.target.querySelector('.school-dot');
                          if (dot) {
                            dot.style.borderColor = '#000';
                          }
                        }
                      }}
                      onClick={() => {
                        setSelectedSchool(isActive ? null : school.name);
                      }}
                    >
                      <span
                        className="school-dot"
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          border: `2px solid ${isActive ? '#fff' : '#000'}`,
                          backgroundColor: 'transparent',
                          transition: 'border-color 0.3s ease'
                        }}
                      />
                      {school.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Programs;
