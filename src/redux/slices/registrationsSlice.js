import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of registration objects
  loading: false,
  error: null,
  selectedRegistration: null,
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    // Add a new registration
    addRegistration: (state, action) => {
      const registration = {
        ...action.payload,
        id: Date.now(), // Unique ID for the registration
        registrationDate: new Date().toISOString(),
        status: 'confirmed', // confirmed, pending, cancelled
      };
      state.items.push(registration);
    },

    // Add multiple registrations
    addMultipleRegistrations: (state, action) => {
      const registrations = action.payload.map(reg => ({
        ...reg,
        id: Date.now() + Math.random(),
        registrationDate: new Date().toISOString(),
        status: 'confirmed',
      }));
      state.items.push(...registrations);
    },

    // Update a registration
    updateRegistration: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(reg => reg.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },

    // Cancel a registration
    cancelRegistration: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex(reg => reg.id === id);
      if (index !== -1) {
        state.items[index].status = 'cancelled';
      }
    },

    // Delete a registration
    deleteRegistration: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(reg => reg.id !== id);
    },

    // Clear all registrations
    clearRegistrations: (state) => {
      state.items = [];
    },

    // Set loading state
    setRegistrationLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setRegistrationError: (state, action) => {
      state.error = action.payload;
    },

    // Select a registration for viewing
    selectRegistration: (state, action) => {
      const id = action.payload;
      state.selectedRegistration = state.items.find(reg => reg.id === id) || null;
    },

    // Clear selected registration
    clearSelectedRegistration: (state) => {
      state.selectedRegistration = null;
    },

    // Update registration status
    updateRegistrationStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex(reg => reg.id === id);
      if (index !== -1) {
        state.items[index].status = status;
      }
    },

    // Add note to registration
    addRegistrationNote: (state, action) => {
      const { id, note } = action.payload;
      const index = state.items.findIndex(reg => reg.id === id);
      if (index !== -1) {
        state.items[index].notes = state.items[index].notes || [];
        state.items[index].notes.push({
          text: note,
          date: new Date().toISOString(),
        });
      }
    },
  },
});

// Export all actions
export const {
  addRegistration,
  addMultipleRegistrations,
  updateRegistration,
  cancelRegistration,
  deleteRegistration,
  clearRegistrations,
  setRegistrationLoading,
  setRegistrationError,
  selectRegistration,
  clearSelectedRegistration,
  updateRegistrationStatus,
  addRegistrationNote,
} = registrationsSlice.actions;

// Selectors
export const selectAllRegistrations = (state) => state.registrations.items;
export const selectRegistrationById = (state, id) => 
  state.registrations.items.find(reg => reg.id === id);
export const selectRegistrationsByEvent = (state, eventId) => 
  state.registrations.items.filter(reg => reg.eventId === eventId);
export const selectRegistrationsByEmail = (state, email) => 
  state.registrations.items.filter(reg => reg.email === email);
export const selectRegistrationCount = (state) => state.registrations.items.length;
export const selectConfirmedRegistrations = (state) => 
  state.registrations.items.filter(reg => reg.status === 'confirmed');
export const selectCancelledRegistrations = (state) => 
  state.registrations.items.filter(reg => reg.status === 'cancelled');
export const selectPendingRegistrations = (state) => 
  state.registrations.items.filter(reg => reg.status === 'pending');
export const selectSelectedRegistration = (state) => state.registrations.selectedRegistration;
export const selectRegistrationLoading = (state) => state.registrations.loading;
export const selectRegistrationError = (state) => state.registrations.error;
export const selectRecentRegistrations = (state, limit = 5) => 
  [...state.registrations.items]
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    .slice(0, limit);

export default registrationsSlice.reducer;