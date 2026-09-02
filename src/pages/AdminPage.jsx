import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';
import { updateEventStatus } from '../redux/slices/eventsSlice';
import EmptyState from '../components/common/EmptyStage';
import StatusBadge from '../components/common/StatusBadge';

export default function AdminPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [rejectingId, setRejectingId] = useState(null);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  const filtered = useMemo(() => events.filter((event) => (
    event.title.toLowerCase().includes(search.trim().toLowerCase()) && (status === 'all' || event.status === status)
  )), [events, search, status]);
  const counts = useMemo(() => ['pending', 'approved', 'rejected'].reduce((result, item) => ({ ...result, [item]: events.filter((event) => event.status === item).length }), { pending: 0, approved: 0, rejected: 0 }), [events]);
  const submitRejection = () => {
    if (!reason.trim()) { setReasonError('A rejection reason is required.'); return; }
    dispatch(updateEventStatus({ id: rejectingId, status: 'rejected', rejectionReason: reason.trim() }));
    setRejectingId(null); setReason(''); setReasonError('');
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-7"><p className="text-sm font-semibold uppercase tracking-wider text-heritage-gold">Moderation workspace</p><h1 className="text-3xl font-bold text-heritage-maroon">Event review</h1></div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[['All', events.length], ['Pending', counts.pending], ['Approved', counts.approved], ['Rejected', counts.rejected]].map(([label, count]) => <div key={label} className="rounded-xl bg-white p-4 shadow-sm"><p className="text-sm text-gray-600">{label}</p><p className="text-2xl font-bold text-heritage-maroon">{count}</p></div>)}</div>
      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row"><input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2" placeholder="Search submitted events" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-gray-300 px-3 py-2"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {filtered.length === 0 ? <EmptyState message="No submitted events found" /> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-heritage-cream text-gray-600"><tr><th className="px-4 py-3">Event</th><th className="px-4 py-3">City</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{filtered.map((event) => <tr key={event.id} className="border-t"><td className="px-4 py-3"><p className="font-semibold">{event.title}</p><p className="text-gray-500">{event.category}</p>{event.status === 'rejected' && <p className="mt-1 text-xs text-red-600">Reason: {event.rejectionReason}</p>}</td><td className="px-4 py-3">{event.city}</td><td className="px-4 py-3"><StatusBadge status={event.status} /></td><td className="px-4 py-3"><div className="flex gap-2"><Link className="rounded p-2 text-blue-600 hover:bg-blue-50" title="View event" to={`/events/${event.id}`}><FaEye /></Link>{event.status === 'pending' && <><button onClick={() => dispatch(updateEventStatus({ id: event.id, status: 'approved' }))} className="rounded p-2 text-green-600 hover:bg-green-50" title="Approve"><FaCheck /></button><button onClick={() => { setRejectingId(event.id); setReason(''); }} className="rounded p-2 text-red-600 hover:bg-red-50" title="Reject"><FaTimes /></button></>}</div></td></tr>)}</tbody></table></div>}
      </div>
      {rejectingId && <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-xl font-bold text-heritage-maroon">Reject event</h2><p className="mt-2 text-sm text-gray-600">Explain why this submitted event cannot be approved.</p><textarea autoFocus value={reason} onChange={(event) => { setReason(event.target.value); setReasonError(''); }} className="mt-4 w-full rounded-lg border border-gray-300 p-3" rows="4" placeholder="Rejection reason" />{reasonError && <p className="mt-1 text-sm text-red-600">{reasonError}</p>}<div className="mt-4 flex justify-end gap-3"><button onClick={() => setRejectingId(null)} className="rounded-lg px-4 py-2">Cancel</button><button onClick={submitRejection} className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white">Reject event</button></div></div></div>}
    </section>
  );
}
