const PublicationCard = ({ title, author, schoolLabel, link = '#', className = '' }) => (
  <div className={`col-lg-6 mb-3 ${className}`.trim()}>
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {author ? <p className="card-subtitle mb-2 text-muted">{author}</p> : null}
        {schoolLabel ? <p className="badge bg-secondary">{schoolLabel}</p> : null}
        {link ? (
          <div className="mt-2">
            <a href={link} target="_blank" rel="noreferrer" className="card-link">
              View publication
            </a>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

export default PublicationCard;

