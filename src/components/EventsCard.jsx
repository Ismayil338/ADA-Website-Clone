const EventsCard = ({
  href = '#',
  imageSrc,
  imageAlt = '',
  date = '',
  time = '',
  title = '',
  className = '',
}) => (
  <div className={`col-xl-6 grid-item-style-1 mb-30 ${className}`.trim()}>
    <a className="grid-url" href={href}>
      <div className="image">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
      </div>

      <div className="grid-item-foot">
        <div className="date-and-time">
          {date ? (
            <span className="date">
              <i className="fa-solid fa-calendar"></i> {date}
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
    </a>
  </div>
);

export default EventsCard;

