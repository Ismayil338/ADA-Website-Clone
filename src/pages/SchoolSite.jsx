import SchoolsCard from '../components/SchoolsCard';
import siteFaculty from '../../data/site_faculty.json';

const SchoolSite = () => (
  <main className="page page-school-site container py-4">
    <h1 className="page-title">School of IT &amp; Engineering</h1>
    <div className="row">
      {siteFaculty.map((member, index) => (
        <SchoolsCard
          key={`${member.profile_url}-${index}`}
          href={member.profile_url}
          imageSrc={member.image_url}
          imageAlt={member.name}
          name={member.name}
          role={member.role}
          department={member.department}
        />
      ))}
    </div>
  </main>
);

export default SchoolSite;

