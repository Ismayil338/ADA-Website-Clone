import ProgramCard from '../components/ProgramCard';
import programs from '../../data/programs_items.json';

const Programs = () => (
  <main className="page page-programs container py-4">
    <h1 className="page-title">Programs</h1>
    <div className="row">
      {programs.map((program, index) => (
        <ProgramCard
          key={`${program.link}-${index}`}
          title={program.title}
          schoolLabel={program.school_label}
          level={program.level}
          link={program.link}
          dataName={program.title}
          dataSchool={(program.school_label || '').toLowerCase()}
          dataDegree={(program.level || '').toLowerCase()}
        />
      ))}
    </div>
  </main>
);

export default Programs;

