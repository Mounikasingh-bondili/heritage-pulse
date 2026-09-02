import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import EmptyState from '../components/common/EmptyStage';
import Loader from '../components/common/Loader';
import { filterEvents, sortEvents } from '../utils/filters';

const EventsPage = () => {
  const { events, loading } = useSelector(state => state.events);
  const filters = useSelector(state => state.filters);
  
  const filteredEvents = useMemo(() => {
    const visibleEvents = events.filter((event) => event.status === 'approved');
    return sortEvents(filterEvents(visibleEvents, filters), filters.sortBy, filters.sortOrder);
  }, [events, filters]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-7 sm:py-10">
      <header className="relative mb-7 overflow-hidden rounded-3xl bg-heritage-maroon px-6 py-9 text-white shadow-xl sm:px-10 sm:py-12">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[22px] border-white/10" />
        <div className="relative max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-heritage-gold">Culture, stories, and places</p><h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">Discover India’s living heritage.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">Find walks, performances, exhibitions, and workshops that bring local history and culture closer to you.</p></div>
      </header>
      
      <EventFilters />
      
      <div className="mb-5 flex items-end justify-between"><div><h2 className="text-xl font-bold text-gray-900">Explore events</h2><p className="mt-1 text-sm text-gray-600">{filteredEvents.length} experience{filteredEvents.length === 1 ? '' : 's'} available</p></div></div>
      {filteredEvents.length === 0 ? (
        <EmptyState message="No events found matching your criteria" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
