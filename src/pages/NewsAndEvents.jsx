import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import EventsCard from '../components/EventsCard';
import newsItems from '../../data/news_items.json';

const NewsAndEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then((data) => {
        setEvents(data.slice(0, 6));
        setEventsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setEventsLoading(false);
      });
  }, []);

  const newsPreview = newsItems.slice(0, 6);
  const eventsPreview = events.slice(0, 6);

  return (
    <main className="container-fluid p-0">
      <div className="container py-5">
        
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-3">
            <h2 className="fw-bold" style={{ color: '#003366', textTransform: 'uppercase' }}>Latest News</h2>
            <Link to="/en/news" className="btn btn-outline-danger rounded-0 px-4">SEE ALL NEWS</Link>
          </div>
          <div className="row g-0">
            {newsPreview.map((item, index) => (
              <div key={`news-${index}`} className="col-lg-6 col-md-12">
                <NewsCard 
                  href={item.link} 
                  imageSrc={item.image_url} 
                  title={item.title} 
                  category={item.category}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-3">
            <h2 className="fw-bold" style={{ color: '#003366', textTransform: 'uppercase' }}>Upcoming Events</h2>
            <Link to="/en/events" className="btn btn-outline-danger rounded-0 px-4">SEE ALL EVENTS</Link>
          </div>
          <div className="row g-0">
            {eventsLoading ? (
              <div className="col-12 text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : eventsPreview.length > 0 ? (
              eventsPreview.map((item) => (
                <div key={`event-${item.id}`} className="col-lg-6 col-md-12">
                  <EventsCard 
                    id={item.id}
                    href={item.link}
                    imageSrc={item.image_url}
                    imageAlt={item.title}
                    date={item.date}
                    time={item.time || ''}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-4">
                <p className="text-muted">No events available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsAndEvents;