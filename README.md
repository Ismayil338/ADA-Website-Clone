# **Frontend Final Project — ADA Website Clone (React + JSON-Server)**

## **Project Goal**

You must build a **functional replica** (or improved version) of the ADA University website:  
https://www.ada.edu.az/en  
using **React** for the frontend and **json-server** for a mock backend.

- Content (programs, faculties, news, events, admissions info) must be:
  - **Scraped from the real website** (Bonus +10%)  
    **or**
  - **Manually collected** and stored in JSON.
- The project must follow **4 weekly milestones**.
- Minimum **2 commits per week** required.

---

# **Project Requirements**

## **Core Features**

- Multi-page website using **React Router**.
- Required pages:
  - Home
  - About ADA (sub-pages, i.e., ADA University, Italy-Azerbaijan University)
  - Schools / Faculties (different schools' pages)
  - Programs (Bachelor / Master)
  - News & Events
  - Admissions
- Data must come from **json-server** (no hardcoded page data).
- Responsive design (desktop + mobile).
- Navbar + footer similar to original.
- Simple search (programs or news).
- Use of **localStorage** for:
  - Dark/Light mode
- Loading + error states for API requests.

## **Tools & Technologies**

- React 18+
- React Router
- JSON-Server
- Git + GitHub
- Axios or fetch
- Any CSS framework (Tailwind, Bootstrap, or custom)
- Optional: Vite

## **Bonus**

- Automated scraping script using: <em>(Optional +10%)</em>
  - Node + Cheerio 
  - **or** Puppeteer
  - **or even** Python 

## **Nice to have**
- Improved modern UI/UX
- Reusable UI component library
- Dark mode with theme persistence
- Admin panel for editing JSON data <em>(Optional +10%)</em>

---

# **Guidelines**

- Aim for **clean, reusable, modular React components**.
- Use **hooks**, props, and a clear folder structure.
- Focus on **functionality over complexity**.
- README must be updated weekly.

---

# **Final Exam Project Milestone Plan (4 Weeks)**

## **Week 1 — Setup & Basics**

### **Goal:** Prepare project, backend data, and basic UI structure.

- Collect data:
  - **Option A:** Scrape using a script (**Bonus +10%**)
  - **Option B:** Manually copy content
- Create backend using **json-server** (with at least **3 API routes**)
- Create basic UI structure:
  - Header
  - Footer
  - Empty placeholder pages
- Create and Update **PROJECT-INSTRUCTIONS.md**:
  - Project description
  - How to run frontend + json-server
- Make at least **2 commits**

---

## **Week 2 — Routing, Components & Basic UI**

### **Goal:** Build core pages and reusable components.

### Implement main pages:
- Home
- About
- Faculties
- Programs

### Create reusable components:
- Navbar
- Footer
- Card (for news/events/programs)

### Requirements:
- Implement routing using **React Router v6**
- Fetch and display data from **json-server** for **at least 2 pages**
- Add loading and error UI states
- Create basic responsive layout
- Minimum **2 commits**

---

## **Week 3 — Dynamic Content & Interactivity**

### **Goal:** Add dynamic, interactive, and data-driven features.

- Fully populate:
  - Programs list + program details
  - News list + news details
  - Events list + event details
- Add **search functionality** (e.g., for programs/news)
- Add **localStorage-based features**:
  - Themes
- Optional enhancements:
  - Pagination for news/events
  - Image galleries or carousels
- Improve design and responsiveness
- Finalize API structure in **db.json**
- Update PROJECT-INSTRUCTIONS with:
  - API endpoints
  - Example requests
- Minimum **2 commits**

---

## **Week 4 — Final Polish, Testing & Submission**

### **Goal:** Complete all features, fix bugs, finalize documentation.

- Ensure all pages are complete and functional
- Fix responsive layout issues
- Add **404 Not Found** page
- Finalize **db.json**
- Write final **PROJECT-INSTRUCTIONS.md** including:
  - Project overview
  - Tech stack
  - How to run frontend + json-server
  - API examples
  - Screenshots
- Ensure project builds with no errors
- Prepare **5–10 minute demo video**, upload it to YouTube or OneDrive and add its link to the PROJECT-INSTRUCTIONS
- Push final commits

---

# **Final Project Checklist**

## **Week 1 — Setup & Basics**
- [ ] GitHub repo created + first commit  
- [ ] React project initialized  
- [ ] Folder structure added  
- [ ] React Router installed  
- [ ] json-server initialized with `db.json`  
- [ ] Data scraped/collected for:  
  - [ ] Programs  
  - [ ] Faculties  
  - [ ] News  
  - [ ] Events  (<em>you can increase the items in the list</em>)
- [ ] Basic UI (header/footer/pages)  

---

## **Week 2 — UI + Routing**
- [ ] Home / About / Faculties / Programs pages  
- [ ] Reusable components (Navbar, Footer, Cards, Hero)  
- [ ] Routing configured with React Router  
- [ ] Data fetched from json-server  
- [ ] Loading & error states implemented  
- [ ] Basic responsive layout  
- [ ] Minimum 2 commits  

---

## **Week 3 — Dynamic Content**
- [ ] News, Programs, Events pages populated  
- [ ] Detail pages (`/news/:id`, `/programs/:id`)  
- [ ] Search functionality added  
- [ ] Theme changing via localStorage  
- [ ] Pagination (optional)  
- [ ] UI enhancements applied  
- [ ] PROJECT-INSTRUCTIONS updated with API endpoints  
- [ ] Minimum 2 commits  

---

## **Week 4 — Final Polish**
- [ ] Fully responsive UI  
- [ ] All pages functional  
- [ ] 404 page added  
- [ ] Final `db.json` prepared  
- [ ] Final PROJECT-INSTRUCTIONS written  
- [ ] Project builds cleanly  
- [ ] Demo video prepared 
- [ ] Final commits pushed  

---

# **Extra Objectives**
- [ ] Automated scraping script  
- [ ] Enhanced UI/UX  
- [ ] Dark/Light theme with persistence  
- [ ] Admin panel for JSON-server data  

