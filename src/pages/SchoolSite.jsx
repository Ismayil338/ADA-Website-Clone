import React, { useState, useEffect } from 'react';
import SchoolsCard from '../components/SchoolsCard';

const SchoolSite = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/site_faculty')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch SITE faculty');
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
      <h1 className="fw-bold mb-5" style={{ color: '#003366' }}>School of IT and Engineering Faculty</h1>
      <div className="row g-4">
        {faculty.map((member, index) => (
          <div key={index} className="col-lg-6 col-xl-3">
            <SchoolsCard 
              name={member.name}
              role={member.role}
              imageSrc={member.image_url}
              department="School of IT and Engineering"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default SchoolSite;