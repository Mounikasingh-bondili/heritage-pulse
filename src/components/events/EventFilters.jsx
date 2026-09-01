import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/slices/filtersSlice';
import { FaSearch, FaFilter } from 'react-icons/fa';

const EventFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = ['All', 'Festival', 'Workshop', 'Heritage Walk', 'Talk', 'Exhibition', 'Performance', 'Virtual Event', 'Museum Event'];
  const cities = ['All', 'Hyderabad', 'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore'];
  const languages = ['All', 'English', 'Hindi', 'Telugu', 'Other'];

  const handleFilterChange = useCallback((key, value) => {
    dispatch(setFilters({ [key]: value }));
  }, [dispatch]);

  const handleSearch = useCallback((e) => {
    dispatch(setFilters({ search: e.target.value }));
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      {/* Mobile Toggle */}
      <button 
        className="md:hidden w-full flex items-center justify-between p-2 bg-gray-100 rounded"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <span className="font-semibold">Filters</span>
        <FaFilter />
      </button>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon"
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-heritage-maroon"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-heritage-maroon"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-heritage-maroon"
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <select
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-heritage-maroon"
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            
            <button
              onClick={() => dispatch(resetFilters())}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;