import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import { filterEvents } from '../utils/filters';

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector(state => state.events);
  const filters = useSelector(state => state.filters);
  
  const filteredEvents = filterEvents(events, filters);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-heritage-maroon">
        Discover Heritage Events
      </h1>
      
      <EventFilters />
      
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