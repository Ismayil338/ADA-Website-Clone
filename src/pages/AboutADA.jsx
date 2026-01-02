import React from 'react';
import { useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const AboutADA = () => {
  const location = useLocation();

  return (
    <main className="page page-about">
      <PageHeading
        title="ADA University"
        imageSrc="https://www.ada.edu.az/assets/img/header/header-img-ada-university.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />

      <div id="page" className="wrapper">
        <section className="text-content pt-0 pb-0 mb-5">
          <div className="container">
            <div className="headline">
              <h2 className="title color-primary">Our Story</h2>
            </div>
            <p>
              ADA University was established on January 13th, 2014, by the decree of
              President of the Republic of Azerbaijan. The University is a state
              higher education institution engaged in the delivery of undergraduate
              and graduate degree programs in addition to the advancement of research.
            </p>
            <p>
              The University is the legal heir of the Azerbaijan Diplomatic Academy
              (ADA) and Information Technologies University. They were merged in
              January 2014 to establish ADA University.
            </p>
            <p>
              Founded on March 6, 2006, the Azerbaijan Diplomatic Academy began
              offering an Advanced Foreign Service Program to diplomats of the
              Ministry of Foreign Affairs and civil servants in the government, as of
              January 2007. The Academy launched its first master degree in September
              2009, followed by bachelor degrees in September 2011.
            </p>
            <p>
              In 2022, ADA University further expanded its operations through
              Italy-Azerbaijan University project. Established by a decree signed by
              President Ilham Aliyev, this new institution aims to strengthen
              knowledge exchange between Azerbaijan and Italy, promote innovation, and
              contribute to the economic development of our country.
            </p>
            <p>
              <a href="/en/about/Italy-Azerbaijan-university">
                Click here to learn more about Italy-Azerbaijan University
              </a>
            </p>
          </div>
        </section>
        <section className="pt-0 pb-4">
          <div className="container">
            <div className="row row-content-panel">
              <div className="col-lg-6">
                <div className="content-panel rgbRed">
                  <h3 className="title">Mission</h3>
                  <div className="description">
                    <p>
                      Our mission is to cultivate highly intellectual solution
                      providers who are closely collaborating, efficiently
                      communicating members of the global community, possessing ethics
                      and a sense of citizenship.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="content-panel rgbPrimary">
                  <h3 className="title">Vision</h3>
                  <div className="description">
                    <p>
                      We continually strive to be a world-class university in
                      Azerbaijan with the excellence of "müəllim and alim" embedded
                      into an innovative learning culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0 pb-4">
          <div className="container">
            <div className="panel-checking-list">
              <div className="row row-checking-list-elments">
                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Core Values</h3>
                    <ul>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">Academic excellence</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">Accountability and shared governance</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">Honor, integrity and transparency</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">
                          Diversity, collaboration and communication
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">Social responsibility</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Schools</h3>
                    <ul>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">
                          School of Public and International Affairs
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">School of Business</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">School of IT and Engineering</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">School of Education</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">School of Law</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">
                          School of Agricultural and Food Sciences
                        </span>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">School of Design and Architecture</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Students</h3>
                    <ul>
                      <li>
                        <i className="fa-solid fa-user">
                          <span className="icon">&nbsp;</span>
                        </i>
                        4340<span className="text"> students</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-graduation-cap">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">84% undergraduate</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-graduation-cap">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">16% graduate</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-person-dress">
                          <span className="icon">&nbsp; </span>
                        </i>
                        <span className="text">52% female</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-person">
                          <span className="icon">&nbsp; </span>
                        </i>
                        <span className="text">48% male</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Alumni</h3>
                    <ul>
                      <li>
                        <i className="fa-solid fa-earth-americas">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">2500 alumni in 48 countries</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-briefcase">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <span className="text">
                          4442 alumni of &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; ADA University Executive
                          Education
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0 pb-5">
          <div className="container">
            <div className="row row-content-panel">
              <div className="col-md-12">
                <div className="content-panel rgbRed">
                  <div className="description">
                    <p>
                      With students, faculty, and staff from 53 countries around the
                      world, diversity illustrates one of our core values.
                      International representation creates a stimulating environment
                      and learning happens everywhere around us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-content pt-0 pb-0 mb-5">
          <div className="container">
            <div className="headline">
              <h2 className="title color-primary">Our Brand</h2>
            </div>
            <p>
              ADA University is a vision of the future brought to life. Ours is a
              community of academic excellence, accountability, shared governance,
              honor, integrity, transparency, diversity, collaboration, communication
              and social responsibility that empowers individuals to challenge
              conventional thinking in pursuit of new ideas. Rallying around the ADA
              Flag, we uphold its symbols.
            </p>
            <p>
              <span className="word-bg --blue">Blue</span> in the ADA Flag stands for
              loyalty and communication. Our loyalty to core values has been rock
              solid. We communicate our story well and transmit our values among
              ourselves through the years.
              <span className="word-bg --white">White</span> means purity of honor,
              integrity and transparency. We pledge to honor and live by honor. White
              also stands for the purity of mind, clean of prejudices, in search of
              knowledge and enlightenment.
              <span className="word-bg --red">Red</span> symbolizes vibrancy, change, and
              innovation. ADA is a thriving locale. In this volcano of ideas and
              initiatives, we encourage minds to erupt. We challenge static thoughts.
              We conquer heights through continuous learning and restless innovation
              of selves.
            </p>
          </div>
        </section>
        <section className="pt-0">
          <div className="container container-brand-assets">
            <div className="row">
              <div className="col-md-12">
                <h4 className="mb-30 color-primary">Brand Assets</h4>
              </div>
              <div className="col-lg-6 col-xl-4">
                <div className="brand-assets-item">
                  <div className="item-header">
                    <div className="title color-red">ADA University Logo</div>
                    <a
                      className="download-btn"
                      href="https://www.ada.edu.az/file_upload/about/ADA-University-Logo.pdf"
                    >
                      <span>Download</span>
                      <span>
                        <i className="fa-solid fa-download"></i>
                      </span>
                    </a>
                  </div>
                  <div className="brand-image">
                    <img src="https://www.ada.edu.az/assets/img/brand-ada-logo-frame.svg" alt="ADA Logo" />
                  </div>
                  <p className="description">
                    Our logo is our brand's shining star, the asset that everyone
                    remembers.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-xl-4">
                <div className="brand-assets-item">
                  <div className="item-header">
                    <div className="title color-red">Logo Partnership Lockup</div>
                    <a
                      className="download-btn"
                      href="https://www.ada.edu.az/file_upload/about/ADA-University-Logo-partnership-lockups.pdf"
                    >
                      <span>Download</span>
                      <span>
                        <i className="fa-solid fa-download"></i>
                      </span>
                    </a>
                  </div>
                  <div className="brand-image">
                    <img
                      src="https://www.ada.edu.az/assets/img/ada-example-partner-logo.svg"
                      alt="Logo Partnership Lockup"
                    />
                  </div>
                  <p className="description">
                    Leverage these tools to proudly demonstrate your collaborative
                    alliance with ADA.
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-xl-4 col-brand-color-hex">
                <div className="brand-assets-item">
                  <div className="item-header">
                    <div className="title">Primary Colors</div>
                  </div>
                  <div className="brand-color-hex">
                    <div className="hex-box">
                      <div className="hex-name">Caspian Blue</div>
                      <input className="hex-code --blue" defaultValue="#336178" readOnly />
                    </div>
                    <div className="hex-box">
                      <div className="hex-name">White</div>
                      <input className="hex-code --white" defaultValue="#ffffff" readOnly />
                    </div>
                    <div className="hex-box">
                      <div className="hex-name">Pomegranate</div>
                      <input className="hex-code --red" defaultValue="#ae485e" readOnly />
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

