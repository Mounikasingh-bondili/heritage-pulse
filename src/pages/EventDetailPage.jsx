import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark, FaCalendar, FaMapMarkerAlt, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { toggleBookmark } from '../redux/slices/bookmarksSlice';
import ConfirmationModal from '../components/common/ConfirmationModal';
import EmptyState from '../components/common/EmptyStage';

const fallbackImage = 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=650&fit=crop';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.events.find((item) => String(item.id) === id));
  const bookmarked = useSelector((state) => state.bookmarks.items.includes(Number(id)));
  const allEvents = useSelector((state) => state.events.events);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const relatedEvents = useMemo(() => event ? allEvents
    .filter((item) => item.id !== event.id && item.status === 'approved' && (item.category === event.category || item.city === event.city))
    .slice(0, 3) : [], [allEvents, event]);

  if (!event) {
    return <EmptyState message="Event not found" subMessage="This event may have been removed." actionText="Browse events" onAction={() => navigate('/events')} />;
  }

  const isPast = new Date(event.date) < new Date();
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: event.title, url });
      else await navigator.clipboard.writeText(url);
    } catch { /* the user cancelled sharing */ }
  };
  const proceedToPayment = () => {
    setPaymentOpen(false);
    if (event.paymentLink) window.open(event.paymentLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-heritage-cream pb-12">
      <div className="relative h-72 bg-heritage-maroon sm:h-96">
        <img src={event.image || fallbackImage} alt={event.title} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2 sm:left-8 sm:top-6">
          <Link to="/events" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-heritage-maroon">← Events</Link>
        </div>
        <div className="absolute right-4 top-4 flex gap-2 sm:right-8 sm:top-6">
          <button onClick={() => dispatch(toggleBookmark(event.id))} aria-label="Bookmark event" className="rounded-full bg-white p-3 text-heritage-maroon">{bookmarked ? <FaBookmark /> : <FaRegBookmark />}</button>
          <button onClick={share} aria-label="Share event" className="rounded-full bg-white p-3 text-heritage-maroon"><FaShareAlt /></button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-white/20 px-3 py-1">{event.category}</span><span className="rounded-full bg-green-600 px-3 py-1">{event.isFree ? 'FREE' : 'PAID'}</span><span className="rounded-full bg-black/30 px-3 py-1">{isPast ? 'PAST' : 'UPCOMING'}</span></div>
          <h1 className="text-3xl font-bold sm:text-5xl">{event.title}</h1>
        </div>
      </div>

      <div className="container mx-auto grid max-w-6xl gap-7 px-4 py-8 lg:grid-cols-3">
        <article className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold text-heritage-maroon">About this event</h2><p className="mt-4 leading-7 text-gray-700">{event.fullDescription || event.description}</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold text-heritage-maroon">Organizer</h2><p className="mt-3 font-semibold">{event.organizer || 'HeriTej Pulse'}</p><p className="mt-1 text-gray-600">{event.organizerEmail}</p><p className="text-gray-600">{event.organizerPhone}</p></div>
        </article>
        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-6">
            <div className="space-y-3 text-sm text-gray-700"><p className="flex gap-3"><FaCalendar className="mt-1 text-heritage-maroon" />{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {event.time}</p><p className="flex gap-3"><FaMapMarkerAlt className="mt-1 text-heritage-maroon" />{event.venue || `${event.city}, ${event.state}`}</p><p>Language: {event.language}</p><p>Status: <b>{isPast ? 'Registration closed' : event.registrationStatus || 'Open'}</b></p></div>
            {!isPast && <button onClick={() => event.isFree ? navigate(`/register/${event.id}`) : setPaymentOpen(true)} className="mt-6 w-full rounded-lg bg-heritage-maroon py-3 font-semibold text-white hover:bg-opacity-90">{event.isFree ? 'Register now' : 'Book now'}</button>}
            {!isPast && !event.isFree && !event.paymentLink && <p className="mt-3 text-sm text-red-600">Payment link unavailable. Please contact the organizer.</p>}
          </div>
          {relatedEvents.length > 0 && <div className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold text-heritage-maroon">Related events</h2>{relatedEvents.map((item) => <Link className="mt-3 block border-t pt-3 text-sm font-medium hover:text-heritage-maroon" key={item.id} to={`/events/${item.id}`}>{item.title}<span className="block pt-1 font-normal text-gray-500">{item.city}</span></Link>)}</div>}
        </aside>
      </div>
      <ConfirmationModal isOpen={paymentOpen} onClose={() => setPaymentOpen(false)} onConfirm={proceedToPayment} title="Continue to payment?" message="You will be redirected to the organizer payment page." confirmText="Continue" />
    </section>
  );
}
