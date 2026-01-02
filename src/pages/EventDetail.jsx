import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const EventDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page page-event-detail">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading event details...</h2>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="page page-event-detail">
        <div className="container py-5 text-center">
          <h2 className="text-danger">Error: {error || 'Event not found'}</h2>
          <Link to="/en/events" className="btn btn-primary mt-3">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-event-detail">
      <PageHeading
        title={event.title || "Event Detail"}
        imageSrc={event.image_url || "https://www.ada.edu.az/assets/img/header/events-detail.png"}
        breadcrumb={generateBreadcrumbs(location.pathname, event.title || 'Event Detail')}
      />
      <div className="container py-5">
        <Link
          to="/en/events"
          className="btn btn-outline-secondary mb-4"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <i className="fa fa-arrow-left me-2"></i>Back to Events
        </Link>

        <div className="row">
          <div className="col-lg-8">
            {event.image_url && (
              <div className="mb-4">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <h1 className="mb-4" style={{ color: '#003366' }}>
              {event.title}
            </h1>

            <div className="event-meta mb-4">
              {event.date && (
                <div className="mb-2">
                  <i className="fa-solid fa-calendar me-2 text-primary"></i>
                  <strong>Date:</strong> {event.date}
                </div>
              )}
              {event.time && (
                <div className="mb-2">
                  <i className="fa-solid fa-clock me-2 text-primary"></i>
                  <strong>Time:</strong> {event.time}
                </div>
              )}
            </div>

            {event.link && (
              <div className="mt-4">
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  View Full Details on ADA Website
                  <i className="fa fa-external-link ms-2"></i>
                </a>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Event Information</h5>
              </div>
              <div className="card-body">
                {event.date && (
                  <div className="mb-3">
                    <strong>Date:</strong>
                    <br />
                    {event.date}
                  </div>
                )}
                {event.time && (
                  <div className="mb-3">
                    <strong>Time:</strong>
                    <br />
                    {event.time}
                  </div>
                )}
                <hr />
                <Link to="/en/events" className="btn btn-outline-primary w-100">
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;

