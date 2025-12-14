import React from 'react';
import { Link } from 'react-router-dom';

const SchoolsCard = ({ name, role, imageSrc, department, href }) => {
  return (
    <div className="grid-item-style-2">
      <Link className="grid-url text-decoration-none" to={href || "#"}>
        <div className="image">
          <img alt={name} src={imageSrc} />
        </div>
        <div className="grid-title">{name}</div>
        <div className="grid-description">
          <b>{role}</b>
          <br />
          {department}
        </div>
      </Link>
    </div>
  );
};

export default SchoolsCard;