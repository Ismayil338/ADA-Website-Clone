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
- **React 19.2.0**: Modern React with hooks
- **React Router 7.10.1**: Client-side routing
- **Vite 7.2.4**: Build tool and dev server
- **Bootstrap 5.3.8**: CSS framework for responsive design
- **Swiper 12.0.3**: Touch slider for carousels
- **Font Awesome 7.1.0**: Icon library

### Backend
- **Express.js 4.18.2**: Web server framework
- **CORS 2.8.5**: Cross-origin resource sharing
- **Node.js**: Runtime environment

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
cd final-project-10211_team4-main
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

**Terminal 1 - Start Backend Server**:
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

### Example: Fetching News

```javascript
// Using fetch
fetch('http://localhost:5000/news')
  .then(res => res.json())
  .then(data => {
    console.log(data);
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
```

### Example: Updating Faculty Data

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
```

### Example: Filtering Programs

```javascript
// Get all programs
fetch('http://localhost:5000/programs')
  .then(res => res.json())
  .then(programs => {
    // Filter by school
    const sbPrograms = programs.filter(p => p.school_label === 'SB');
    
    // Filter by level
    const undergraduatePrograms = programs.filter(p => p.level === 'Undergraduate');
    
    // Search by title
    const searchTerm = 'Business';
    const filtered = programs.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
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


