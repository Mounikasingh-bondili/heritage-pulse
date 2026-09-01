import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import filtersReducer from './slices/filtersSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import registrationsReducer from './slices/registrationsSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    filters: filtersReducer,
    bookmarks: bookmarksReducer,
    registrations: registrationsReducer,
    admin: adminReducer,
  },
});