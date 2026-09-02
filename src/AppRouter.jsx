import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';

// Lazy load pages for better performance
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<Loader fullScreen text="Loading page..." />}>
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/register/:id" element={<RegistrationPage />} />
              <Route path="/admin/events" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;