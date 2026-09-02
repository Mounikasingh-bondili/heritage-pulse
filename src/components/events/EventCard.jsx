import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark, FaShare, FaCalendar, FaMapMarkerAlt, FaRegBookmark } from 'react-icons/fa';
import { toggleBookmark } from '../../redux/slices/bookmarksSlice';
import StatusBadge from '../common/StatusBadge';

const EventCard = memo(({ event }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.items);
  const isBookmarked = bookmarks.includes(event.id);
  const [shareOpen, setShareOpen] = useState(false);

  const {
    id,
    title,
    category,
    city,
    state,
    date,
    time,
    isFree,
    image,
    description,
    status,
    registrationStatus
  } = event;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleBookmark(id));
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/events/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this heritage event: ${title}`,
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {});
    }
  };

  // Check if event is past
  const isPast = new Date(date) < new Date();
  const isUpcoming = !isPast;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative">
        <img 
          src={image || 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop'} 
          alt={title}
          loading="lazy"
          className="w-full h-56 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            isFree ? 'bg-green-500 text-white' : 'bg-heritage-maroon text-white'
          }`}>
            {isFree ? 'FREE' : 'PAID'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            isUpcoming ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </span>
          {status && status !== 'approved' && (
            <StatusBadge status={status} size="small" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleBookmark}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Bookmark"
          >
            {isBookmarked ? (
              <FaBookmark className="text-heritage-maroon" />
            ) : (
              <FaRegBookmark className="text-gray-600" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Share"
          >
            <FaShare className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 hover:text-heritage-maroon transition-colors line-clamp-2">
            {title}
          </h3>
          <span className="text-xs text-heritage-maroon font-medium bg-heritage-cream px-2 py-1 rounded">
            {category}
          </span>
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-heritage-maroon flex-shrink-0" />
            <span>{city}, {state}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendar className="mr-2 text-heritage-maroon flex-shrink-0" />
            <span>{new Date(date).toLocaleDateString('en-IN', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })} at {time}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {description}
        </p>

        <div className="flex gap-2">
          <Link to={`/events/${id}`} className="flex-1 rounded-lg border border-heritage-maroon py-2.5 text-center text-sm font-semibold text-heritage-maroon transition hover:bg-heritage-cream">View Details</Link>
          {isFree && isUpcoming && registrationStatus !== 'closed' && <Link to={`/register/${id}`} className="flex-1 rounded-lg bg-heritage-maroon py-2.5 text-center text-sm font-semibold text-white transition hover:bg-opacity-90">Register now</Link>}
          {(!isFree || isPast || registrationStatus === 'closed') && <span className="flex-1 rounded-lg bg-gray-100 py-2.5 text-center text-sm font-semibold text-gray-500">{isPast ? 'Registration closed' : isFree ? 'Registration closed' : 'Paid event'}</span>}
        </div>
      </div>
    </div>
  );
});

export default EventCard;
