import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';

const ProgramDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/programs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Program not found');
        return res.json();
      })
      .then((data) => {
        setProgram(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page page-program-detail">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3">Loading program details...</h2>
        </div>
      </main>
    );
  }

  if (error || !program) {
    return (
      <main className="page page-program-detail">
        <div className="container py-5 text-center">
          <h2 className="text-danger">Error: {error || 'Program not found'}</h2>
          <Link to="/en/admission/find-your-program" className="btn btn-primary mt-3">
            Back to Programs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-program-detail">
      <PageHeading
        title={program.title || "Program Detail"}
        imageSrc={program.image_url || "https://www.ada.edu.az/media/2024/07/29/find_your_program_2.jpg"}
        breadcrumb={generateBreadcrumbs(location.pathname, program.title || 'Program Detail')}
      />
      <div className="container py-5">
        <Link
          to="/en/admission/find-your-program"
          className="btn btn-outline-secondary mb-4"
        >
          <i className="fa fa-arrow-left me-2"></i>Back to Programs
        </Link>

        <div className="row">
          <div className="col-lg-8">
            {program.image_url && (
              <div className="mb-4">
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <h1 className="mb-4" style={{ color: '#003366' }}>
              {program.title}
            </h1>

            <div className="program-meta mb-4">
              {program.school_label && (
                <div className="mb-2">
                  <i className="fa-solid fa-building me-2 text-primary"></i>
                  <strong>School:</strong> {program.school_label}
                </div>
              )}
              {program.level && (
                <div className="mb-2">
                  <i className="fa-solid fa-graduation-cap me-2 text-primary"></i>
                  <strong>Level:</strong> {program.level}
                </div>
              )}
            </div>

            {program.link && (
              <div className="mt-4">
                <a
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  View Full Details on ADA Website
                  <i className="fa fa-external-link ms-2"></i>
                </a>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Program Information</h5>
              </div>
              <div className="card-body">
                {program.school_label && (
                  <div className="mb-3">
                    <strong>School:</strong>
                    <br />
                    {program.school_label}
                  </div>
                )}
                {program.level && (
                  <div className="mb-3">
                    <strong>Level:</strong>
                    <br />
                    {program.level}
                  </div>
                )}
                <hr />
                <Link to="/en/admission/find-your-program" className="btn btn-outline-primary w-100">
                  View All Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgramDetail;

