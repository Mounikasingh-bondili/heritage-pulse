import { createSlice } from '@reduxjs/toolkit';
import { mockEvents } from '../../data/mockEvents';

const initialState = {
  events: mockEvents,
  filteredEvents: mockEvents,
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
      state.filteredEvents = action.payload;
    },
    setFilteredEvents: (state, action) => {
      state.filteredEvents = action.payload;
    },
    selectEvent: (state, action) => {
      state.selectedEvent = state.events.find(e => e.id === action.payload);
    },
    updateEventStatus: (state, action) => {
      const { id, status, rejectionReason } = action.payload;
      const event = state.events.find(e => e.id === id);
      if (event) {
        event.status = status;
        if (rejectionReason) event.rejectionReason = rejectionReason;
      }
    },
  },
});

export const { setEvents, setFilteredEvents, selectEvent, updateEventStatus } = eventsSlice.actions;
export default eventsSlice.reducer;