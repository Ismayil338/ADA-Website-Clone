import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import PageHeading from '../components/PageHeading';
import Pagination from '../components/Pagination';
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

  const leftColumnNews = currentNews.filter((_, index) => index % 2 === 0);
  const rightColumnNews = currentNews.filter((_, index) => index % 2 === 1);

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
        imageSrc={null}
        breadcrumb={generateBreadcrumbs(location.pathname, null, selectedCategory)}
        onBreadcrumbClick={() => {
          setSelectedCategory(null);
          setCurrentPage(1);
        }}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-title mb-4" style={{ color: '#fff' }}>
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

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
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
                        backgroundColor: isActive ? '#ae485e' : 'transparent',
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
                          const button = e.currentTarget;
                          button.style.color = '#ae485e';
                          button.style.backgroundColor = 'transparent';
                          const dot = button.querySelector('.news-category-dot');
                          if (dot) {
                            dot.style.borderColor = '#ae485e';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          const button = e.currentTarget;
                          button.style.color = '#000';
                          button.style.backgroundColor = 'transparent';
                          const dot = button.querySelector('.news-category-dot');
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
                          backgroundColor: isActive ? '#fff' : 'transparent',
                          transition: 'border-color 0.3s ease, background-color 0.3s ease'
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
