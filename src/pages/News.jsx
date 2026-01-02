import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const News = () => {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const newsPerPage = 12;

  const newsCategories = [
    { name: 'Academic', count: 0 },
    { name: 'ADA School', count: 0 },
    { name: 'ADA University Gazakh Center', count: 0 },
    { name: 'ADA Library', count: 0 },
    { name: 'Admissions', count: 0 },
    { name: 'Agricultural & Food Sciences', count: 0 },
    { name: 'Alumni', count: 0 },
    { name: 'College', count: 0 },
    { name: 'Executive Education', count: 0 },
    { name: 'General', count: 0 },
    { name: 'IT & Engineering', count: 0 },
    { name: 'New Academic Policies and Regulations', count: 0 },
    { name: 'Student', count: 0 },
    { name: 'University', count: 0 }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/news')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getCategoryCounts = () => {
    const counts = {};
    newsCategories.forEach(category => {
      counts[category.name] = news.filter(n => n.category === category.name).length;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const filteredNews = selectedCategory
    ? news.filter(item => item.category === selectedCategory)
    : news;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const leftColumnNews = currentNews.slice(0, 6);
  const rightColumnNews = currentNews.slice(6, 12);

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
      <main className="page page-news">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading news...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page page-news">
        <div className="container py-5 text-center text-danger">
          <h2>Error: {error}</h2>
          <p>Please make sure JSON-Server is running on port 5000</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-news">
      <PageHeading
        title="News"
        imageSrc="https://www.ada.edu.az/assets/img/header/header_news.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname, null, selectedCategory)}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-title mb-4" style={{ color: '#003366' }}>
              News
            </h1>

            {filteredNews.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fa fa-info-circle me-2"></i>
                No news found.
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6">
                    {leftColumnNews.map((item) => (
                      <div key={item.id} className="mb-4">
                        <NewsCard
                          id={item.id}
                          href={item.link}
                          imageSrc={item.image_url}
                          imageAlt={item.title}
                          category={item.category}
                          title={item.title}
                          className="w-100"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="col-md-6">
                    {rightColumnNews.map((item) => (
                      <div key={item.id} className="mb-4">
                        <NewsCard
                          id={item.id}
                          href={item.link}
                          imageSrc={item.image_url}
                          imageAlt={item.title}
                          category={item.category}
                          title={item.title}
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
                News categories:
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
                {newsCategories.map((category) => {
                  const count = categoryCounts[category.name] || 0;
                  const isActive = selectedCategory === category.name;
                  
                  return (
                    <button
                      key={category.name}
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
                          const dot = e.target.querySelector('.news-category-dot');
                          if (dot) {
                            dot.style.borderColor = '#dc3545';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#000';
                          const dot = e.target.querySelector('.news-category-dot');
                          if (dot) {
                            dot.style.borderColor = '#000';
                          }
                        }
                      }}
                      onClick={() => {
                        setSelectedCategory(isActive ? null : category.name);
                      }}
                    >
                      <span
                        className="news-category-dot"
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
                      {category.name} ({count})
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

export default News;
