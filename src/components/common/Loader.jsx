import React from 'react';

const Loader = ({ 
  size = 'medium', 
  fullScreen = false,
  text = 'Loading...',
  type = 'spinner' // 'spinner', 'dots', 'skeleton'
}) => {
  // Size configurations
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const spinnerSize = sizes[size] || sizes.medium;

  // Spinner Loader
  if (type === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center ${fullScreen ? 'fixed inset-0 bg-white bg-opacity-80 z-50' : 'py-8'}`}>
        <div className="relative">
          {/* Outer ring */}
          <div className={`${spinnerSize} border-4 border-heritage-beige rounded-full animate-spin`}>
            {/* Inner ring */}
            <div className={`${spinnerSize} border-4 border-heritage-maroon rounded-full animate-ping absolute top-0 left-0 border-opacity-30`}></div>
          </div>
          {/* Inner content */}
          <div className={`${spinnerSize} flex items-center justify-center absolute top-0 left-0`}>
            <span className="text-2xl">🏛️</span>
          </div>
        </div>
        {text && (
          <p className="mt-4 text-gray-600 font-medium">{text}</p>
        )}
      </div>
    );
  }

  // Dots Loader
  if (type === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center ${fullScreen ? 'fixed inset-0 bg-white bg-opacity-80 z-50' : 'py-8'}`}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-heritage-maroon rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-heritage-maroon rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
          <div className="w-3 h-3 bg-heritage-maroon rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
        {text && (
          <p className="mt-4 text-gray-600 font-medium">{text}</p>
        )}
      </div>
    );
  }

  // Skeleton Loader (for cards)
  if (type === 'skeleton') {
    const count = size === 'large' ? 6 : size === 'small' ? 2 : 3;
    
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${fullScreen ? 'p-8' : ''}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// Skeleton Card for individual use
export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </>
  );
};

export default Loader;