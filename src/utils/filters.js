export const filterEvents = (events, filters) => {
  return events.filter(event => {
    // Search filter
    if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category !== 'All' && event.category !== filters.category) {
      return false;
    }

    // City filter
    if (filters.city !== 'All' && event.city !== filters.city) {
      return false;
    }

    // Price filter
    if (filters.price === 'free' && !event.isFree) return false;
    if (filters.price === 'paid' && event.isFree) return false;

    // Language filter
    if (filters.language !== 'All' && event.language !== filters.language) {
      return false;
    }

    return true;
  });
};