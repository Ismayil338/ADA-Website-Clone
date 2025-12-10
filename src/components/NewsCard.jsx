const NewsCard = ({
  href = '#',
  imageSrc,
  imageAlt = '',
  category = '',
  title = '',
  colorClass = 'rgbRed',
  className = '',
}) => (
  <div className={`col-lg-6 grid-item-style-1 mb-30 ${className}`.trim()}>
    <a className="grid-url" href={href}>
      <div className="image">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
      </div>

      <div className={`grid-item-foot ${colorClass}`.trim()}>
        <div className="date-and-time">
          {category ? (
            <span className="date">
              <i className="fa-solid fa-layer-group"></i> {category}
            </span>
          ) : null}
        </div>
        <div className="grid-title">{title}</div>
      </div>
    </a>
  </div>
);

export default NewsCard;

