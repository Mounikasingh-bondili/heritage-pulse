import { allEvents } from '../data/mockEvent';

export const filterEvents = (events, filters) => {
  const searchTerm = typeof filters.search === 'string' ? filters.search.toLowerCase() : '';

  return events.filter(event => {
    // Search
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm)) {
      return false;
    }

    // Category
    if (filters.category && filters.category !== 'All' && event.category !== filters.category) {
      return false;
    }

    // City
    if (filters.city && filters.city !== 'All' && event.city !== filters.city) {
      return false;
    }

    // Price
    if (filters.price === 'free' && !event.isFree) return false;
    if (filters.price === 'paid' && event.isFree) return false;

    // Language
    if (filters.language && filters.language !== 'All' && !event.language.includes(filters.language)) {
      return false;
    }

    // Status (Upcoming/Past)
    if (filters.status && filters.status !== 'All') {
      const eventDate = new Date(event.date);
      const today = new Date();
      
      if (filters.status === 'Upcoming' && eventDate < today) return false;
      if (filters.status === 'Past' && eventDate >= today) return false;
    }

    return true;
  });
};

export const sortEvents = (events, sortBy = 'date', sortOrder = 'asc') => {
  const sorted = [...events];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'popularity':
        comparison = (a.popularity || 0) - (b.popularity || 0);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

export const getRelatedEvents = (event, events, limit = 3) => {
  return events
    .filter(e => e.id !== event.id && (e.category === event.category || e.city === event.city))
    .slice(0, limit);
};

export const getUpcomingEvents = (events) => {
  const today = new Date();
  return events.filter(event => new Date(event.date) >= today);
};

export const getPastEvents = (events) => {
  const today = new Date();
  return events.filter(event => new Date(event.date) < today);
};

export const getFreeEvents = (events) => {
  return events.filter(event => event.isFree);
};

export const getPaidEvents = (events) => {
  return events.filter(event => !event.isFree);
};
