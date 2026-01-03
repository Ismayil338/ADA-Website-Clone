import { Link } from 'react-router-dom';

const ProgramCard = ({
  title,
  schoolLabel,
  level,
  link = '#',
  imageSrc = '',
  target = '_blank',
  dataName = '',
  dataSchool = '',
  dataDegree = '',
  dataFormat = '',
  className = '',
  id = null,
}) => {
  const bgStyle = imageSrc
    ? {
        backgroundImage: `url('${imageSrc}')`,
      }
    : undefined;

  const defaultColClass = className && className.includes('w-100') ? '' : 'col-md-6 col-xl-4';
  const finalClassName = `${defaultColClass} filtered-item ${className || ''}`.trim();

  const CardContent = ({ children }) => {
    // Prioritize local route (id) over external link (link)
    if (id) {
      return (
        <Link to={`/en/programs/${id}`} className="program-result-item">
          {children}
        </Link>
      );
    }
    if (link && link !== '#') {
      return (
        <a className="program-result-item" href={link} target={target}>
          {children}
        </a>
      );
    }
    return (
      <a className="program-result-item" href={link} target={target}>
        {children}
      </a>
    );
  };

  return (
    <div
      className={finalClassName}
      data-name={dataName || undefined}
      data-school={dataSchool || undefined}
      data-degree={dataDegree || undefined}
      data-format={dataFormat || undefined}
    >
      <CardContent>
        <div
          className="title position-relative"
          style={{
            minHeight: '160px',
            fontWeight: 600,
            ...(bgStyle || { backgroundImage: "url('https://www.ada.edu.az/media/2024/07/04/4-1.jpg')" }),
          }}
        >
          <span>{title}</span>
          {schoolLabel ? (
            <span className="position-absolute bottom-0 end-0 p-3 pb-1" style={{ fontWeight: 400 }}>
              {schoolLabel}
            </span>
          ) : null}
        </div>
        {level ? <div className={`level ${level.toLowerCase()}`}>{level}</div> : null}
      </CardContent>
    </div>
  );
};

export default ProgramCard;

