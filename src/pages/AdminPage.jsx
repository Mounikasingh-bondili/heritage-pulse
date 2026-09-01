import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEventStatus } from '../redux/slices/eventsSlice';
import StatusBadge from '../components/common/StatusBadge';
import AdminEventModal from '../components/admin/AdminEventModal';

const AdminPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events
    .filter(e => filterStatus === 'all' ? true : e.status === filterStatus)
    .filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleApprove = (id) => {
    dispatch(updateEventStatus({ id, status: 'approved' }));
  };

  const handleReject = (id, reason) => {
    dispatch(updateEventStatus({ id, status: 'rejected', rejectionReason: reason }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-heritage-maroon">
        Admin Dashboard
      </h1>

      {/* Admin Controls */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            className="flex-1 p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Event</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id} className="border-t">
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">{event.category}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={event.status} />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    View
                  </button>
                  {event.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:');
                          if (reason) handleReject(event.id, reason);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <AdminEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;