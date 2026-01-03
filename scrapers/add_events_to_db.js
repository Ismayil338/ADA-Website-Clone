import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eventsPath = join(__dirname, 'data', 'events_items.json');
const dbPath = join(__dirname, 'db.json');

const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const eventsWithIds = eventsData.map((event, index) => {
  let title = event.title;
  if (title) {
    title = title.replace(/"/g, '\\"');
    title = event.title.replace(/"/g, '\\"');
  }
  
  return {
    id: index + 1,
    title: event.title,
    date: event.date,
    time: event.time,
    link: event.link,
    image_url: event.image_url
  };
});

dbData.events = eventsWithIds;

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`✅ Добавлено ${eventsWithIds.length} событий в db.json`);
console.log(`📊 Всего событий: ${eventsWithIds.length}`);

