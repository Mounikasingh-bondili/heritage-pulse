import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Admin statistics
  stats: {
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
    totalRegistrations: 0,
    totalBookmarks: 0,
  },
  
  // Admin actions log
  actionLog: [],
  
  // Filtered events in admin panel
  filteredEvents: [],
  
  // Selected event for admin view
  selectedEvent: null,
  
  // Admin preferences
  preferences: {
    itemsPerPage: 10,
    sortBy: 'date',
    sortOrder: 'desc',
    viewMode: 'table', // 'table' or 'card'
  },
  
  // Loading states
  loading: false,
  error: null,
  
  // Rejection reasons cache
  rejectionReasons: {},
  
  // Admin notifications
  notifications: [],
  
  // Current admin action
  currentAction: null, // 'approve', 'reject', 'view', 'edit'
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Update admin statistics
    updateAdminStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },

    // Calculate statistics from events data
    calculateStats: (state, action) => {
      const events = action.payload;
      state.stats.totalEvents = events.length;
      state.stats.pendingEvents = events.filter(e => e.status === 'pending').length;
      state.stats.approvedEvents = events.filter(e => e.status === 'approved').length;
      state.stats.rejectedEvents = events.filter(e => e.status === 'rejected').length;
    },

    // Add admin action to log
    addAdminAction: (state, action) => {
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.actionLog.unshift(logEntry); // Add to beginning for latest first
    },

    // Clear action log
    clearActionLog: (state) => {
      state.actionLog = [];
    },

    // Set filtered events for admin
    setFilteredEvents: (state, action) => {
      state.filteredEvents = action.payload;
    },

    // Select event for admin view
    selectEventForAdmin: (state, action) => {
      state.selectedEvent = action.payload;
    },

    // Clear selected event
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },

    // Update admin preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Set loading state
    setAdminLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setAdminError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearAdminError: (state) => {
      state.error = null;
    },

    // Add rejection reason
    addRejectionReason: (state, action) => {
      const { eventId, reason } = action.payload;
      state.rejectionReasons[eventId] = {
        reason,
        timestamp: new Date().toISOString(),
        admin: 'admin@heritej.com', // In a real app, this would come from auth
      };
    },

    // Remove rejection reason
    removeRejectionReason: (state, action) => {
      const eventId = action.payload;
      delete state.rejectionReasons[eventId];
    },

    // Get rejection reason for an event
    getRejectionReason: (state, action) => {
      const eventId = action.payload;
      return state.rejectionReasons[eventId] || null;
    },

    // Add notification
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(notification);
    },

    // Mark notification as read
    markNotificationAsRead: (state, action) => {
      const id = action.payload;
      const notification = state.notifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
      }
    },

    // Mark all notifications as read
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },

    // Delete notification
    deleteNotification: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== id);
    },

    // Clear all notifications
    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Set current admin action
    setCurrentAction: (state, action) => {
      state.currentAction = action.payload;
    },

    // Clear current action
    clearCurrentAction: (state) => {
      state.currentAction = null;
    },

    // Reset admin state
    resetAdminState: (state) => {
      return initialState;
    },

    // Bulk update event status (for multiple events)
    bulkUpdateStatus: (state, action) => {
      const { eventIds, status, reason } = action.payload;
      // This will be handled in the events slice
      // We just log the action here
      state.actionLog.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        action: 'bulk_update',
        details: {
          eventIds,
          status,
          reason: reason || null,
        },
      });
    },

    // Export admin data
    exportAdminData: (state) => {
      // This is just a flag, actual export happens in component
      // We could add a flag here
      state.exporting = true;
    },

    // Export complete
    exportComplete: (state) => {
      state.exporting = false;
    },
  },
});

// Export all actions
export const {
  updateAdminStats,
  calculateStats,
  addAdminAction,
  clearActionLog,
  setFilteredEvents,
  selectEventForAdmin,
  clearSelectedEvent,
  updatePreferences,
  setAdminLoading,
  setAdminError,
  clearAdminError,
  addRejectionReason,
  removeRejectionReason,
  getRejectionReason,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  setCurrentAction,
  clearCurrentAction,
  resetAdminState,
  bulkUpdateStatus,
  exportAdminData,
  exportComplete,
} = adminSlice.actions;

// Selectors
export const selectAdminStats = (state) => state.admin.stats;
export const selectAdminActionLog = (state) => state.admin.actionLog;
export const selectFilteredEvents = (state) => state.admin.filteredEvents;
export const selectSelectedEvent = (state) => state.admin.selectedEvent;
export const selectAdminPreferences = (state) => state.admin.preferences;
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
export const selectRejectionReasons = (state) => state.admin.rejectionReasons;
export const selectNotifications = (state) => state.admin.notifications;
export const selectUnreadNotifications = (state) => 
  state.admin.notifications.filter(n => !n.read);
export const selectCurrentAction = (state) => state.admin.currentAction;

// Combined selectors
export const selectAdminDashboardData = (state) => ({
  stats: state.admin.stats,
  recentActions: state.admin.actionLog.slice(0, 10),
  unreadNotifications: state.admin.notifications.filter(n => !n.read).length,
});

export const selectEventWithRejectionReason = (state, eventId) => {
  const events = state.events.events;
  const event = events.find(e => e.id === eventId);
  const rejectionReason = state.admin.rejectionReasons[eventId];
  return {
    ...event,
    rejectionReason: rejectionReason ? rejectionReason.reason : null,
    rejectionDetails: rejectionReason,
  };
};

export default adminSlice.reducer;