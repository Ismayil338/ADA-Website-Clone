import { useState, useEffect, useRef } from 'react';
import EventsCard from '../components/EventsCard';
import { Link, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import Pagination from '../components/Pagination';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const Events = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const eventsPerPage = 12;

  const eventTypes = [
    { name: 'Academic', count: 0 },
    { name: 'ADA School', count: 0 },
    { name: 'Admission', count: 0 },
    { name: 'Alumni', count: 0 },
    { name: 'Executive Education', count: 0 },
    { name: 'IDD', count: 0 },
    { name: 'Student', count: 0 },
    { name: 'University', count: 0 }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getTypeCounts = () => {
    const counts = {};
    eventTypes.forEach(type => {
      counts[type.name] = events.filter(e => e.type === type.name).length;
    });
    return counts;
  };

  const typeCounts = getTypeCounts();

  const filteredEvents = selectedType
    ? events.filter(event => event.type === selectedType)
    : events;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const leftColumnEvents = currentEvents.filter((_, index) => index % 2 === 0);
  const rightColumnEvents = currentEvents.filter((_, index) => index % 2 === 1);

  if (loading) {
    return (
      <main className="page page-events">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading events...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page page-events">
        <div className="container py-5 text-center text-danger">
          <h2>Error: {error}</h2>
          <p>Please make sure JSON-Server is running on port 5000</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-events">
      <PageHeading
        title="Events"
        imageSrc="https://www.ada.edu.az/assets/img/header/events-detail.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname, null, selectedType)}
        onBreadcrumbClick={() => {
          setSelectedType(null);
          setCurrentPage(1);
        }}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            {filteredEvents.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fa fa-info-circle me-2"></i>
                No events found.
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6">
                    {leftColumnEvents.map((event) => (
                      <div key={event.id} className="mb-4">
                        <EventsCard
                          id={event.id}
                          href={event.link}
                          imageSrc={event.image_url}
                          imageAlt={event.title}
                          date={event.date}
                          time={event.time || ''}
                          title={event.title}
                          className="w-100"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="col-md-6">
                    {rightColumnEvents.map((event) => (
                      <div key={event.id} className="mb-4">
        <EventsCard
                          id={event.id}
                          href={event.link}
                          imageSrc={event.image_url}
                          imageAlt={event.title}
                          date={event.date}
                          time={event.time || ''}
                          title={event.title}
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
                Event types:
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
                {eventTypes.map((type) => {
                  const count = typeCounts[type.name] || 0;
                  const isActive = selectedType === type.name;
                  
                  return (
                    <button
                      key={type.name}
                      type="button"
                      className="btn text-start"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#000',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        padding: '10px 15px 10px 25px',
                        position: 'relative',
                        boxShadow: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => {
                        const button = e.currentTarget;
                        button.style.color = '#dc3545';
                        button.style.backgroundColor = 'transparent';
                        const dot = button.querySelector('.event-type-dot');
                        if (dot) {
                          dot.style.borderColor = '#dc3545';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const button = e.currentTarget;
                        button.style.color = '#000';
                        button.style.backgroundColor = 'transparent';
                        const dot = button.querySelector('.event-type-dot');
                        if (dot) {
                          dot.style.borderColor = '#000';
                        }
                      }}
                      onClick={() => {
                        setSelectedType(isActive ? null : type.name);
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          className="event-type-dot"
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            border: '2px solid #000',
                            backgroundColor: 'transparent',
                            transition: 'border-color 0.3s ease',
                            flexShrink: 0
                          }}
                        />
                        {type.name}
                      </span>
                      <span>({count})</span>
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

export default Events;
