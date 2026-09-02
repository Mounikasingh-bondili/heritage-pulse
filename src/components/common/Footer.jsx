import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-heritage-maroon text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              🏛️ HeriTej Pulse
            </h3>
            <p className="text-gray-300 mb-4">
              Discover and explore heritage events, culture, and traditions across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="text-gray-300 hover:text-white transition-colors">
                  Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/admin/events" className="text-gray-300 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="mt-1 text-heritage-gold" />
                <span className="text-gray-300">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-heritage-gold" />
                <a href="mailto:info@heritejpulse.com" className="text-gray-300 hover:text-white transition-colors">
                  info@heritejpulse.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-heritage-gold" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get notified about new heritage events.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-heritage-gold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-heritage-gold text-gray-800 font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {currentYear} HeriTej Pulse. All rights reserved.
            </p>
            <p className="flex items-center mt-2 md:mt-0">
              Made with <FaHeart className="text-red-500 mx-1" /> by 
              <span className="text-white ml-1">Mounika Bondili</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;