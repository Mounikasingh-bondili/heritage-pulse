import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp 
} from 'react-icons/fa';
import { setFilters, resetFilters, setFiltersFromURL } from '../../redux/slices/filtersSlice';
import { categories, cities, languages } from '../../data/mockEvent';
import useDebounce from '../../hooks/useDebounce';

const EventFilters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const filters = useSelector(state => state.filters);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // useDebounce returns metadata and control functions as well as the value.
  // Only the string value belongs in Redux state.
  const { value: debouncedSearch } = useDebounce(localSearch, 300);

  // Restore filter choices when the events page is opened with a shared URL.
  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    if (Object.keys(params).length > 0) {
      dispatch(setFiltersFromURL(params));
      if (typeof params.search === 'string') setLocalSearch(params.search);
    }
  }, [dispatch]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      const isDefaultSort = (key === 'sortBy' && filters[key] === 'date') || (key === 'sortOrder' && filters[key] === 'asc');
      if (filters[key] && filters[key] !== 'All' && filters[key] !== 'all' && filters[key] !== '' && !isDefaultSort) {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    const newPath = queryString ? `/events?${queryString}` : '/events';
    navigate(newPath, { replace: true });
  }, [filters, navigate]);

  // Handle filter change
  const handleFilterChange = useCallback((key, value) => {
    dispatch(setFilters({ [key]: value }));
  }, [dispatch]);

  // Handle search with debounce
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setFilters({ search: debouncedSearch }));
    }
  }, [debouncedSearch, dispatch, filters.search]);

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    setLocalSearch('');
    setIsMobileOpen(false);
  }, [dispatch]);

  const activeFiltersCount = Object.keys(filters).filter(key => {
    if (key === 'sortBy' || key === 'sortOrder') return false;
    const value = filters[key];
    return value && value !== 'All' && value !== 'all' && value !== '';
  }).length;

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-[#eadfca] bg-white shadow-[0_10px_28px_rgba(72,32,19,0.10)]">
      <div className="flex items-center justify-between border-b border-[#f0e8db] bg-[#fffaf1] px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-heritage-maroon"><FaFilter /><span>Find your next experience</span></div>
        {activeFiltersCount > 0 && <span className="rounded-full bg-heritage-maroon px-3 py-1 text-xs font-semibold text-white">{activeFiltersCount} active</span>}
      </div>
      <div className="p-4 sm:p-5">
      {/* Mobile Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 text-heritage-maroon font-medium"
        >
          <FaFilter />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-heritage-maroon text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          {isMobileOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
        {/* Search Bar */}
        <div className="relative mb-5">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by name..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch('');
                dispatch(setFilters({ search: '' }));
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20"
              value={filters.category || 'All'}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20"
              value={filters.city || 'All'}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20"
              value={filters.language || 'All'}
              onChange={(e) => handleFilterChange('language', e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <select className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20" value={filters.price || 'all'} onChange={(e) => handleFilterChange('price', e.target.value)}>
              <option value="all">All prices</option><option value="free">Free</option><option value="paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
            <select className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20" value={filters.status || 'All'} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="All">Any time</option><option value="Upcoming">Upcoming</option><option value="Past">Past</option>
            </select>
          </div>
        </div>

        {/* Sort & Actions */}
        <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <label className="mr-1 text-sm font-semibold text-gray-700">Sort:</label>
            <select
              className="rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none focus:border-heritage-maroon"
              value={filters.sortBy || 'date'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="popularity">Popularity</option>
            </select>
            <select
              className="rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none focus:border-heritage-maroon"
              value={filters.sortOrder || 'asc'}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
            {activeFiltersCount > 0 && (
              <span className="text-sm text-gray-600">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
              </span>
            )}
            <button
              onClick={handleReset}
              className="rounded-lg bg-[#f5f2ed] px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-[#ece5d9]"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default EventFilters;
