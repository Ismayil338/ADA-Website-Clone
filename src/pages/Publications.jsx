import PublicationCard from '../components/PublicationCard';
import researchItems from '../../data/research_items.json';

const Publications = () => (
  <main className="page page-publications container py-4">
    <h1 className="page-title">Publications</h1>
    <div className="row">
      {researchItems.map((item, index) => (
        <PublicationCard
          key={`${item.title}-${index}`}
          title={item.title}
          author={item.author}
          schoolLabel={item.school_label}
          link={item.link}
        />
      ))}
    </div>
  </main>
);

export default Publications;

