import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const programsPath = join(__dirname, 'data', 'programs_items.json');
const dbPath = join(__dirname, 'db.json');

const programsData = JSON.parse(fs.readFileSync(programsPath, 'utf8'));
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const programsWithIds = programsData.map((program, index) => {
  return {
    id: index + 1,
    title: program.title,
    school_label: program.school_label,
    level: program.level,
    link: program.link
  };
});

dbData.programs = programsWithIds;

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

console.log(`✅ Добавлено ${programsWithIds.length} программ в db.json`);
console.log(`📊 Всего программ: ${programsWithIds.length}`);

