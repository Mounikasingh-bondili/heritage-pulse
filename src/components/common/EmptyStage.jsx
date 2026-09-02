import React from 'react';
import { FaSearch, FaFrown, FaExclamationCircle, FaFilter } from 'react-icons/fa';

const EmptyState = ({ 
  type = 'no-results', 
  message, 
  subMessage, 
  actionText, 
  onAction,
  icon 
}) => {
  // Different empty state configurations
  const configs = {
    'no-results': {
      icon: <FaSearch className="text-6xl text-gray-400" />,
      title: 'No events found',
      description: 'Try adjusting your filters or search terms',
    },
    'no-events': {
      icon: <FaFrown className="text-6xl text-gray-400" />,
      title: 'No events available',
      description: 'Check back later for new events',
    },
    'no-bookmarks': {
      icon: <FaFrown className="text-6xl text-gray-400" />,
      title: 'No bookmarks yet',
      description: 'Start saving your favorite events',
    },
    'no-registrations': {
      icon: <FaFrown className="text-6xl text-gray-400" />,
      title: 'No registrations yet',
      description: 'Register for events to see them here',
    },
    'filter-empty': {
      icon: <FaFilter className="text-6xl text-gray-400" />,
      title: 'No matches found',
      description: 'Try clearing some filters to see more results',
    },
    'error': {
      icon: <FaExclamationCircle className="text-6xl text-red-400" />,
      title: 'Something went wrong',
      description: 'Please try again later',
    },
  };

  const config = configs[type] || configs['no-results'];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6">
        {icon || config.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {message || config.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6">
        {subMessage || config.description}
      </p>

      {/* Optional Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-heritage-maroon text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;