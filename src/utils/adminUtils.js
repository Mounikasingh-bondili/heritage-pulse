// Check if user has admin permissions
export const isAdmin = (user) => {
  return user?.role === 'admin' || user?.email === 'admin@heritej.com';
};

// Format admin action
export const formatAdminAction = (action) => {
  const actions = {
    approve: '✅ Approved',
    reject: '❌ Rejected',
    edit: '✏️ Edited',
    delete: '🗑️ Deleted',
    create: '➕ Created',
    bulk_update: '📊 Bulk Update',
  };
  return actions[action] || action;
};

// Get action color
export const getActionColor = (action) => {
  const colors = {
    approve: 'text-green-600',
    reject: 'text-red-600',
    edit: 'text-blue-600',
    delete: 'text-red-600',
    create: 'text-green-600',
    bulk_update: 'text-purple-600',
  };
  return colors[action] || 'text-gray-600';
};

// Validate rejection reason
export const validateRejectionReason = (reason) => {
  if (!reason || reason.trim().length === 0) {
    return 'Rejection reason is required';
  }
  if (reason.trim().length < 10) {
    return 'Please provide a more detailed reason (at least 10 characters)';
  }
  return null;
};

// Generate admin report
export const generateAdminReport = (data) => {
  const { events, stats, actionLog, registrations } = data;
  
  return {
    summary: {
      totalEvents: events.length,
      pendingEvents: events.filter(e => e.status === 'pending').length,
      approvedEvents: events.filter(e => e.status === 'approved').length,
      rejectedEvents: events.filter(e => e.status === 'rejected').length,
      totalRegistrations: registrations?.length || 0,
      totalActions: actionLog.length,
    },
    events: events,
    recentActions: actionLog.slice(0, 20),
    generatedAt: new Date().toISOString(),
  };
};