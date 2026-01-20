# ADA University Website Clone - Project Instructions

## Project Overview

This project is a functional replica of the ADA University website (https://www.ada.edu.az/en) built with React and a custom Express.js backend server. The application provides a comprehensive university website experience including information about schools, programs, news, events, faculty members, and more.

### Key Features

- **Multi-page Website**: Complete navigation system with React Router
- **Dynamic Content**: All data is fetched from JSON files via REST API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Theme switching with localStorage persistence
- **Search Functionality**: Search across news and programs
- **Admin Panel**: Protected admin interface for editing JSON data
- **Interactive Elements**: 
  - Carousels and sliders
  - Animated counters
  - Snowflake animation (seasonal feature)

### Pages Implemented

- **Home**: Main landing page with hero section, carousels, and statistics
- **About**: Information about ADA University and Italy-Azerbaijan University
- **Schools**: 
  - School of Business (SB)
  - School of IT and Engineering (SITE)
- **Programs**: Find your program with filtering and search
- **News**: News articles with category filtering
- **Events**: Events listing with type filtering
- **Research**: Research publications and articles
- **Admin Panel**: Protected interface for data management

## Tech Stack

### Frontend
- **[React 19.2.0](https://react.dev/)**: Modern React with hooks
- **[React Router 7.10.1](https://reactrouter.com/)**: Client-side routing
- **[Vite 7.2.4](https://vite.dev/)**: Build tool and dev server
- **[Bootstrap 5.3.8](https://getbootstrap.com/)**: CSS framework for responsive design
- **[Swiper 12.0.3](https://swiperjs.com/)**: Touch slider for carousels
- **[Font Awesome 7.1.0](https://fontawesome.com/)**: Icon library

### Backend
- **[Express.js 4.18.2](https://expressjs.com/)**: Web server framework
- **[CORS 2.8.5](https://www.npmjs.com/package/cors)**: Cross-origin resource sharing
- **[Node.js](https://nodejs.org/en)**: Runtime environment

### Data Storage
- **JSON Files**: 
  - `db.json`: Main database with news, events, programs, research
  - `data/sb_faculty.json`: School of Business faculty
  - `data/site_faculty.json`: School of IT and Engineering faculty
  - `data/news_items.json`: News articles
  - `data/events_items.json`: Events
  - `data/programs_items.json`: Academic programs
  - `data/research_items.json`: Research items

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **PurgeCSS**: CSS optimization

## How to Run the Project

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd final-project-10211_team4-main3
```

2. **Install dependencies**:
```bash
npm install
```

### Running the Application

The project requires two servers to run simultaneously:
1. **Backend Server** (Express.js) - Port 5000
2. **Frontend Dev Server** (Vite) - Port 5173

#### Option 1: Run Both Servers Separately (Recommended)

**Terminal 1 - Start Backend Server (Express.js)**:
```bash
npm run server
```

The backend server will start on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server**:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Option 2: Run Both Servers Together

```bash
npm start
```

This command runs both servers concurrently.

#### Option 3: Using JSON Server (Alternative)

If you prefer to use `json-server` instead of the Express.js server:

**Terminal 1 - Start JSON Server**:
```bash
npx json-server --watch db.json --port 5000
```

**Terminal 2 - Start Frontend Dev Server**:
```bash
npm run dev
```

**Note**: When using json-server, the API endpoints will be slightly different:
- `GET http://localhost:5000/news` (instead of `/news`)
- `GET http://localhost:5000/events` (instead of `/events`)
- `GET http://localhost:5000/programs` (instead of `/programs`)
- `GET http://localhost:5000/research` (instead of `/research`)

For faculty data, you'll need to use the Express.js server or manually serve the JSON files.

## API Endpoints

The backend server provides the following REST API endpoints:

### Faculty Endpoints

#### Get SB Faculty
```http
GET http://localhost:5000/sb_faculty
```

**Response**: Array of faculty members
```json
[
  {
    "name": "Huseyn Ismayilov",
    "role": "Dean, School of Business",
    "department": "School of Business",
    "profile_url": "https://www.ada.edu.az/en/schools/sb/members/faculty/25-huseyn-ismayilov",
    "image_url": "https://www.ada.edu.az/media/2024/05/31/1to1_medium/huseyn_ismayilov.jpg",
    "source_page": "https://www.ada.edu.az/en/schools/sb"
  }
]
```

#### Update SB Faculty
```http
PUT http://localhost:5000/sb_faculty
Content-Type: application/json

[
  {
    "name": "Updated Name",
    "role": "Updated Role",
    ...
  }
]
```

**Response**: Array of news articles
```json
[
  {
    "id": 1,
    "title": "News Title",
    "category": "Academic",
    "date": "2024-01-15",
    "image_url": "https://example.com/image.jpg",
    "link": "/en/news/1",
    "excerpt": "News excerpt..."
  }
]
```

#### Update News
```http
PUT http://localhost:5000/news
Content-Type: application/json

[...]
```

### Events Endpoints

#### Get All Events
```http
GET http://localhost:5000/events
```

**Response**: Array of events
```json
[
  {
    "id": 1,
    "title": "Event Title",
    "type": "Conference",
    "date": "2024-02-20",
    "time": "10:00",
    "location": "Main Hall",
    "image_url": "https://example.com/image.jpg",
    "link": "/en/events/1"
  }
]
```

#### Update Events
```http
PUT http://localhost:5000/events
Content-Type: application/json

[...]
```

### Programs Endpoints

#### Get All Programs
```http
GET http://localhost:5000/programs
```

**Response**: Array of programs
```json
[
  {
    "id": 1,
    "title": "Business Administration",
    "school_label": "SB",
    "level": "Undergraduate",
    "link": "https://www.ada.edu.az/en/schools/sb/programs/business-administration"
  }
]
```

#### Update Programs
```http
PUT http://localhost:5000/programs
Content-Type: application/json

[...]
```

### Research Endpoints

#### Get All Research
```http
GET http://localhost:5000/research
```

#### Update Research
```http
PUT http://localhost:5000/research
Content-Type: application/json

[...]
```

## API Examples

### Example 1: Fetching News

```javascript
// Using fetch with Promise
fetch('http://localhost:5000/news')
  .then(res => res.json())
  .then(data => {
    console.log('News:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Using async/await
async function getNews() {
  try {
    const response = await fetch('http://localhost:5000/news');
    const news = await response.json();
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Using in React component
import { useEffect, useState } from 'react';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* Render news */}</div>;
}
```

### Example 2: Fetching Faculty Data

```javascript
// Get School of Business Faculty
async function getSBFaculty() {
  try {
    const response = await fetch('http://localhost:5000/sb_faculty');
    const faculty = await response.json();
    return faculty;
  } catch (error) {
    console.error('Error fetching SB faculty:', error);
    return [];
  }
}

// Get School of IT and Engineering Faculty
async function getSiteFaculty() {
  try {
    const response = await fetch('http://localhost:5000/site_faculty');
    const faculty = await response.json();
    return faculty;
  } catch (error) {
    console.error('Error fetching SITE faculty:', error);
    return [];
  }
}
```

### Example 3: Updating Faculty Data

```javascript
const updatedFaculty = [
  {
    "name": "John Doe",
    "role": "Professor",
    "department": "Computer Science",
    "profile_url": "https://example.com/profile",
    "image_url": "https://example.com/image.jpg",
    "source_page": "https://example.com"
  }
];

// Update SB Faculty
fetch('http://localhost:5000/sb_faculty', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedFaculty)
})
  .then(res => res.json())
  .then(data => {
    console.log('Update successful:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Using async/await
async function updateFaculty(facultyData, school = 'sb') {
  try {
    const endpoint = school === 'sb' ? 'sb_faculty' : 'site_faculty';
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facultyData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating faculty:', error);
    throw error;
  }
}
```

### Example 4: Fetching and Filtering Events

```javascript
// Get all events
async function getEvents() {
  try {
    const response = await fetch('http://localhost:5000/events');
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Filter events by type
async function getEventsByType(type) {
  const events = await getEvents();
  return events.filter(event => event.type === type);
}

// Get upcoming events (future dates)
async function getUpcomingEvents() {
  const events = await getEvents();
  const today = new Date();
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}
```

### Example 5: Filtering Programs

```javascript
// Get all programs
async function getAllPrograms() {
  try {
    const response = await fetch('http://localhost:5000/programs');
    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}

// Filter by school
async function getProgramsBySchool(schoolLabel) {
  const programs = await getAllPrograms();
  return programs.filter(p => p.school_label === schoolLabel);
}

// Filter by level
async function getProgramsByLevel(level) {
  const programs = await getAllPrograms();
  return programs.filter(p => p.level === level);
}

// Search programs by title
async function searchPrograms(searchTerm) {
  const programs = await getAllPrograms();
  return programs.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Combined filtering
async function getFilteredPrograms(filters) {
  const { school, level, search } = filters;
  let programs = await getAllPrograms();
  
  if (school) {
    programs = programs.filter(p => p.school_label === school);
  }
  
  if (level) {
    programs = programs.filter(p => p.level === level);
  }
  
  if (search) {
    programs = programs.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return programs;
}
```

### Example 6: Updating News, Events, Programs, or Research

```javascript
// Generic update function
async function updateData(endpoint, data) {
  try {
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
}

// Update news
const updatedNews = [
  {
    "id": 1,
    "title": "Updated News Title",
    "category": "Academic",
    "date": "2024-01-15",
    "image_url": "https://example.com/image.jpg",
    "link": "/en/news/1",
    "excerpt": "Updated excerpt..."
  }
];
await updateData('news', updatedNews);

// Update events
const updatedEvents = [/* event objects */];
await updateData('events', updatedEvents);

// Update programs
const updatedPrograms = [/* program objects */];
await updateData('programs', updatedPrograms);

// Update research
const updatedResearch = [/* research objects */];
await updateData('research', updatedResearch);
```

### Example 7: Error Handling

```javascript
// Comprehensive error handling
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: error.message };
  }
}

// Usage
const result = await fetchWithErrorHandling('http://localhost:5000/news');
if (result.success) {
  console.log('News:', result.data);
} else {
  console.error('Failed to fetch news:', result.error);
}
```

## Project Structure

```
final-project-10211_team4-main/
├── data/                    # JSON data files
│   ├── sb_faculty.json
│   ├── site_faculty.json
│   ├── news_items.json
│   ├── events_items.json
│   ├── programs_items.json
│   └── research_items.json
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── NewsCard.jsx
│   │   ├── EventsCard.jsx
│   │   ├── ProgramCard.jsx
│   │   ├── SchoolsCard.jsx
│   │   └── PageHeading.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── News.jsx
│   │   ├── Events.jsx
│   │   ├── Programs.jsx
│   │   ├── SchoolSB.jsx
│   │   ├── SchoolSite.jsx
│   │   ├── Research.jsx
│   │   ├── AboutADA.jsx
│   │   └── Admin.jsx
│   ├── utils/              # Utility functions
│   │   └── breadcrumbs.js
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.jsx            # Entry point
├── server.js                # Express backend server
├── db.json                  # Main database file
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── PROJECT-INSTRUCTIONS.md  # This file
```

## Admin Panel

The project includes a protected admin panel for managing JSON data.

### Access

Navigate to: `http://localhost:5173/admin`

### Default Password

**Password**: `admin123`

### Features

- Edit faculty members (SB and SITE)
- Manage news articles
- Manage events
- Manage programs
- Manage research items
- Add, edit, and delete records
- Save changes to JSON files

## Key Features Implementation

### Dark/Light Theme

The theme is stored in localStorage and persists across page reloads:
```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

### Search Functionality

Global search in the navbar searches across:
- News articles (title and category)
- Programs (title and school label)

### Responsive Design

- Bootstrap grid system for layout
- Mobile-first approach
- Collapsible mobile menu
- Responsive images and cards

### Animations

- Counter animations on scroll (Home page)
- Carousel animations (Swiper.js)
- Snowflake animation (seasonal feature)
- Smooth transitions and hover effects

## Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

**Backend (Port 5000)**:
- Change `PORT` in `server.js`
- Update API URLs in frontend code

**Frontend (Port 5173)**:
- Vite will automatically suggest an alternative port
- Or specify: `npm run dev -- --port 3000`

## Additional Resources

- **React Documentation**: https://react.dev
- **React Router**: https://reactrouter.com
- **Vite Documentation**: https://vite.dev
- **Bootstrap**: https://getbootstrap.com
- **Swiper.js**: https://swiperjs.com

## Demo Video

https://www.youtube.com/watch?v=OyhR99MEUNs

## Screenshots

<img width="2559" height="1522" alt="Screenshot 2026-01-03 130708" src="https://github.com/user-attachments/assets/203f1056-7956-4fd9-812a-5c3bfcca5fce" />
<img width="2559" height="1527" alt="Screenshot 2026-01-03 130725" src="https://github.com/user-attachments/assets/62045d84-ed4d-4529-a141-4e38ec727f1b" />
<img width="2559" height="1522" alt="Screenshot 2026-01-03 130740" src="https://github.com/user-attachments/assets/baa3e4f8-3016-47ba-a8bb-7715ad1b2d48" />
<img width="2559" height="1524" alt="Screenshot 2026-01-03 130419" src="https://github.com/user-attachments/assets/c1c0e53f-fb90-4691-aa54-723a626ab5d8" />
<img width="2559" height="1389" alt="Screenshot 2026-01-03 130429" src="https://github.com/user-attachments/assets/bda4805d-053e-4fbd-8757-ac77b698d823" />
<img width="2559" height="1528" alt="Screenshot 2026-01-03 130450" src="https://github.com/user-attachments/assets/205119dc-95df-4760-af37-c36bfdae64e4" />
<img width="2559" height="1528" alt="Screenshot 2026-01-03 130507" src="https://github.com/user-attachments/assets/8a1fefd2-93c3-45ab-add1-b3f027ea3173" />
<img width="2559" height="1524" alt="Screenshot 2026-01-03 130517" src="https://github.com/user-attachments/assets/1998d973-c011-44c4-b05d-7312ce6ed037" />
<img width="2559" height="1525" alt="Screenshot 2026-01-03 130537" src="https://github.com/user-attachments/assets/038cbb87-6372-48af-962a-073535226db7" />
<img width="2559" height="1525" alt="Screenshot 2026-01-03 130552" src="https://github.com/user-attachments/assets/75224952-5e8d-439a-9dfc-6d67c990930a" />
<img width="2559" height="1524" alt="Screenshot 2026-01-03 130607" src="https://github.com/user-attachments/assets/da68473f-5f70-43bc-812c-fc78f1273339" />
<img width="2559" height="1521" alt="Screenshot 2026-01-03 130615" src="https://github.com/user-attachments/assets/d5629a38-6536-469b-9b82-061e1f076ef4" />
<img width="2559" height="1523" alt="Screenshot 2026-01-03 130631" src="https://github.com/user-attachments/assets/1f61d735-be2d-4a1a-91dd-626be4bb02d1" />
<img width="2559" height="1526" alt="Screenshot 2026-01-03 130644" src="https://github.com/user-attachments/assets/e7e8e929-209c-46f4-ae2d-7daa9ecd8d6f" />
<img width="2559" height="1526" alt="Screenshot 2026-01-03 130656" src="https://github.com/user-attachments/assets/b6622735-6bf0-4b82-8f81-0990db5d48b9" />





