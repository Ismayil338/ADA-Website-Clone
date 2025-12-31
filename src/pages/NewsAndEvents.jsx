import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import EventsCard from '../components/EventsCard';

const NewsAndEvents = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/news')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
      })
      .then((data) => {
        setNews(data.slice(0, 6));
        setNewsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setNewsLoading(false);
      });
  }, []);

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

  const newsPreview = news.slice(0, 6);
  const eventsPreview = events.slice(0, 6);

  return (
    <main className="container-fluid p-0">
      <div className="container py-5">
        
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-3">
            <h2 className="fw-bold" style={{ color: '#003366', textTransform: 'uppercase' }}>Latest News</h2>
            <Link to="/en/news" className="btn btn-outline-danger rounded-0 px-4">SEE ALL NEWS</Link>
          </div>
          <div className="row" style={{ marginLeft: '-7.5px', marginRight: '-7.5px' }}>
            {newsLoading ? (
              <div className="col-12 text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : newsPreview.length > 0 ? (
              newsPreview.map((item) => (
                <div key={`news-${item.id}`} className="col-lg-4 col-md-6 col-12" style={{ paddingLeft: '7.5px', paddingRight: '7.5px', marginBottom: '15px' }}>
                  <NewsCard 
                    id={item.id}
                    href={item.link} 
                    imageSrc={item.image_url} 
                    imageAlt={item.title}
                    title={item.title} 
                    category={item.category}
                    className="w-100"
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-4">
                <p className="text-muted">No news available</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-3">
            <h2 className="fw-bold" style={{ color: '#003366', textTransform: 'uppercase' }}>Upcoming Events</h2>
            <Link to="/en/events" className="btn btn-outline-danger rounded-0 px-4">SEE ALL EVENTS</Link>
          </div>
          <div className="row" style={{ marginLeft: '-7.5px', marginRight: '-7.5px' }}>
            {eventsLoading ? (
              <div className="col-12 text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : eventsPreview.length > 0 ? (
              eventsPreview.map((item) => (
                <div key={`event-${item.id}`} className="col-lg-4 col-md-6 col-12" style={{ paddingLeft: '7.5px', paddingRight: '7.5px', marginBottom: '15px' }}>
                  <EventsCard 
                    id={item.id}
                    href={item.link}
                    imageSrc={item.image_url}
                    imageAlt={item.title}
                    date={item.date}
                    time={item.time || ''}
                    title={item.title}
                    className="w-100"
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