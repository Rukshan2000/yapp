import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';

import Home from './pages/Home';
import TopStories from './pages/TopStories';
import ProgramLineup from './pages/ProgramLineup';
import NewsFirst from './pages/NewsFirst';
import Contact from './pages/Contact'; // Import your Contact component


const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-stories" element={<TopStories />} />
            <Route path="/program-lineup" element={<ProgramLineup />} />
            <Route path="/news-first" element={<NewsFirst />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
};

export default App;
