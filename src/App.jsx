import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';

const EventsPage = lazy(() => import('./pages/EventPages'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-heritage-cream">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<Loader fullScreen text="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Navigate to="/events" replace />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/register/:id" element={<RegistrationPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin/events" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/events" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
