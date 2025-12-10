const SchoolsCard = ({
  href = '#',
  imageSrc,
  imageAlt = '',
  name = '',
  role = '',
  department = '',
  className = '',
}) => (
  <div className={`col-lg-6 col-xl-3 grid-item-style-2 ${className}`.trim()}>
    <a className="grid-url" href={href}>
      <div className="image">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
      </div>
      <div className="grid-title">{name}</div>
      <div className="grid-description">
        {role ? <b>{role}</b> : null}
        {role && department ? <br /> : null}
        {department}
      </div>
    </a>
  </div>
);

export default SchoolsCard;

