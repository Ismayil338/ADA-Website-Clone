import { useLocation } from 'react-router-dom';
import ResearchCard from '../components/ResearchCard';
import PageHeading from '../components/PageHeading';
import { generateBreadcrumbs } from '../utils/breadcrumbs';
import researchItems from '../../data/research_items.json';

const Research = () => {
  const location = useLocation();
  return (
  <main className="page page-research">
    <PageHeading
      title="Research"
      imageSrc="https://www.ada.edu.az/assets/img/header/admission.jpg"
      breadcrumb={generateBreadcrumbs(location.pathname)}
    />
    <div className="container py-4">
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
    </div>
  </main>
  );
};

export default Research;

