import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(__dirname, 'db.json');

const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
};

const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
};

app.get('/sb_faculty', (req, res) => {
  const data = readJSON(path.join(dataDir, 'sb_faculty.json'));
  res.json(data || []);
});

app.get('/site_faculty', (req, res) => {
  const data = readJSON(path.join(dataDir, 'site_faculty.json'));
  res.json(data || []);
});

app.get('/news', (req, res) => {
  const db = readJSON(dbPath);
  res.json(db?.news || []);
});

app.get('/events', (req, res) => {
  const db = readJSON(dbPath);
  res.json(db?.events || []);
});

app.get('/programs', (req, res) => {
  const db = readJSON(dbPath);
  res.json(db?.programs || []);
});

app.get('/research', (req, res) => {
  const db = readJSON(dbPath);
  res.json(db?.research || []);
});

app.put('/sb_faculty', (req, res) => {
  const data = req.body;
  if (writeJSON(path.join(dataDir, 'sb_faculty.json'), data)) {
    res.json({ success: true, message: 'SB Faculty updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update SB Faculty' });
  }
});

app.put('/site_faculty', (req, res) => {
  const data = req.body;
  if (writeJSON(path.join(dataDir, 'site_faculty.json'), data)) {
    res.json({ success: true, message: 'SITE Faculty updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update SITE Faculty' });
  }
});

app.put('/news', (req, res) => {
  const db = readJSON(dbPath);
  if (!db) {
    return res.status(500).json({ success: false, message: 'Failed to read database' });
  }
  db.news = req.body;
  if (writeJSON(dbPath, db)) {
    res.json({ success: true, message: 'News updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update news' });
  }
});

app.put('/events', (req, res) => {
  const db = readJSON(dbPath);
  if (!db) {
    return res.status(500).json({ success: false, message: 'Failed to read database' });
  }
  db.events = req.body;
  if (writeJSON(dbPath, db)) {
    res.json({ success: true, message: 'Events updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update events' });
  }
});

app.put('/programs', (req, res) => {
  const db = readJSON(dbPath);
  if (!db) {
    return res.status(500).json({ success: false, message: 'Failed to read database' });
  }
  db.programs = req.body;
  if (writeJSON(dbPath, db)) {
    res.json({ success: true, message: 'Programs updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update programs' });
  }
});

app.put('/research', (req, res) => {
  const db = readJSON(dbPath);
  if (!db) {
    return res.status(500).json({ success: false, message: 'Failed to read database' });
  }
  db.research = req.body;
  if (writeJSON(dbPath, db)) {
    res.json({ success: true, message: 'Research updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update research' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

