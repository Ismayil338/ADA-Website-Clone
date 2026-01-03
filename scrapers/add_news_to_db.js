import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const newsPath = join(__dirname, 'data', 'news_items.json');
const dbPath = join(__dirname, 'db.json');

const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newsWithIds = newsData.map((news, index) => {
  return {
    id: index + 1,
    title: news.title,
    category: news.category,
    link: news.link,
    image_url: news.image_url
  };
});

dbData.news = newsWithIds;

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`✅ Добавлено ${newsWithIds.length} новостей в db.json`);
console.log(`📊 Всего новостей: ${newsWithIds.length}`);

