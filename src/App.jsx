import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import News from './pages/News';
import Home from './pages/Home';
import Events from './pages/Events';
import NewsAndEvents from './pages/NewsAndEvents';
import SchoolSite from './pages/SchoolSite';
import SchoolSB from './pages/SchoolSB';
import Research from './pages/Research';
import AboutADA from './pages/AboutADA';
import AboutItalyAzerbaijanUniversity from './pages/AboutItalyAzerbaijanUniversity';
import Programs from './pages/Programs';
import EventDetail from './pages/EventDetail';
import NewsDetail from './pages/NewsDetail';
import ProgramDetail from './pages/ProgramDetail';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/en" element={<Home />} />
      <Route path="/en/news" element={<News />} />
      <Route path="/en/news/:id" element={<NewsDetail />} />
      <Route path="/en/events" element={<Events />} />
      <Route path="/en/events/:id" element={<EventDetail />} />
      <Route path="/en/news-and-events" element={<NewsAndEvents />} />
      <Route path="/en/admission/find-your-program" element={<Programs />} />
      <Route path="/en/programs/:id" element={<ProgramDetail />} />
      <Route path="/en/schools/site" element={<SchoolSite />} />
      <Route path="/en/schools/sb" element={<SchoolSB />} />
      <Route path="/en/academics/research" element={<Research />} />
      <Route path="/en/about/ada-university" element={<AboutADA />} />
      <Route path="/en/about/Italy-Azerbaijan-university" element={<AboutItalyAzerbaijanUniversity />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
