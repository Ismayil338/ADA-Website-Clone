import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('News not found');
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
  }, [id]);

  if (loading) {
    return (
      <main className="page page-news-detail">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading news details...</h2>
        </div>
      </main>
    );
  }

  if (error || !news) {
    return (
      <main className="page page-news-detail">
        <div className="container py-5 text-center">
          <h2 className="text-danger">Error: {error || 'News not found'}</h2>
          <Link to="/en/news" className="btn btn-primary mt-3">
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-news-detail">
      <PageHeading
        title={news.title || "News Detail"}
        imageSrc={news.image_url || "https://www.ada.edu.az/assets/img/header/header_news.jpg"}
        breadcrumb={generateBreadcrumbs(location.pathname, news.title || 'News Detail')}
      />
      <div className="container py-5">
        <Link
          to="/en/news"
          className="btn btn-outline-secondary mb-4"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <i className="fa fa-arrow-left me-2"></i>Back to News
        </Link>

        <div className="row">
          <div className="col-lg-8">
            {news.image_url && (
              <div className="mb-4">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <h1 className="mb-4" style={{ color: '#003366' }}>
              {news.title}
            </h1>

            <div className="news-meta mb-4">
              {news.category && (
                <div className="mb-2">
                  <i className="fa-solid fa-layer-group me-2 text-primary"></i>
                  <strong>Category:</strong> {news.category}
                </div>
              )}
            </div>

            {news.link && (
              <div className="mt-4">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  View Full Article on ADA Website
                  <i className="fa fa-external-link ms-2"></i>
                </a>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">News Information</h5>
              </div>
              <div className="card-body">
                {news.category && (
                  <div className="mb-3">
                    <strong>Category:</strong>
                    <br />
                    {news.category}
                  </div>
                )}
                <hr />
                <Link to="/en/news" className="btn btn-outline-primary w-100">
                  View All News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsDetail;

