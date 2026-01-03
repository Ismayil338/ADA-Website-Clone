import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const Programs = () => {
  const location = useLocation();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const programsPerPage = 12;

  const schools = [
    { name: 'CHS', label: 'School of College of Humanities and Sciences (CHS)' },
    { name: 'SPIA', label: 'School of Public and International Affairs (SPIA)' },
    { name: 'SB', label: 'School of Business (SB)' },
    { name: 'SITE', label: 'School of IT and Engineering (SITE)' },
    { name: 'SE', label: 'School of Education (SE)' },
    { name: 'LAW', label: 'School of Law (LAW)' },
    { name: 'SAFS', label: 'School of Agricultural and Food Sciences (SAFS)' },
    { name: 'SDA', label: 'School of Design and Architecture (SDA)' }
  ];

  const levels = [
    { name: 'Undergraduate' },
    { name: 'Graduate' },
    { name: 'PhD' },
    { name: 'Non-degree' },
    { name: 'Advanced Foreign Services Program' },
    { name: 'Certificate Programs for Internationals' },
    { name: 'Custom Programs' },
    { name: 'Open Enrollment Programs' },
    { name: 'Academic Foundation' },
    { name: 'English for Academic and Professional Purposes (EAPP)' }
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
    const matchesSchool = selectedSchools.length === 0 || selectedSchools.includes(program.school_label);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(program.level);
    const matchesSearch = !searchQuery || 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (program.school_label && program.school_label.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (program.level && program.level.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSchool && matchesLevel && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSchools, selectedLevels, searchQuery]);

  const handleSchoolToggle = (schoolName) => {
    setSelectedSchools(prev => 
      prev.includes(schoolName) 
        ? prev.filter(s => s !== schoolName)
        : [...prev, schoolName]
    );
  };

  const handleLevelToggle = (levelName) => {
    setSelectedLevels(prev => 
      prev.includes(levelName) 
        ? prev.filter(l => l !== levelName)
        : [...prev, levelName]
    );
  };

  const handleReset = () => {
    setSelectedSchools([]);
    setSelectedLevels([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const startIndex = (currentPage - 1) * programsPerPage;
  const endIndex = startIndex + programsPerPage;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  const leftColumnPrograms = currentPrograms.filter((_, index) => index % 2 === 0);
  const rightColumnPrograms = currentPrograms.filter((_, index) => index % 2 === 1);

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
      <PageHeading
        title="Find Your Program"
        imageSrc="https://www.ada.edu.az/media/2024/07/29/find_your_program_2.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div style={{ 
              position: 'sticky',
              top: '20px',
              alignSelf: 'flex-start'
            }}>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#003366', 
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  Narrow Your Results
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#003366',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="fa fa-refresh" style={{ fontSize: '12px' }}></i>
                  RESET
                </button>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ 
                  color: '#003366', 
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  Search
                </h4>
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ 
                  color: '#003366', 
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Degree
                  <i className="fa fa-chevron-down" style={{ fontSize: '12px' }}></i>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {levels.map((level) => {
                    const count = levelCounts[level.name] || 0;
                    const isChecked = selectedLevels.includes(level.name);
                    
                    return (
                      <label
                        key={level.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: '5px',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                          if (checkbox) {
                            checkbox.style.accentColor = '#ae485e';
                            checkbox.style.transform = 'scale(1.2)';
                            checkbox.style.boxShadow = '0 0 8px rgba(51, 97, 120, 0.6)';
                            checkbox.style.transition = 'all 0.3s ease';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                          if (checkbox) {
                            checkbox.style.accentColor = '';
                            checkbox.style.transform = 'scale(1)';
                            checkbox.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleLevelToggle(level.name)}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <span>{level.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 style={{ 
                  color: '#003366', 
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Schools
                  <i className="fa fa-chevron-down" style={{ fontSize: '12px' }}></i>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {schools.map((school) => {
                    const count = schoolCounts[school.name] || 0;
                    const isChecked = selectedSchools.includes(school.name);
                    
                    return (
                      <label
                        key={school.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: '5px',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                          if (checkbox) {
                            checkbox.style.accentColor = '#ae485e';
                            checkbox.style.transform = 'scale(1.2)';
                            checkbox.style.boxShadow = '0 0 8px rgba(51, 97, 120, 0.6)';
                            checkbox.style.transition = 'all 0.3s ease';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                          if (checkbox) {
                            checkbox.style.accentColor = '';
                            checkbox.style.transform = 'scale(1)';
                            checkbox.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSchoolToggle(school.name)}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <span>{school.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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
                          id={program.id}
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
                          id={program.id}
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
        </div>
      </div>
    </main>
  );
};

export default Programs;
