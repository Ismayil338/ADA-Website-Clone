import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ news: [], programs: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.remove('dark-theme', 'high-contrast-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'high-contrast') {
      document.body.classList.add('high-contrast-theme');
    }
  }, []);

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'high-contrast';
    } else {
      newTheme = 'light';
    }
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.remove('dark-theme', 'high-contrast-theme');
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (newTheme === 'high-contrast') {
      document.body.classList.add('high-contrast-theme');
    }
  };

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const toggleMobileDropdown = (menuName) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
      setSearchResults({ news: [], programs: [] });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect with debounce
  };

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchResults({ news: [], programs: [] });
      return;
    }

    if (!searchQuery.trim()) {
      setSearchResults({ news: [], programs: [] });
      return;
    }

    const timeoutId = setTimeout(() => {
      const performSearch = async () => {
        setIsSearching(true);
        try {
          const [newsRes, programsRes] = await Promise.all([
            fetch('http://localhost:5000/news'),
            fetch('http://localhost:5000/programs')
          ]);

          const news = await newsRes.json();
          const programs = await programsRes.json();

          const query = searchQuery.toLowerCase();
          const filteredNews = news.filter(item => 
            item.title?.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query)
          ).slice(0, 5);

          const filteredPrograms = programs.filter(item =>
            item.title?.toLowerCase().includes(query) ||
            item.school_label?.toLowerCase().includes(query)
          ).slice(0, 5);

          setSearchResults({ news: filteredNews, programs: filteredPrograms });
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults({ news: [], programs: [] });
        } finally {
          setIsSearching(false);
        }
      };

      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isSearchOpen]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const menuItems = [
    {
      name: 'About',
      submenu: [
        { text: 'Leadership & Governance', href: '/en/about/leadership' },
        { text: 'ADA University', href: '/en/about/ada-university' },
        { text: 'Italy-Azerbaijan University', href: '/en/about/Italy-Azerbaijan-university' },
        { text: 'Accreditations and Rankings', href: '/en/about/accreditations-and-rankings' },
        { text: 'Campus', href: '/en/about/campus' },
        { text: 'Strategic Plan', href: '/en/about/strategic-plan' },
        { text: 'Honorary Degrees', href: '/en/about/honorary-degrees' }
      ]
    },
    {
      name: 'Admissions',
      submenu: [
        { text: 'Find your Program', href: '/en/admission/find-your-program' },
        { text: 'Undergraduate', href: '/en/admission/undergraduate' },
        { text: 'Graduate', href: '/en/admission/graduate' },
        { text: 'International', href: '/en/admission/international' },
        { text: 'Financial Aid', href: '/en/admission/financial-aid' },
        { text: 'Tuition and Costs', href: '/en/admission/tuition-costs' }
      ]
    },
    {
      name: 'Academics',
      submenu: [
        { text: 'Research', href: '/en/academics/research' },
        { text: 'Publications', href: '/en/publications' },
        { text: 'Core Competencies', href: '/en/academics/core-competencies' },
        { text: 'Academic Calendar', href: '/en/academics/academic-calendar' },
        { text: 'Policies', href: '/en/academics/policies' }
      ]
    },
    {
      name: 'Schools',
      submenu: [
        { text: 'College', href: '/en/schools/school-chs' },
        { text: 'Public & International Affairs', href: '/en/schools/spia' },
        { text: 'Business', href: '/en/schools/sb' },
        { text: 'IT & Engineering', href: '/en/schools/site' },
        { text: 'Education', href: '/en/schools/se' },
        { text: 'Law', href: '/en/schools/law' },
        { text: 'Agricultural & Food Sciences', href: '/en/schools/safs' },
        { text: 'Design & Architecture', href: '/en/schools/sda' },
        { text: 'Executive Education', href: '/en/schools/executive-education', target: '_blank' }
      ]
    },
    {
      name: 'ADA Experience',
      submenu: [
        { text: 'Student Life', href: '/en/experience/student-life' },
        { text: 'Exchange Programs', href: '/en/experience/exchange-programs' },
        { text: 'Career Services', href: '/en/experience/career-services' },
        { text: 'Alumni', href: '/en/experience/alumni-stories' },
        { text: 'Student Success', href: 'https://www.ada.edu.az/en/experience/sass', target: '_blank' }
      ]
    },
    {
      name: 'ADA School',
      submenu: [
        { text: 'ADA Primary School', href: '/en/ada-school/ada-primary-school', target: '_blank' },
        { text: 'ADA High School', href: '/en/ada-school/ada-high-school' }
      ]
    }
  ];

  const topNavLinks = [
    { text: 'Library', href: 'http://lib.ada.edu.az/', target: '_blank' },
    { text: 'Centers and Institutes', href: '/en/ada-centers' },
    { text: 'News & Events', href: '/en/news-and-events' },
    { text: 'ADA Foundation', href: 'https://adafund.az/', target: '_blank' },
    { text: 'Career@ADA', href: '/en/jobs' },
    { text: 'MyADA', href: 'https://experience.elluciancloud.ie/au433700/', target: '_blank' }
  ];

  return (
    <header className="header landing-header navbar-sticky uny-header">
      <div className="container-fluid" style={{ background: '#336178' }}>
        <div className="container">
          <div className="row position-relative">
            <div className="top-section col-12 d-none d-lg-flex">
              <div className="desctop-navbar-section">
                <nav className="navbar">
                  <ul className="navbar-nav uny-ul">
                    {topNavLinks.map((link, index) => (
                      <li key={index} className="uny-li">
                        <a href={link.href} target={link.target || undefined}>
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <a href="/en/apply/" target="_blank" className="nav-link hover-bg d-none-mob">
                <span>Apply Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container nav-container">
        <div className="row position-relative">
          <div className="col-md-2 col-logo">
            <div className="header-logo">
              <a href="/en/">
                <img src="https://www.ada.edu.az/assets/img/logo.svg" alt="ADA University Logo" />
              </a>
            </div>
          </div>

          <div className="col-md-9 header-nav-desctop">
            <div className="desctop-navbar-section">
              <nav className="navbar">
                <ul className="navbar-nav uny-ul">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className={`sub-menu uny-li ${activeDropdown === item.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="desctop-sub-btn">
                        <span>{item.name}</span>
                        <span>
                          <i className={`fa-solid ${activeDropdown === item.name ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </span>
                      </div>
                      {activeDropdown === item.name && (
                        <ul>
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a href={subItem.href} target={subItem.target || undefined}>
                                {subItem.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="col-md-1 col-lang">
            <div className="in-col-flex-end">
              <a 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
                style={{ 
                  cursor: 'pointer', 
                  color: '#292929', 
                  fontSize: '18px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  marginRight: '10px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  padding: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={
                  theme === 'light' 
                    ? 'Switch to dark mode' 
                    : theme === 'dark' 
                    ? 'Switch to high contrast mode' 
                    : 'Switch to light mode'
                }
              >
                <i className={
                  theme === 'light' 
                    ? 'fa-solid fa-moon' 
                    : theme === 'dark' 
                    ? 'fa-solid fa-adjust' 
                    : 'fa-solid fa-sun'
                }></i>
              </a>
              <div className={`header-search-icon ${isSearchOpen ? 'show' : ''}`}>
                <a className="search-btn" onClick={toggleSearch}>
                  <i className={isSearchOpen ? 'fa-solid fa-xmark' : 'fa fa-search'}></i>
                </a>
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        name="query" 
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        autoFocus
                      />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                    {(searchResults.news.length > 0 || searchResults.programs.length > 0) && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #e5e6e7',
                        borderTop: 'none',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        {searchResults.news.length > 0 && (
                          <div style={{ padding: '10px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>News</div>
                            {searchResults.news.map((item) => (
                              <a
                                key={item.id}
                                href={`/en/news/${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/en/news/${item.id}`);
                                  toggleSearch();
                                }}
                                style={{
                                  display: 'block',
                                  padding: '8px',
                                  textDecoration: 'none',
                                  color: '#292929',
                                  borderBottom: '1px solid #f0f0f0'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                {item.category && (
                                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{item.category}</div>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                        {searchResults.programs.length > 0 && (
                          <div style={{ padding: '10px', borderTop: searchResults.news.length > 0 ? '1px solid #e5e6e7' : 'none' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>Programs</div>
                            {searchResults.programs.map((item) => (
                              <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'block',
                                  padding: '8px',
                                  textDecoration: 'none',
                                  color: '#292929',
                                  borderBottom: '1px solid #f0f0f0'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                {item.school_label && (
                                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{item.school_label}</div>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {isSearching && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #e5e6e7',
                        borderTop: 'none',
                        padding: '10px',
                        textAlign: 'center',
                        color: '#666'
                      }}>
                        Searching...
                      </div>
                    )}
                  </div>
              </div>

              <div className="header-buttons">
                <div className="lang-dropdown">
                  <a className="switch" href="#" onClick={(e) => e.preventDefault()}>
                    <img src="/assets/img/flags/gb.svg" alt="English" />
                    EN
                  </a>
                  <div className="lang-dropdown-menu"></div>
                </div>
              </div>

              <div className={`header-nav header-nav-mobile ${isMobileMenuOpen ? 'open-nav' : ''}`}>
                <a href="javascript:;" className="onoff-nav-btn" onClick={(e) => { e.preventDefault(); toggleMobileMenu(); }}>
                  <span>MENU</span>
                  <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>
                <div className="navbar-section">
                  <div className="navbar-in-section">
                    <div className="search-container">
                      <form onSubmit={handleSearch}>
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          name="search" 
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                        />
                        <button type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
                      {(searchResults.news.length > 0 || searchResults.programs.length > 0) && (
                        <div style={{
                          marginTop: '10px',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          border: '1px solid #e5e6e7',
                          borderRadius: '4px'
                        }}>
                          {searchResults.news.length > 0 && (
                            <div style={{ padding: '10px' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>News</div>
                              {searchResults.news.map((item) => (
                                <a
                                  key={item.id}
                                  href={`/en/news/${item.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/en/news/${item.id}`);
                                    toggleMobileMenu();
                                    toggleSearch();
                                  }}
                                  style={{
                                    display: 'block',
                                    padding: '8px',
                                    textDecoration: 'none',
                                    color: '#292929',
                                    borderBottom: '1px solid #f0f0f0'
                                  }}
                                >
                                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                  {item.category && (
                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{item.category}</div>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                          {searchResults.programs.length > 0 && (
                            <div style={{ padding: '10px', borderTop: searchResults.news.length > 0 ? '1px solid #e5e6e7' : 'none' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>Programs</div>
                              {searchResults.programs.map((item) => (
                                <a
                                  key={item.id}
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'block',
                                    padding: '8px',
                                    textDecoration: 'none',
                                    color: '#292929',
                                    borderBottom: '1px solid #f0f0f0'
                                  }}
                                >
                                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                  {item.school_label && (
                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{item.school_label}</div>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <nav className="navbar">
                      <ul className="navbar-nav">
                        {menuItems.map((item, index) => (
                          <li
                            key={index}
                            className={`sub-menu ${mobileDropdowns[item.name] ? 'active' : ''}`}
                          >
                            <div
                              className="sub-btn"
                              onClick={() => toggleMobileDropdown(item.name)}
                            >
                              <span>{item.name}</span>
                              <span>
                                <i className={`fa-solid ${mobileDropdowns[item.name] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                              </span>
                            </div>
                            {mobileDropdowns[item.name] && (
                              <ul>
                                {item.submenu.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a
                                      href={subItem.href}
                                      target={subItem.target || undefined}
                                    >
                                      {subItem.text}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}

                        {topNavLinks.map((link, index) => (
                          <li key={`mobile-${index}`}>
                            <a href={link.href} target={link.target || undefined}>
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

