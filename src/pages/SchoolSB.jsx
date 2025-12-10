import SchoolsCard from '../components/SchoolsCard';
import sbFaculty from '../../data/sb_faculty.json';

const SchoolSB = () => (
  <main className="page page-school-sb container py-4">
    <h1 className="page-title">School of Business</h1>
    <div className="row">
      {sbFaculty.map((member, index) => (
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

export default SchoolSB;

