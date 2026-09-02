import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import RegistrationForm from '../components/registeration/Registration';

export default function RegistrationPage() {
  const { id } = useParams();
  const event = useSelector((state) => state.events.events.find((item) => String(item.id) === id));

  if (!event || !event.isFree || new Date(event.date) < new Date()) {
    return <Navigate to={event ? `/events/${event.id}` : '/events'} replace />;
  }

  return (
    <section className="bg-[#f8f4eb] py-8 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <Link to={`/events/${event.id}`} className="text-sm font-semibold text-heritage-maroon hover:underline">← Back to event</Link>
        <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 lg:grid lg:grid-cols-[0.9fr_1.35fr]">
          <aside className="bg-heritage-maroon p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-heritage-gold">Free event registration</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight">{event.title}</h1>
            <p className="mt-4 text-sm leading-6 text-white/75">Reserve your place now. Your confirmation ID is generated as soon as your registration is complete.</p>
            <div className="mt-7 space-y-4 border-t border-white/15 pt-6 text-sm"><p className="flex gap-3"><FaCalendarAlt className="mt-1 text-heritage-gold" />{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {event.time}</p><p className="flex gap-3"><FaMapMarkerAlt className="mt-1 text-heritage-gold" />{event.venue || `${event.city}, ${event.state}`}</p><p className="flex gap-3"><FaTicketAlt className="mt-1 text-heritage-gold" />Free entry · {event.language}</p></div>
          </aside>
          <div className="p-6 sm:p-8"><h2 className="text-2xl font-bold text-gray-900">Your details</h2><p className="mt-1 text-sm text-gray-600">Fields marked with * are required.</p><div className="mt-6"><RegistrationForm eventId={event.id} eventTitle={event.title} /></div></div>
        </div>
      </div>
    </section>
  );
}
