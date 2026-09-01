import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaShare, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = memo(({ event }) => {
  const { id, title, category, city, state, date, time, isFree, image, description } = event;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FaBookmark />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FaShare />
          </button>
        </div>
        <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-semibold ${
          isFree ? 'bg-green-500 text-white' : 'bg-heritage-maroon text-white'
        }`}>
          {isFree ? 'FREE' : 'PAID'}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-sm text-heritage-maroon font-medium">{category}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <FaMapMarkerAlt className="mr-1" />
          {city}, {state}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FaCalendar className="mr-1" />
          {new Date(date).toLocaleDateString()} at {time}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <Link 
          to={`/events/${id}`}
          className="block w-full text-center bg-heritage-maroon text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
});

export default EventCard;