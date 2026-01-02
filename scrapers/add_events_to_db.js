import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Читаем файлы
const eventsPath = join(__dirname, 'data', 'events_items.json');
const dbPath = join(__dirname, 'db.json');

const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Преобразуем события: добавляем id и исправляем кавычки в title
const eventsWithIds = eventsData.map((event, index) => {
  // Экранируем кавычки в title для JSON
  let title = event.title;
  if (title) {
    // Заменяем двойные кавычки на экранированные
    title = title.replace(/"/g, '\\"');
    // Но если title уже в кавычках, нужно правильно обработать
    title = event.title.replace(/"/g, '\\"');
  }
  
  return {
    id: index + 1,
    title: event.title, // JSON.stringify автоматически экранирует
    date: event.date,
    time: event.time,
    link: event.link,
    image_url: event.image_url
  };
});

// Добавляем события в db.json
dbData.events = eventsWithIds;

// Сохраняем обновленный db.json
fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`✅ Добавлено ${eventsWithIds.length} событий в db.json`);
console.log(`📊 Всего событий: ${eventsWithIds.length}`);

