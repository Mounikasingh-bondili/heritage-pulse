import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'All',
  city: 'All',
  price: 'all', // 'all', 'free', 'paid'
  language: 'All',
  status: 'All', // 'All', 'Upcoming', 'Past'
  sortBy: 'date', // 'date', 'title', 'popularity'
  sortOrder: 'asc', // 'asc', 'desc'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Set a single filter value
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    // Set multiple filters at once
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },

    // Reset all filters to initial state
    resetFilters: () => initialState,

    // Clear search only
    clearSearch: (state) => {
      state.search = '';
    },

    // Toggle sort order
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    // Set filters from URL query parameters
    setFiltersFromURL: (state, action) => {
      const params = action.payload;
      const newFilters = { ...state };
      
      if (params.search) newFilters.search = params.search;
      if (params.category) newFilters.category = params.category;
      if (params.city) newFilters.city = params.city;
      if (params.price) newFilters.price = params.price;
      if (params.language) newFilters.language = params.language;
      if (params.status) newFilters.status = params.status;
      if (params.sortBy) newFilters.sortBy = params.sortBy;
      if (params.sortOrder) newFilters.sortOrder = params.sortOrder;
      
      return newFilters;
    },

    // Get URL query parameters from current filters
    getFiltersAsURLParams: (state) => {
      const params = {};
      if (state.search) params.search = state.search;
      if (state.category !== 'All') params.category = state.category;
      if (state.city !== 'All') params.city = state.city;
      if (state.price !== 'all') params.price = state.price;
      if (state.language !== 'All') params.language = state.language;
      if (state.status !== 'All') params.status = state.status;
      if (state.sortBy !== 'date') params.sortBy = state.sortBy;
      if (state.sortOrder !== 'asc') params.sortOrder = state.sortOrder;
      return params;
    },

    // Check if any filters are active
    hasActiveFilters: (state) => {
      return (
        state.search !== '' ||
        state.category !== 'All' ||
        state.city !== 'All' ||
        state.price !== 'all' ||
        state.language !== 'All' ||
        state.status !== 'All' ||
        state.sortBy !== 'date' ||
        state.sortOrder !== 'asc'
      );
    },

    // Get active filters count
    getActiveFiltersCount: (state) => {
      let count = 0;
      if (state.search) count++;
      if (state.category !== 'All') count++;
      if (state.city !== 'All') count++;
      if (state.price !== 'all') count++;
      if (state.language !== 'All') count++;
      if (state.status !== 'All') count++;
      if (state.sortBy !== 'date') count++;
      if (state.sortOrder !== 'asc') count++;
      return count;
    },
  },
});

// Export all actions
export const {
  setFilter,
  setFilters,
  resetFilters,
  clearSearch,
  toggleSortOrder,
  setFiltersFromURL,
  getFiltersAsURLParams,
  hasActiveFilters,
  getActiveFiltersCount,
} = filtersSlice.actions;

// Selectors
export const selectAllFilters = (state) => state.filters;
export const selectSearchTerm = (state) => state.filters.search;
export const selectCategory = (state) => state.filters.category;
export const selectCity = (state) => state.filters.city;
export const selectPrice = (state) => state.filters.price;
export const selectLanguage = (state) => state.filters.language;
export const selectStatus = (state) => state.filters.status;
export const selectSortBy = (state) => state.filters.sortBy;
export const selectSortOrder = (state) => state.filters.sortOrder;
export const selectActiveFiltersCount = (state) => {
  const filters = state.filters;
  let count = 0;
  if (filters.search) count++;
  if (filters.category !== 'All') count++;
  if (filters.city !== 'All') count++;
  if (filters.price !== 'all') count++;
  if (filters.language !== 'All') count++;
  if (filters.status !== 'All') count++;
  if (filters.sortBy !== 'date') count++;
  if (filters.sortOrder !== 'asc') count++;
  return count;
};

export default filtersSlice.reducer;