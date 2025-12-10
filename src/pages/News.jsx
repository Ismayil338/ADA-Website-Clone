import NewsCard from '../components/NewsCard';
import newsItems from '../../data/news_items.json';

const News = () => (
  <main className="news-page container py-4">
    <h1 className="page-title">News</h1>
    <div className="row">
      {newsItems.map((item, index) => (
        <NewsCard
          key={`${item.link}-${index}`}
          href={item.link}
          imageSrc={item.image_url}
          imageAlt={item.title}
          category={item.category}
          title={item.title}
        />
      ))}
    </div>
  </main>
);

export default News;

