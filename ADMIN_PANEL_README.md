# Admin Panel Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run server
```

The server will run on `http://localhost:5000`

3. Start the frontend (in a separate terminal):
```bash
npm run dev
```

4. Access the admin panel at:
```
http://localhost:5173/admin
```

**Default Password:** `admin123`

## Features

The admin panel allows you to edit the following data types:

- **SB Faculty** - School of Business faculty members
- **SITE Faculty** - School of IT and Engineering faculty members
- **News** - News articles
- **Events** - Events
- **Programs** - Academic programs
- **Research** - Research items

## Usage

1. Select a tab to view the corresponding data
2. Click "Add New" to add a new item
3. Click "Edit" on any row to edit an item
4. Click "Delete" to remove an item
5. Click "Save All Changes" to persist your changes to the JSON files
6. Click "Reload" to refresh the data from the server

## API Endpoints

The server provides the following endpoints:

- `GET /sb_faculty` - Get SB faculty data
- `PUT /sb_faculty` - Update SB faculty data
- `GET /site_faculty` - Get SITE faculty data
- `PUT /site_faculty` - Update SITE faculty data
- `GET /news` - Get news data
- `PUT /news` - Update news data
- `GET /events` - Get events data
- `PUT /events` - Update events data
- `GET /programs` - Get programs data
- `PUT /programs` - Update programs data
- `GET /research` - Get research data
- `PUT /research` - Update research data

## Data Files

The data is stored in:
- `data/sb_faculty.json` - SB faculty data
- `data/site_faculty.json` - SITE faculty data
- `db.json` - Contains news, events, programs, and research data

## Notes

- Always make sure to click "Save All Changes" after making edits
- The changes are written directly to the JSON files
- It's recommended to backup your data files before making bulk changes

