import React, { useState, useEffect } from 'react';
import SchoolsCard from '../components/SchoolsCard';

const SchoolSB = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/sb_faculty')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch SB faculty');
        return res.json();
      })
      .then((data) => {
        setFaculty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container py-5 text-center"><h2>Loading...</h2></div>;
  if (error) return <div className="container py-5 text-center text-danger"><h2>Error: {error}</h2></div>;

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-5" style={{ color: '#003366' }}>School of Business Faculty</h1>
      <div className="row g-4">
        {faculty.map((member, index) => (
          <div key={index} className="col-lg-6 col-xl-3">
            <SchoolsCard 
              name={member.name}
              role={member.role}
              imageSrc={member.image_url}
              department={member.department || "School of Business"}
              profileUrl={member.profile_url}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default SchoolSB;