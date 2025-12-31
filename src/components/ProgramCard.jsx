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
}) => {
  const bgStyle = imageSrc
    ? {
        backgroundImage: `url('${imageSrc}')`,
      }
    : undefined;

  const defaultColClass = className && className.includes('w-100') ? '' : 'col-md-6 col-xl-4';
  const finalClassName = `${defaultColClass} filtered-item ${className || ''}`.trim();

  return (
    <div
      className={finalClassName}
      data-name={dataName || undefined}
      data-school={dataSchool || undefined}
      data-degree={dataDegree || undefined}
      data-format={dataFormat || undefined}
    >
      <a className="program-result-item" href={link} target={target}>
        <div
          className="title position-relative"
          style={{
            minHeight: '160px',
            fontWeight: 600,
            ...(bgStyle || {}),
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
      </a>
    </div>
  );
};

export default ProgramCard;

