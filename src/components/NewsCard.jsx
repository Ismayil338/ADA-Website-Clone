import { Link } from 'react-router-dom';

const NewsCard = ({
  href = '#',
  imageSrc,
  imageAlt = '',
  category = '',
  title = '',
  colorClass = 'rgbRed',
  className = '',
  id = null,
}) => {
  const CardContent = ({ children }) => {
    if (id) {
      return (
        <Link to={`/en/news/${id}`} className="grid-url">
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

  const defaultColClass = className === undefined || className.includes('w-100') ? '' : 'col-lg-6';
  const finalClassName = `${defaultColClass} grid-item-style-1 mb-30 ${className || ''}`.trim();

  return (
    <div className={finalClassName}>
      <CardContent>
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
      </CardContent>
    </div>
  );
};

export default NewsCard;

