import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';
import PageHeading from '../components/PageHeading';
import Pagination from '../components/Pagination';
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

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Programs;
