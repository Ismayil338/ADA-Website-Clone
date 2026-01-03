import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const AboutItalyAzerbaijanUniversity = () => {
  const location = useLocation();

  return (
    <main className="page page-about">
      <PageHeading
        title="Italy-Azerbaijan University"
        imageSrc="https://www.ada.edu.az/media/2024/10/25/website_slider_italy_azerbaijan.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />

      <div id="page" className="wrapper">
        <section className="text-content pt-0 pb-0 mb-5">
          <div className="container">
            <div className="headline">
              <h2 className="title color-primary">About Us</h2>
            </div>
            <p>
              In 2022, ADA University further expanded its operations through
              Italy-Azerbaijan University project. Established by a decree signed by
              President Ilham Aliyev, this new institution aims to strengthen
              knowledge exchange between Azerbaijan and Italy, promote innovation, and
              contribute to the economic development of our country.
            </p>
            <p>
              The University was established in partnership with five leading Italian
              Universities, namely Luiss University, Bologna University, Politecnico
              di Milano, Politecnico di Torino and Sapienza University of Rome.
            </p>
            <p>
              The Italy-Azerbaijan University focuses on disciplines such as design
              and architecture, agriculture and food sciences, business and
              engineering, providing a platform for collaborative research, student
              exchanges, and joint degree programs.
            </p>
          </div>
        </section>

        <section className="pt-0">
          <div className="container">
            <div className="row row-content-panel">
              <div className="col-lg-6">
                <div className="content-panel rgbPrimary">
                  <h3 className="title">Campus</h3>
                  <div className="description">
                    <p>
                      Italy-Azerbaijan University is currently located on ADA
                      University's modern Baku campus. Two new buildings are being
                      built and will be ready by September 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="content-panel rgbRed">
                  <h3 className="title">Schools</h3>
                  <div className="description">
                    <p>
                      We offer two Schools within Italy-Azerbaijan University:
                      Agricultural and Food Sciences, Design and Architecture. In
                      addition to the Schools, separate programs are offered within
                      the School of Business and School of IT and Engineering of ADA
                      University.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="list-style-2 pt-0">
          <div className="container">
            <div className="panel-checking-list">
              <div className="row row-checking-list-elments">
                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Partners</h3>
                    <ul>
                      <li>
                        <a href="https://www.luiss.edu" target="_blank" rel="noopener noreferrer">
                          Luiss University
                        </a>
                      </li>
                      <li>
                        <a href="https://www.unibo.it/en" target="_blank" rel="noopener noreferrer">
                          Bologna University
                        </a>
                      </li>
                      <li>
                        <a href="https://www.polimi.it" target="_blank" rel="noopener noreferrer">
                          Politecnico di Milano
                        </a>
                      </li>
                      <li>
                        <a href="https://www.polito.it" target="_blank" rel="noopener noreferrer">
                          Politecnico di Torino
                        </a>
                      </li>
                      <li>
                        <a href="https://www.uniroma1.it/en/pagina-strutturale/home" target="_blank" rel="noopener noreferrer">
                          Sapienza University of Rome
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Degrees</h3>
                    <ul>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/safs/programs/agricultural-and-food-system-management"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Agricultural and Food Systems Management
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/safs/programs/agricultural-technologies"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Agricultural Technologies&nbsp;
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/safs/programs/animal-science"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Animal Science&nbsp;
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/sda/programs/architecture"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Architecture
                        </a>&nbsp;
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/sda/programs/bcd"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Communication Design
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/site/programs/electrical-and-electronics-engineering"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Electrical and Electronic Engineering
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/safs/programs/food-technologies"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Food Technologies&nbsp;
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/sb/programs/global-management-and-politics-gmap"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Global Management and Politics
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/sda/programs/interior-design"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Interior Design
                        </a>
                      </li>
                      <li>
                        <i className="fa-solid fa-check">
                          <span className="icon">&nbsp;</span>
                        </i>
                        <a
                          href="https://www.ada.edu.az/en/schools/sda/programs/bup"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Urban Planning
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-6 col-xl-3">
                  <div className="checking-list-elments">
                    <h3 className="title">Certificate Programs</h3>
                    <ul>
                      <li>
                        <a
                          href="https://www.ada.edu.az/en/schools/safs/programs/certificate-csaps"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Agricultural and Food Sciences
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.ada.edu.az/en/schools/sda/programs/executive-program"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Design and Architecture
                        </a>
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
                        286 students
                      </li>
                      <li>
                        <i className="fa-solid fa-graduation-cap">
                          <span className="icon">&nbsp;</span>
                        </i>
                        70% undergraduate&nbsp;
                      </li>
                      <li>
                        <i className="fa-solid fa-graduation-cap">
                          <span className="icon">&nbsp;</span>
                        </i>
                        30% graduate
                      </li>
                      <li>
                        <i className="fa-solid fa-person-dress">
                          <span className="icon">&nbsp;</span>
                        </i>
                        60% female&nbsp;<span className="text">&nbsp;</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-person">
                          <span className="icon">&nbsp;</span>
                        </i>
                        40% male
                      </li>
                    </ul>
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

export default AboutItalyAzerbaijanUniversity;

