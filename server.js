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

// Individual item routes
app.get('/news/:id', (req, res) => {
  const db = readJSON(dbPath);
  const news = db?.news || [];
  const item = news.find(n => n.id === parseInt(req.params.id) || n.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'News not found' });
  }
});

app.get('/events/:id', (req, res) => {
  const db = readJSON(dbPath);
  const events = db?.events || [];
  const item = events.find(e => e.id === parseInt(req.params.id) || e.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.get('/programs/:id', (req, res) => {
  const db = readJSON(dbPath);
  const programs = db?.programs || [];
  const item = programs.find(p => p.id === parseInt(req.params.id) || p.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Program not found' });
  }
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

// Root route - show available endpoints
app.get('/', (req, res) => {
  const endpoints = {
    message: 'JSON Server API',
    endpoints: {
      GET: [
        '/news',
        '/news/:id',
        '/events',
        '/events/:id',
        '/programs',
        '/programs/:id',
        '/research',
        '/sb_faculty',
        '/site_faculty'
      ],
      PUT: [
        '/news',
        '/events',
        '/programs',
        '/research',
        '/sb_faculty',
        '/site_faculty'
      ]
    },
    baseUrl: `http://localhost:${PORT}`
  };
  res.json(endpoints);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET  /news');
  console.log('  GET  /news/:id');
  console.log('  GET  /events');
  console.log('  GET  /events/:id');
  console.log('  GET  /programs');
  console.log('  GET  /programs/:id');
  console.log('  GET  /research');
  console.log('  GET  /sb_faculty');
  console.log('  GET  /site_faculty');
  console.log('  PUT  /news');
  console.log('  PUT  /events');
  console.log('  PUT  /programs');
  console.log('  PUT  /research');
  console.log('  PUT  /sb_faculty');
  console.log('  PUT  /site_faculty');
  console.log('\nVisit http://localhost:5000/ to see all endpoints\n');
});

