import React from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import EventsCard from '../components/EventsCard';
import newsItems from '../../data/news_items.json';
import eventsItems from '../../data/events_items.json';

const NewsAndEvents = () => {
  const newsPreview = newsItems.slice(0, 6);
  const eventsPreview = eventsItems.slice(0, 6);

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
            {eventsPreview.map((item, index) => (
              <div key={`event-${index}`} className="col-lg-6 col-md-12">
                <EventsCard 
                  href={item.link}
                  imageSrc={item.image_url}
                  date={item.date}
                  time={item.time || ''}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsAndEvents;