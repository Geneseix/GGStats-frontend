import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SummonerPage from './pages/SummonerPage';
import SearchPage from './pages/SearchPage';
import AuthForms from './components/AuthForms';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: '#f0f2f5',
        color: '#fff',
        fontFamily: 'Segoe UI, Arial, sans-serif'
      }}>
        <header style={{
          background: '#28344e',
          padding: '16px 0',
          marginBottom: 32,
          boxShadow: '0 2px 8px rgba(40,52,78,0.15)'
        }}>
          <div style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 1, color: '#3ecfff' }}>
              GGStats
            </h1>
          </div>
        </header>
        <main style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
          <Routes>
            <Route path="/" element={<AuthForms />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/summoner/:region/:gameName/:tagLine" element={<SummonerPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
