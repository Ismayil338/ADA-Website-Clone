import { useState } from 'react';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});

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
              <div className="header-search-icon">
                <a className="search-btn" onClick={toggleSearch}>
                  <i className="fa fa-search"></i>
                </a>
                {isSearchOpen && (
                  <div className="search-container">
                    <form action="https://www.ada.edu.az/en/search">
                      <input type="text" placeholder="Search..." name="query" />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                      <button type="button" onClick={toggleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#333', marginLeft: '5px' }}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </form>
                  </div>
                )}
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

              <div className="header-nav header-nav-mobile">
                <a href="#" className="onoff-nav-btn" onClick={(e) => { e.preventDefault(); toggleMobileMenu(); }}>
                  <span>MENU</span>
                  <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>

                {isMobileMenuOpen && (
                  <div className="navbar-section">
                    <div className="navbar-in-section">
                      <div className="mobile-menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>Menu</h3>
                        <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#333' }}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div className="search-container">
                        <form action="">
                          <input type="text" placeholder="Search..." name="search" />
                          <button type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </form>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

