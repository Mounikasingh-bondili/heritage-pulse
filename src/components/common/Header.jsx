import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-heritage-maroon text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🏛️ HeriTej Pulse
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link to="/events" className="hover:text-heritage-gold transition">Events</Link>
          <Link to="/bookmarks" className="flex items-center gap-2 hover:text-heritage-gold transition">
            <FaBookmark /><span className="hidden sm:inline">Bookmarks</span>
          </Link>
          <Link to="/about" className="hidden sm:inline hover:text-heritage-gold transition">About</Link>
          <Link to="/admin/events" className="hover:text-heritage-gold transition">
            <FaUser className="inline" /> Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
