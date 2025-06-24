import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/AdminDashboard';
import SinglePage from './pages/SinglePage';

function App() {
  const { language } = useLanguage();
  return (
    <LanguageProvider>
      <AdminProvider>
        <Router>
          <div className={`min-h-screen${language === 'dari' ? ' rtl' : ''}`} dir={language === 'dari' ? 'rtl' : 'ltr'}>
            <Header />
            <Routes>
              <Route path="/" element={<>
                <SinglePage />
              </>} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AdminProvider>
    </LanguageProvider>
  );
}

export default App;