import { useSelector } from 'react-redux';
import EventCard from '../components/events/EventCard';
import EmptyState from '../components/common/EmptyStage';

export default function BookmarksPage() {
  const bookmarkedIds = useSelector((state) => state.bookmarks.items);
  const events = useSelector((state) => state.events.events.filter((event) => bookmarkedIds.includes(event.id)));

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <header className="mb-7 rounded-3xl bg-heritage-maroon px-6 py-8 text-white shadow-lg sm:px-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-heritage-gold">Your collection</p><h1 className="mt-2 text-3xl font-bold">Saved heritage events</h1><p className="mt-2 text-sm text-white/75">Keep the experiences you want to revisit in one place.</p></header>
      {events.length === 0 ? <EmptyState type="no-bookmarks" message="No saved events yet" subMessage="Use the bookmark icon on an event card to build your collection." /> : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>}
    </section>
  );
}
