const ResearchCard = ({
  title,
  author,
  schoolLabel,
  link = '#',
  target = '_blank',
  dataName = '',
  dataSchool = '',
  dataFavorite = '',
  className = '',
}) => {
  return (
    <div
      className={`col-md-6 col-xl-4 filtered-item ${className}`.trim()}
      data-name={dataName || undefined}
      data-school={dataSchool || undefined}
      data-favorite={dataFavorite || undefined}
    >
      <a className="program-result-item" href={link} target={target}>
        <div
          className="title position-relative"
          style={{
            minHeight: '160px',
            fontWeight: 600,
          }}
        >
          <span>{title}</span>
          {schoolLabel ? (
            <span className="position-absolute bottom-0 end-0 p-3 pb-1" style={{ fontWeight: 400 }}>
              {schoolLabel}
            </span>
          ) : null}
        </div>
        {author ? (
          <div className="level graduate" style={{ textTransform: 'none' }}>
            {author}
          </div>
        ) : null}
      </a>
    </div>
  );
};

export default ResearchCard;

