import logoWhite from '../pics/logo-white.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-block-main">
          <div className="col-md-6 w-xl-auto">
            <div className="footer-company-box">
              <a 
                href="/en" 
                className="site-logo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img src={logoWhite} alt="ADA University" />
              </a>
              <div className="title footer-social-title w-auto">Connect With Us</div>
              <div className="social-set">
                <a href="https://www.facebook.com/ADAUniversity" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCsFJ476U5LQxeq1ctM6smAQ" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://twitter.com/adauniversity" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://www.instagram.com/ada.university/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/school/ada-university-official/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://t.me/ADAUniversityOfficial" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 w-xl-auto">
            <div className="title">About Us</div>
            <ul>
              <li>
                <a href="/en/about/ada-university">ADA University</a>
              </li>
              <li>
                <a href="/en/about/campus">Campus</a>
              </li>
              <li>
                <a href="https://ada.edu.az/en/admission/find-your-program">Admissions</a>
              </li>
              <li>
                <a href="/en/experience/student-life">Student Life</a>
              </li>
              <li>
                <a href="/en/jobs">Career@ADA</a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 w-xl-auto">
            <div className="title">Quick Links</div>
            <ul>
              <li>
                <a href="https://adawdc.org/" target="_blank" rel="noopener noreferrer">
                  Washington Center of ADA University
                </a>
              </li>
              <li>
                <a href="https://adafund.az/" target="_blank" rel="noopener noreferrer">
                  Giving to ADA
                </a>
              </li>
              <li>
                <a href="https://idd.az/" target="_blank" rel="noopener noreferrer">
                  Institute for Development and Diplomacy
                </a>
              </li>
              <li>
                <a href="http://lib.ada.edu.az/" target="_blank" rel="noopener noreferrer">
                  ADA University Library
                </a>
              </li>
              <li>
                <a href="https://experience.elluciancloud.ie/au433700/" target="_blank" rel="noopener noreferrer">
                  MyADA
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 w-xl-auto footer-block-contact">
            <div className="title">Contact Us</div>
            <ul>
              <li>
                <span>info@ada.edu.az</span>
              </li>
              <li>
                <span>(+994 12) 437 32 35</span>
              </li>
              <li>
                <span>(+994 12) 437 32 36</span>
              </li>
              <li>
                <span>
                  Ahmadbey Aghaoghlu str. 61,<br />
                  Baku, Azerbaijan, AZ1008
                </span>
              </li>
            </ul>
            <a className="btn btn-white" href="/en/apply/" target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 info-box text-center">
              <p>
                <span>Copyright © 2025 ADA. All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

