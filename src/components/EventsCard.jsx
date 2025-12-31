import { Link } from 'react-router-dom';

const EventsCard = ({
  href = '#',
  imageSrc,
  imageAlt = '',
  date = '',
  time = '',
  title = '',
  className = '',
  id = null,
}) => {
  const CardContent = ({ children }) => {
    if (id) {
      return (
        <Link to={`/en/events/${id}`} className="grid-url">
          {children}
        </Link>
      );
    }
    return (
      <a className="grid-url" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  };

  const defaultColClass = className === undefined ? 'col-xl-6' : '';
  const finalClassName = `${defaultColClass} grid-item-style-1 mb-30 ${className || ''}`.trim();

  return (
    <div className={finalClassName}>
      <CardContent>
        <div className="image">
          {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
        </div>

        <div className="grid-item-foot">
          <div className="date-and-time">
            {date ? (
              <span className="date">
                <i className="fa-solid fa-calendar" style={{ color: '#fff' }}></i> {date}
              </span>
            ) : null}
            {time ? (
              <span className="time">
                <i className="fa-solid fa-clock"></i> {time}
              </span>
            ) : null}
          </div>
          <div className="grid-title">{title}</div>
        </div>
      </CardContent>
    </div>
  );
};

export default EventsCard;

