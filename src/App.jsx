import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './pages/News';
import Home from './pages/Home';
import Events from './pages/Events';
import SchoolSite from './pages/SchoolSite';
import SchoolSB from './pages/SchoolSB';
import Research from './pages/Research';
import AboutADA from './pages/AboutADA';
import Programs from './pages/Programs';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/en" element={<Home />} />
      <Route path="/en/news" element={<News />} />
      <Route path="/en/events" element={<Events />} />
      <Route path="/en/admission/find-your-program" element={<Programs />} />
      <Route path="/en/schools/site" element={<SchoolSite />} />
      <Route path="/en/schools/sb" element={<SchoolSB />} />
      <Route path="/en/academics/research" element={<Research />} />
      <Route path="/en/about/ada-university" element={<AboutADA />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
