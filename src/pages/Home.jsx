import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';

const Home = () => {
  const [activeTab, setActiveTab] = useState('815');
  const photoOverlaySwiperRef = useRef(null);
  const ada4AllSwiperRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    // Initialize photoOverlay-carousel slider
    const initPhotoOverlaySwiper = async () => {
      const { default: Swiper } = await import('swiper');
      const { Navigation } = await import('swiper/modules');
      
      const swiperEl = document.querySelector('.photoOverlay-carousel');
      if (swiperEl) {
        // Destroy existing instance if any
        if (swiperEl.swiper) {
          swiperEl.swiper.destroy(true, true);
        }
        
        photoOverlaySwiperRef.current = new Swiper(swiperEl, {
          modules: [Navigation],
          slidesPerView: 'auto',
          spaceBetween: 30,
          navigation: {
            nextEl: '.photoOverlay-carousel .swiper-navigation-box .swiper-button-next',
            prevEl: '.photoOverlay-carousel .swiper-navigation-box .swiper-button-prev',
          },
        });
      }
    };

    // Initialize ada-4all-slider
    const initAda4AllSwiper = async () => {
      const { default: Swiper } = await import('swiper');
      const { Navigation, Pagination } = await import('swiper/modules');
      
      const swiperEl = document.querySelector('.ada-4all-slider');
      if (swiperEl) {
        // Destroy existing instance if any
        if (swiperEl.swiper) {
          swiperEl.swiper.destroy(true, true);
        }
        
        ada4AllSwiperRef.current = new Swiper(swiperEl, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 30,
          navigation: {
            nextEl: '.ada-4all-slider .swiper-button-next',
            prevEl: '.ada-4all-slider .swiper-button-prev',
          },
          pagination: {
            el: '.ada-4all-slider-pagination',
            clickable: true,
          },
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initPhotoOverlaySwiper();
      initAda4AllSwiper();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (photoOverlaySwiperRef.current) {
        photoOverlaySwiperRef.current.destroy(true, true);
        photoOverlaySwiperRef.current = null;
      }
      if (ada4AllSwiperRef.current) {
        ada4AllSwiperRef.current.destroy(true, true);
        ada4AllSwiperRef.current = null;
      }
    };
  }, []);

  return (
  <main className="page page-home">
    <div id="page" className="wrapper">
      <section className="cs-slide-paralax-bg">
        <video
          className="bg-video"
          width="100%"
          preload="auto"
          autoPlay={true}
          muted={true}
          loop={true}
          style={{ visibility: 'visible', width: '100%' }}
          poster="https://www.ada.edu.az/media/2024/11/05/ada_website_looped_video_final_11_04_2024-2.jpg"
        >
          <source
            src="https://www.ada.edu.az/media/2024/11/05/ada_website_looped_video_final_11_04_2024-2.mp4"
            type="video/mp4"
          />
        </video>
      </section>
      <section className="gradient-grayColor-200 cs-pl-ps-48">
        <div
          className="swiper photoOverlay-carousel swiper-initialized swiper-horizontal swiper-autoheight swiper-backface-hidden"
        >
          <div
            className="swiper-wrapper"
            style={{
              cursor: 'grab',
              transitionDuration: '0ms',
              transitionDelay: '0ms',
              transform: 'translate3d(0px, 0px, 0px)',
              height: '465px',
            }}
            id="swiper-wrapper-a559a6367f7f4a04"
            aria-live="polite"
          >
            <div
              className="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active"
              role="group"
              aria-label="1 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/06/book.jpg" alt="" />
                <a
                  className="category-name"
                  href="https://adauniversity.on.worldcat.org/search/detail/1514991607?databaseList=&queryString=kw%3AAn%20Ambassador%E2%80%99s%20Manifesto&clusterResults=true&expandSearch=on&translateSearch=off"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publication
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://adauniversity.on.worldcat.org/search/detail/1514991607?databaseList=&queryString=kw%3AAn%20Ambassador%E2%80%99s%20Manifesto&clusterResults=true&expandSearch=on&translateSearch=off"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>An Ambassador's Manifesto by Rector Hafiz Pashayev</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://adauniversity.on.worldcat.org/search/detail/1514991607?databaseList=&queryString=kw%3AAn%20Ambassador%E2%80%99s%20Manifesto&clusterResults=true&expandSearch=on&translateSearch=off"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-next"
              role="group"
              aria-label="2 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img
                  src="https://www.ada.edu.az/media/2025/10/30/91cefcc7_98d2_47f4_bcb8_32e8cb20a6fd.jpeg"
                  alt=""
                />
                <a
                  className="category-name"
                  href="https://www.ada.edu.az/en/schools/site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dual Degree Master Programs
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.ada.edu.az/en/schools/site"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Advance Your Career with a Dual Master's Degree</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.ada.edu.az/en/schools/site"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        Link for more information
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide swiper-slide-visible"
              role="group"
              aria-label="3 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/06/texas.jpg" alt="" />
                <a
                  className="category-name"
                  href="https://shorturl.at/wDLdX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Student Success
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://shorturl.at/wDLdX"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        ADA Student Recognized for Excellence at Texas A&M
                        International Conference
                      </span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://shorturl.at/wDLdX"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="4 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/07/b-1.jpeg" alt="" />
                <a
                  className="category-name"
                  href="https://www.ada.edu.az/en/ada-school/ada-high-school"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Application
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.ada.edu.az/en/ada-school/ada-high-school"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>ADA High School - Final Step to ADA University</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.ada.edu.az/en/ada-school/ada-high-school"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="5 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/07/picture2.png" alt="" />
                <a
                  className="category-name"
                  href="https://linktr.ee/adaprimary?fbclid=PAZXh0bgNhZW0CMTEAAafT3nWX4aaQMuavLksn-7hjTS3lpbjPFALhrQQ4btINPXgQ_rr0Gc9V5wbKRg_aem_pjHu8zY9UTd0hpexIxMiHw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Application
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://linktr.ee/adaprimary?fbclid=PAZXh0bgNhZW0CMTEAAafT3nWX4aaQMuavLksn-7hjTS3lpbjPFALhrQQ4btINPXgQ_rr0Gc9V5wbKRg_aem_pjHu8zY9UTd0hpexIxMiHw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Initial Step Towards ADA</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://linktr.ee/adaprimary?fbclid=PAZXh0bgNhZW0CMTEAAafT3nWX4aaQMuavLksn-7hjTS3lpbjPFALhrQQ4btINPXgQ_rr0Gc9V5wbKRg_aem_pjHu8zY9UTd0hpexIxMiHw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="6 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/14/untitled_design_1_-1.jpg" alt="" />
                <a
                  className="category-name"
                  href="https://www.ada.edu.az/en/academics/research"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribution
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.ada.edu.az/en/academics/research"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Faculty Contribution to Scientific Literature</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.ada.edu.az/en/academics/research"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="7 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/06/dance-1.jpeg" alt="" />
                <a
                  className="category-name"
                  href="https://www.instagram.com/p/DJH1pmaAV9a/?img_index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Life at ADA
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.instagram.com/p/DJH1pmaAV9a/?img_index=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Colorful ADA Studentship</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.instagram.com/p/DJH1pmaAV9a/?img_index=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="8 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/06/kampus.jpeg" alt="" />
                <a
                  className="category-name"
                  href="https://www.ada.edu.az/en/about/ada-university"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Campus
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.ada.edu.az/en/about/ada-university"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>ADA Family: Story of Belonging</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.ada.edu.az/en/about/ada-university"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="9 / 9"
              style={{ width: '332px', marginRight: '30px' }}
            >
              <div className="item-box">
                <img src="https://www.ada.edu.az/media/2025/05/14/untitled_design_4_.jpg" alt="" />
                <a
                  className="category-name"
                  href="https://www.instagram.com/p/DJHqGFDCoZU/?igsh=MTg1czhtZGNqa3JlMQ%3D%3D&img_index=6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Taghiyev Legacy
                </a>
                <div className="info-box">
                  <div className="in-box">
                    <a
                      className="title"
                      href="https://www.instagram.com/p/DJHqGFDCoZU/?igsh=MTg1czhtZGNqa3JlMQ%3D%3D&img_index=6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Social Responsibility in Our DNA</span>
                    </a>
                    <br />
                    <a
                      className="btn btn-text"
                      href="https://www.instagram.com/p/DJHqGFDCoZU/?igsh=MTg1czhtZGNqa3JlMQ%3D%3D&img_index=6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-navigation-box">
            <div
              className="swiper-button-prev swiper-button-disabled"
              tabIndex="-1"
              role="button"
              aria-label="Previous slide"
              aria-controls="swiper-wrapper-a559a6367f7f4a04"
              aria-disabled="true"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              className="swiper-button-next"
              tabIndex="0"
              role="button"
              aria-label="Next slide"
              aria-controls="swiper-wrapper-a559a6367f7f4a04"
              aria-disabled="false"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <span
            className="swiper-notification"
            aria-live="assertive"
            aria-atomic="true"
          ></span>
        </div>
      </section>
      <section className="bg-grayColor-200 pt-0">
        <div className="container">
          <div className="cs-tab-container style-1">
            <div className="cs-tab-nav">
              <div 
                className={`cs-tab-nav-item ${activeTab === '815' ? 'active' : ''}`} 
                data-id="815"
                onClick={() => handleTabClick('815')}
              >
                Studying at ADA
              </div>
              <div 
                className={`cs-tab-nav-item ${activeTab === '814' ? 'active' : ''}`} 
                data-id="814"
                onClick={() => handleTabClick('814')}
              >
                Financial Aid
              </div>
              <div 
                className={`cs-tab-nav-item ${activeTab === '816' ? 'active' : ''}`} 
                data-id="816"
                onClick={() => handleTabClick('816')}
              >
                ADA Experience
              </div>
            </div>
            <div className="cs-tab-contents">
              <div 
                className={`cs-tab-nav-item ${activeTab === '815' ? 'active' : ''}`} 
                data-id="815"
                onClick={() => handleTabClick('815')}
              >
                Studying at ADA
              </div>
              <div className={`tab ${activeTab === '815' ? 'show' : ''}`} data-id="815">
                <div className="row">
                  <div className="col-lg-9">
                    <h3 className="color-primary">Programs</h3>
                    <p>
                      We offer undergraduate and graduate programs in seven Schools.
                      With 212 faculty members, we provide academic excellence and
                      high-quality education to more than 4,000 students.
                    </p>
                    <p>
                      Each year, we receive a significant number of applications. We
                      remain highly selective with an emphasis on outstanding
                      academic achievement and potential for growth. We admit
                      students from all corners of Azerbaijan and from around the
                      world.
                    </p>
                  </div>
                  <div
                    className="col-lg-3 d-flex flex-column justify-content-center align-items-start mt-30"
                  >
                    <div className="button-list-box">
                      <a
                        className="btn btn-hiperlink"
                        href="/en/admission/find-your-program"
                      >
                        Find Your Program
                      </a>
                      <a className="btn btn-hiperlink" href="/en/apply/">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className={`cs-tab-nav-item ${activeTab === '814' ? 'active' : ''}`} 
                data-id="814"
                onClick={() => handleTabClick('814')}
              >
                Financial Aid
              </div>
              <div className={`tab ${activeTab === '814' ? 'show' : ''}`} data-id="814">
                <div className="row">
                  <div className="col-lg-6">
                    <h3 className="color-primary">Financial Aid</h3>
                    <p>
                      At ADA University, we value academic merit and performance of
                      our students, and we tend to reward it through generous
                      scholarships, fellowships, and awards. We are committed to
                      provide outstanding education and promote intellectual
                      inquiry. We are also part of a larger society in which we
                      share responsibility towards each other. Thus, we aspire to
                      give back to society by providing diverse financial aid
                      opportunities that welcome students from all backgrounds and
                      financial abilities.
                    </p>
                  </div>
                  <div
                    className="col-lg-6 d-flex flex-column justify-content-center align-items-start mt-30"
                  >
                    <div className="button-list-box">
                      <a
                        className="btn btn-hiperlink"
                        href="/en/admission/financial-aid#merit-scholarships"
                      >
                        Merit Scholarships
                      </a>
                      <a
                        className="btn btn-hiperlink"
                        href="/en/admission/financial-aid#fellowships"
                      >
                        International Fellowships
                      </a>
                      <a
                        className="btn btn-hiperlink"
                        href="/en/admission/financial-aid#student-loans"
                      >
                        Student Loans
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className={`cs-tab-nav-item ${activeTab === '816' ? 'active' : ''}`} 
                data-id="816"
                onClick={() => handleTabClick('816')}
              >
                ADA Experience
              </div>
              <div className={`tab ${activeTab === '816' ? 'show' : ''}`} data-id="816">
                <div className="row">
                  <div className="col-lg-6">
                    <h3 className="color-primary">ADA Experience</h3>
                    <p>
                      ADA is a community where students engage equally with peers to
                      contribute to the intellectually challenging culture of the
                      University. Here, you are in charge of your own future. Follow
                      your passion, develop your talent, and grow by championing
                      your cause. Student government and student clubs are a vital
                      part of ADA life. Formed around a variety of causes and
                      interests, their activities enrich our community.
                    </p>
                  </div>
                  <div
                    className="col-lg-6 d-flex flex-column justify-content-center align-items-start"
                  >
                    <div className="button-list-box">
                      <a
                        className="btn btn-hiperlink"
                        href="/en/experience/student-life"
                      >
                        Student Life
                      </a>
                      <a
                        className="btn btn-hiperlink"
                        href="/en/experience/exchange-programs"
                      >
                        Exchange Programs
                      </a>
                      <a
                        className="btn btn-hiperlink"
                        href="/en/experience/career-services"
                      >
                        Career Services
                      </a>
                      <a
                        className="btn btn-hiperlink"
                        href="/en/experience/alumni-stories"
                      >
                        Alumni Stories
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gray-white-color-bg">
        <div className="container">
          <div className="call-to-actions">
            <div className="image-bg-box">
              <img
                src="https://www.ada.edu.az/assets/img/content/home-call-action-bg.jpg"
                alt=""
                className="img-bg"
              />
              <img
                src="https://www.ada.edu.az/assets/img/content/home-call-action-bg.jpg"
                alt=""
                className="img-bg --mobile"
              />
            </div>
            <div className="row">
              <div className="col-lg-8 flex-boxes-left">
                <div className="content-call-to-actions">
                  <h3 className="title">Discover ADA University Campus</h3>
                  <p>Curious to explore our state-of-the-art campus?</p>
                </div>
              </div>
              <div className="col-lg-4 flex-boxes-right">
                <div className="content-call-to-actions">
                  <h2 className="title">Join Events</h2>
                  <a className="btn btn-o" href="https://www.ada.edu.az/en/events">
                    Check Upcoming Events
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="headline">
            <h2 className="title">Different Campuses-One University</h2>
          </div>
          <p>
            Explore our locations in Azerbaijan and beyond. Our campuses are united
            with features that encourage ADA lifestyle.
          </p>
        </div>
        <div className="container conatiner-item-pt-style-1">
          <div className="row">
            <div className="col-lg-4 grid-item-style-1">
              <a className="grid-url" href="/en/about/campus/main">
                <div className="image radio-32">
                  <img
                    src="https://www.ada.edu.az/assets/img/location-campus/m-campus-01-v2.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-title">ADA University Baku Campus</div>
                <div className="grid-description">
                  Green and Smart Campus in the heart of Baku. Its state-of-the-art
                  facilities foster growth.
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1">
              <a className="grid-url" href="/en/about/campus/gazakh">
                <div className="image radio-32">
                  <img
                    src="https://www.ada.edu.az/assets/img/content/03_grid-thumbnail_786x548.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-title">ADA University Gazakh Center</div>
                <div className="grid-description">
                  Reviving history of education in Azerbaijan at historical Gazakh
                  Teachers' Seminary.
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1">
              <a className="grid-url" href="https://adawdc.org/" target="_blank" rel="noopener noreferrer">
                <div className="image radio-32">
                  <img
                    src="https://www.ada.edu.az/assets/img/content/02_grid-thumbnail_786x548.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-title">ADA University Washington Center</div>
                <div className="grid-description">
                  Historical building located just steps away from Dupont Circle and
                  Philipps Collection.
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="countr-section">
        <div className="image-bg-box">
          <img
            alt=""
            src="https://www.ada.edu.az/assets/img/content/home-call-action-bg.jpg"
            className="img-bg"
          />
          <img
            alt=""
            src="https://www.ada.edu.az/assets/img/content/home-call-action-bg.jpg"
            className="img-bg --mobile"
          />
        </div>
        <div className="container">
          <div className="counter-row row">
            <div className="counter-grid col-lg-3">
              <div className="count-head">
                <div className="icon">
                  <img src="https://www.ada.edu.az/assets/img/icons/students.svg" alt="" />
                </div>
                <div className="count" data-animateduration="1500" data-countto="4946">
                  4946
                </div>
              </div>
              <div className="count-bottom">
                <span>STUDENTS</span>
              </div>
            </div>
            <div className="counter-grid col-lg-3">
              <div className="count-head">
                <div className="icon">
                  <img src="https://www.ada.edu.az/assets/img/icons/faculty.svg" alt="" />
                </div>
                <div className="count" data-animateduration="1500" data-countto="306">
                  306
                </div>
              </div>
              <div className="count-bottom">
                <span>FACULTY</span>
              </div>
            </div>
            <div className="counter-grid col-lg-3">
              <div className="count-head">
                <div className="icon">
                  <img src="https://www.ada.edu.az/assets/img/icons/countries.svg" alt="" />
                </div>
                <div className="count" data-animateduration="1500" data-countto="189">
                  189
                </div>
              </div>
              <div className="count-bottom">
                <span>Partner Universities</span>
              </div>
            </div>
            <div className="counter-grid col-lg-3">
              <div className="count-head">
                <div className="icon">
                  <img src="https://www.ada.edu.az/assets/img/icons/alumni-employment.svg" alt="" />
                </div>
                <div className="count" data-animateduration="1500" data-countto="90.1">
                  90.1
                </div>
                <div className="count">%</div>
              </div>
              <div className="count-bottom">
                <span>ALUMNI EMPLOYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="container">
          <div className="headline">
            <h2 className="title">Meet Our Alumni</h2>
            <a href="/en/experience/alumni-stories" className="btn btn-primary">
              Learn More
            </a>
          </div>
          <div className="large-single-item">
            <a href="javascript:;" className="item-url">
              <div className="image">
                <div className="play-button">
                  <i className="fa-solid fa-play"></i>
                  <img
                    src="https://www.ada.edu.az/media/2024/07/15/thumbnail_alumni_forum_2024_poster-1.jpg"
                    alt=""
                    id="youtube-cover-player"
                  />
                </div>

                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/_cgWiPKSGy0?controls=0&rel=0"
                  title=""
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen=""
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: '100%',
                    aspectRatio: '16/9',
                  }}
                  id="youtube-player"
                ></iframe>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="pt-0 pb-5 text-content">
        <div className="container">
          <div className="large-single-item">
            <h3 className="title">Connect to Our Alumni Community</h3>
            <div className="description">
              <p>
                Staying connected to your alma mater is easier than ever through the
                resources of our Office of Alumni Affairs. Remain a vital part of
                the university's exceptionally engaged community and live up to ADA
                values wherever you go.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="news-and-event-sections pt-0 pb-5">
        <div className="container">
          <div className="headline pt-5">
            <h2 className="title">News & Events</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/news/728-ada-university-launches-international-certificate-program-in-strategic-and-ai-supported-assessment"
              >
                <div className="image"></div>
                <div className="grid-item-foot rgbRed">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> Education
                    </span>
                  </div>
                  <div className="grid-title">
                    ADA University Launches International Certificate Program in
                    Strategic and AI-Supported Assessment
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/news/727-ada-university-s-newly-established-faculty-of-design-and-architecture-hosts-seminar-series-within-urban-awareness-campaign"
              >
                <div className="image">
                  <img
                    src="https://www.ada.edu.az/media/2025/12/23/604245896_18438917626103018_837760399101567775_n.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-item-foot rgbRed">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> Design & Architecture
                    </span>
                  </div>
                  <div className="grid-title">
                    ADA University's Newly Established Faculty of Design and
                    Architecture Hosts Seminar Series within Urban Awareness
                    Campaign
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/news/726-commemorative-event-honoring-national-leader-heydar-aliyev-held-at-george-washington-university"
              >
                <div className="image">
                  <img
                    src="https://www.ada.edu.az/media/2025/12/23/599501422_883865447312747_5608468173990884845_n.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-item-foot rgbRed">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> General
                    </span>
                  </div>
                  <div className="grid-title">
                    Commemorative Event Honoring National Leader Heydar Aliyev Held
                    at George Washington University
                  </div>
                </div>
              </a>
            </div>
            <div className="col-12 flex-boxes-right mt-0">
              <a className="btn btn-text" href="/en/news">
                <span>
                  See All News<i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="news-and-event-sections pt-0 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/events/484-aciq-qapi-gunleri-ada-universitetinde-sizi-gozleyirik"
              >
                <div className="image">
                  <img
                    src="https://www.ada.edu.az/media/2025/06/16/b7690832_28c3_447e_b9cd_691076955f2a.jpeg"
                    alt=""
                  />
                </div>
                <div className="grid-item-foot">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> Admission
                    </span>
                  </div>
                  <div className="grid-title">
                    Açıq Qapı Günləri: ADA Universitetində sizi gözləyirik!
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/events/483-shaping-policies-for-impact-seminar-on-public-administration-policy-analysis"
              >
                <div className="image">
                  <img
                    src="https://www.ada.edu.az/media/2025/02/20/photo_2025_02_18_19_46_21.jpg"
                    alt=""
                  />
                </div>
                <div className="grid-item-foot">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> Admission
                    </span>
                  </div>
                  <div className="grid-title">
                    Shaping Policies for Impact: Seminar on Public Administration
                    & Policy Analysis
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 grid-item-style-1 mb-5">
              <a
                className="grid-url"
                href="https://www.ada.edu.az/en/events/482-first-info-session-of-ada-university-s-master-of-laws"
              >
                <div className="image">
                  <img src="https://www.ada.edu.az/media/2025/01/27/31_yanvar_web.jpg" alt="" />
                </div>
                <div className="grid-item-foot">
                  <div className="date-and-time">
                    <span className="date">
                      <i className="fa-solid fa-layer-group"></i> Admission
                    </span>
                  </div>
                  <div className="grid-title">
                    First Info Session of ADA University's Master of Laws
                  </div>
                </div>
              </a>
            </div>
            <div className="col-12 flex-boxes-right mt-0">
              <a className="btn btn-text" href="/en/events">
                <span>
                  See All Events<i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="ada-4all-section">
        <div className="container">
          <div className="headline">
            <h2 className="title">#ADA4ALL</h2>
            <div className="hr-cs-line"></div>
            <a href="/en/experience/student-life" className="btn btn-primary">
              Experience Student Life
            </a>
          </div>
          <div
            className="swiper ada-4all-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
          >
            <div
              className="swiper-wrapper"
              id="swiper-wrapper-a4125fbd6c71ff27"
              aria-live="polite"
            >
              <div
                className="swiper-slide swiper-slide-active"
                role="group"
                aria-label="1 / 5"
                data-swiper-slide-index="0"
                style={{ width: '900px', marginRight: '30px' }}
              >
                <img
                  src="https://www.ada.edu.az/media/2024/11/29/img_2673-1.jpg"
                  alt=""
                />
              </div>
              <div
                className="swiper-slide swiper-slide-next"
                role="group"
                aria-label="2 / 5"
                data-swiper-slide-index="1"
                style={{ width: '900px', marginRight: '30px' }}
              >
                <img
                  src="https://www.ada.edu.az/media/2024/11/29/02_adaforall_slide.jpg"
                  alt=""
                />
              </div>
              <div
                className="swiper-slide"
                role="group"
                aria-label="3 / 5"
                data-swiper-slide-index="2"
                style={{ width: '900px', marginRight: '30px' }}
              >
                <img src="https://www.ada.edu.az/assets/img/content/03_adaforall-slide.jpg" alt="" />
              </div>
              <div
                className="swiper-slide"
                role="group"
                aria-label="4 / 5"
                data-swiper-slide-index="3"
                style={{ width: '900px', marginRight: '30px' }}
              >
                <img src="https://www.ada.edu.az/assets/img/content/04_adaforall-slide.jpg" alt="" />
              </div>
              <div
                className="swiper-slide"
                role="group"
                aria-label="5 / 5"
                data-swiper-slide-index="4"
                style={{ width: '900px', marginRight: '30px' }}
              >
                <img
                  src="https://www.ada.edu.az/media/2024/11/29/photo_2024_11_29_14_52_33_copy.jpg"
                  alt=""
                />
              </div>
            </div>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
            <div className="swiper-button-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className="swiper-button-next">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div
            className="ada-4all-slider-pagination swiper-pagination --horizontal swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
          >
            <span
              className="swiper-pagination-bullet swiper-pagination-bullet-active"
              tabIndex="0"
              role="button"
              aria-label="Go to slide 1"
              aria-current="true"
            ></span>
            <span
              className="swiper-pagination-bullet"
              tabIndex="0"
              role="button"
              aria-label="Go to slide 2"
            ></span>
            <span
              className="swiper-pagination-bullet"
              tabIndex="0"
              role="button"
              aria-label="Go to slide 3"
            ></span>
            <span
              className="swiper-pagination-bullet"
              tabIndex="0"
              role="button"
              aria-label="Go to slide 4"
            ></span>
            <span
              className="swiper-pagination-bullet"
              tabIndex="0"
              role="button"
              aria-label="Go to slide 5"
            ></span>
          </div>
        </div>
      </section>
      <section className="ada-is-section">
        <div className="image-bg">
          <img src="https://www.ada.edu.az/assets/img/content/ada-vertical-carousel-bg.jpg" alt="" />
        </div>
        <div className="back-title">
          <span>ADA IS</span>
          <span className="--shadow">ADA IS</span>
        </div>
        <div className="ada-is-vertical-container">
          <div
            className="swiper ada-is-vertical-auto-carousel swiper-initialized swiper-vertical swiper-backface-hidden"
          >
            <div
              className="swiper-wrapper"
              id="swiper-wrapper-84d3bd39e51cbf2f"
              aria-live="off"
              style={{
                transitionDuration: '0ms',
                transform: 'translate3d(0px, 0px, 0px)',
                transitionDelay: '0ms',
              }}
            >
              <div
                className="swiper-slide"
                role="group"
                aria-label="4 / 5"
                style={{ height: '84px' }}
                data-swiper-slide-index="3"
              >
                <a>innovative campus</a>
              </div>
              <div
                className="swiper-slide swiper-slide-prev"
                role="group"
                aria-label="5 / 5"
                style={{ height: '84px' }}
                data-swiper-slide-index="4"
              >
                <a>venue of academic excellence</a>
              </div>

              <div
                className="swiper-slide swiper-slide-active"
                role="group"
                aria-label="1 / 5"
                style={{ height: '84px' }}
                data-swiper-slide-index="0"
              >
                <a>melting pot of cultures</a>
              </div>
              <div
                className="swiper-slide swiper-slide-next"
                role="group"
                aria-label="2 / 5"
                style={{ height: '84px' }}
                data-swiper-slide-index="1"
              >
                <a>ever-growing community</a>
              </div>
              <div
                className="swiper-slide"
                role="group"
                aria-label="3 / 5"
                style={{ height: '84px' }}
                data-swiper-slide-index="2"
              >
                <a>home</a>
              </div>
            </div>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};

export default Home;