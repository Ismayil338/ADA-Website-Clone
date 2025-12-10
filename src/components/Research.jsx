import ResearchCard from '../components/ResearchCard';
import researchItems from '../../data/research_items.json';

const Research = () => (
  <main className="page page-research container py-4">
    <h1 className="page-title">Research</h1>
    <div className="row">
      {researchItems.map((item, index) => (
        <ResearchCard
          key={`${item.link || item.title}-${index}`}
          title={item.title}
          author={item.author}
          schoolLabel={item.school_label}
          link={item.link || '#'}
          dataName={item.title}
          dataSchool={(item.school_label || '').toLowerCase()}
        />
      ))}
    </div>
  </main>
);

export default Research;

