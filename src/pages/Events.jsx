import { useState, useEffect, useRef } from 'react';
import EventsCard from '../components/EventsCard';
import { Link, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
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
        breadcrumb={generateBreadcrumbs(location.pathname)}
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
                        e.target.style.color = '#dc3545';
                        const dot = e.target.querySelector('.event-type-dot');
                        if (dot) {
                          dot.style.borderColor = '#dc3545';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#000';
                        const dot = e.target.querySelector('.event-type-dot');
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
