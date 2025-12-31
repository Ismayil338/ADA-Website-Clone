import React from 'react';

const SchoolsCard = ({ name, role, imageSrc, department, profileUrl }) => {
  return (
    <div className="grid-item-style-2">
      <a 
        className="grid-url text-decoration-none" 
        href={profileUrl || "#"}
        target={profileUrl ? "_blank" : undefined}
        rel={profileUrl ? "noopener noreferrer" : undefined}
      >
        <div className="image">
          <img alt={name} src={imageSrc} />
        </div>
        <div className="grid-title">{name}</div>
        <div className="grid-description">
          <b>{role}</b>
          <br />
          {department}
        </div>
      </a>
    </div>
  );
};

export default SchoolsCard;