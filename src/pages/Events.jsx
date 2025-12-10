import EventsCard from '../components/EventsCard';
import eventsItems from '../../data/events_items.json';

const Events = () => (
  <main className="page page-events container py-4">
    <h1 className="page-title">Events</h1>
    <div className="row">
      {eventsItems.map((item, index) => (
        <EventsCard
          key={`${item.link}-${index}`}
          href={item.link}
          imageSrc={item.image_url}
          imageAlt={item.title}
          date={item.date}
          time={item.time || ''}
          title={item.title}
        />
      ))}
    </div>
  </main>
);

export default Events;

