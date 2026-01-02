import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SchoolsCard from "../components/SchoolsCard";
import PageHeading from "../components/PageHeading";
import { generateBreadcrumbs } from "../utils/breadcrumbs";

const SchoolSite = () => {
  const location = useLocation();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/site_faculty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SITE faculty");
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

  if (loading)
    return (
      <div className="container py-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="container py-5 text-center text-danger">
        <h2>Error: {error}</h2>
      </div>
    );

  return (
    <main className="page">
      <PageHeading
        title="School Of Information Technologies And Engineering"
        imageSrc="https://www.ada.edu.az/assets/img/header/header_it.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />
      <section class="text-content pt-0 pb-0 mb-5">
        <div class="container">
          <div class="headline">
            <h2 class="title color-primary">School of IT and Engineering</h2>
          </div>
          <p>
            The School of Information Technologies and Engineering (SITE) was
            founded in 2013. IT was founded with a vision to become a center of
            excellence in education and a hub of scientific research and
            discovery of global caliber in the region. Our mission is to produce
            highly intellectual solution providers with innovative and creative
            minds and enhanced communication skills who will give back to
            society by finding and designing new ways in which cutting edge
            technology will improve lives. We strive to create a thriving
            environment, which encourages gender inclusivity, where education,
            research and industry meet and melt into practical applications
            through our initiatives in Big Data research, applications of
            Artificial Intelligence, and techno-entrepreneurship.
          </p>
        </div>
      </section>
      <div className="container py-5">
        <div className="row g-4">
          {faculty.map((member, index) => (
            <div key={index} className="col-lg-6 col-xl-3">
              <SchoolsCard
                name={member.name}
                role={member.role}
                imageSrc={member.image_url}
                department={member.department || "School of IT and Engineering"}
                profileUrl={member.profile_url}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SchoolSite;
