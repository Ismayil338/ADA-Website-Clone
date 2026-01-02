import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SchoolsCard from "../components/SchoolsCard";
import PageHeading from "../components/PageHeading";
import { generateBreadcrumbs } from "../utils/breadcrumbs";

const SchoolSB = () => {
  const location = useLocation();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/sb_faculty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SB faculty");
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
        title="School of Business"
        imageSrc="https://www.ada.edu.az/assets/img/header/header_business.jpg"
        breadcrumb={generateBreadcrumbs(location.pathname)}
      />
      <section className="text-content pt-0 pb-0 mb-5">
        <div className="container">
          <div className="headline">
            <h2 className="title color-primary">School of Business</h2>
          </div>
          <p>
            The School of Business is founded in 2011 at ADA University. With
            core curricula focusing on both breadth and depth of knowledge,
            experiential learning, and a skill set necessary to succeed in the
            ever-changing labor market, we strive to be world-class business
            school. We prepare graduates who are ready to impact and challenge
            the boundaries of conventional thinking about the ways in which
            business is conducted and policy is formulated. Our graduates are
            entrepreneurs of innovative spirit with a solid sense of ethics,
            honor, and integrity.
          </p>
          <p>
            ADA University School of Business is ACBSP (Accreditation Council
            for Business Schools and Programs) member since November 2019. In
            March 2020, we reached the “candidacy” status, which means the
            accreditation process of our MBA and BBA programs officially
            started. ADA University School of Business BBA and MBA programs have
            been accredited by the Accreditation Council for Business Schools
            and Programs&nbsp;(ACBSP) in 2024.&nbsp;
          </p>
          <div className="rest-content active">
            <p style={{marginLeft: '0px'}}>
              ACBSP accreditation evaluates aspects of leadership, strategic
              planning, relationships with stakeholders, quality of academic
              programs, faculty credentials, and educational support to
              determine whether the business programs offer a rigorous
              educational experience and demonstrate continuous quality
              improvement.
            </p>
          </div>
          <p>
            The main purpose of this process is to provide external validation
            of our degree programs by benchmarking against a set of external
            quality standards. It provides reassurance both that the service
            meets the needs of customers, but also that it matches the quality
            that the market expects. Achieving accreditation will also help
            position our programs with external audiences and join a prestigious
            network of accredited business schools. Finally, data from the
            accreditation process can be used to support internal quality
            improvement, both for content and delivery of programs.
          </p>
          <p>
            <a href="/media/2025/02/13/student_achievement_results_1_.pdf">
              <strong>
                <u>
                  Check the Public disclosure of student achievement under ACBSP
                  standards.
                </u>
              </strong>
            </a>
          </p>
          <p>
            <strong>
              At ADA School of Business, we strive to cultivate highly educated,
              socially responsible and ethical citizens who can succeed in the
              local and global business environment. We strive to be the premier
              business school in the region, offering our students a high
              quality and innovative learning experience.
            </strong>
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
                department={member.department || "School of Business"}
                profileUrl={member.profile_url}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SchoolSB;
