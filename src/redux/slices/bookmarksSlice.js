import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of event IDs that are bookmarked
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    // Add a bookmark
    addBookmark: (state, action) => {
      const eventId = action.payload;
      if (!state.items.includes(eventId)) {
        state.items.push(eventId);
      }
    },

    // Remove a bookmark
    removeBookmark: (state, action) => {
      const eventId = action.payload;
      state.items = state.items.filter(id => id !== eventId);
    },

    // Toggle bookmark (add if not exists, remove if exists)
    toggleBookmark: (state, action) => {
      const eventId = action.payload;
      const index = state.items.indexOf(eventId);
      if (index === -1) {
        state.items.push(eventId);
      } else {
        state.items.splice(index, 1);
      }
    },

    // Clear all bookmarks
    clearBookmarks: (state) => {
      state.items = [];
    },

    // Add multiple bookmarks at once
    addMultipleBookmarks: (state, action) => {
      const eventIds = action.payload;
      eventIds.forEach(id => {
        if (!state.items.includes(id)) {
          state.items.push(id);
        }
      });
    },

    // Remove multiple bookmarks
    removeMultipleBookmarks: (state, action) => {
      const eventIds = action.payload;
      state.items = state.items.filter(id => !eventIds.includes(id));
    },

    // Toggle bookmark with additional data (for analytics)
    toggleBookmarkWithData: (state, action) => {
      const { eventId, eventData } = action.payload;
      const index = state.items.indexOf(eventId);
      if (index === -1) {
        state.items.push(eventId);
        // You could also store additional data here if needed
        // state.bookmarkData = state.bookmarkData || {};
        // state.bookmarkData[eventId] = { ...eventData, bookmarkedAt: new Date().toISOString() };
      } else {
        state.items.splice(index, 1);
        // Remove additional data if stored
        // if (state.bookmarkData) {
        //   delete state.bookmarkData[eventId];
        // }
      }
    },
  },
});

// Export all actions
export const {
  addBookmark,
  removeBookmark,
  toggleBookmark,
  clearBookmarks,
  addMultipleBookmarks,
  removeMultipleBookmarks,
  toggleBookmarkWithData,
} = bookmarksSlice.actions;

// Selectors
export const selectAllBookmarks = (state) => state.bookmarks.items;
export const selectBookmarkCount = (state) => state.bookmarks.items.length;
export const selectIsBookmarked = (state, eventId) => state.bookmarks.items.includes(eventId);

// Selector to get bookmarked events with full data
export const selectBookmarkedEvents = (state) => {
  const bookmarkedIds = state.bookmarks.items;
  const allEvents = state.events.events;
  return allEvents.filter(event => bookmarkedIds.includes(event.id));
};

export default bookmarksSlice.reducer;