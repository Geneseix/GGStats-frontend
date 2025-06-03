import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SummonerPage from './pages/SummonerPage';
import SearchPage   from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/summoner/:gameName/:tagLine" element={<SummonerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;