import React from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaCalendarCheck,
  FaCalendarTimes
} from 'react-icons/fa';

const StatusBadge = ({ 
  status, 
  size = 'medium',
  showIcon = true,
  className = '',
  rejectionReason = null
}) => {
  // Status configurations
  const configs = {
    'pending': {
      icon: FaClock,
      label: 'Pending',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-300',
    },
    'approved': {
      icon: FaCheckCircle,
      label: 'Approved',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
    },
    'rejected': {
      icon: FaTimesCircle,
      label: 'Rejected',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
    },
    'upcoming': {
      icon: FaCalendarCheck,
      label: 'Upcoming',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
    },
    'past': {
      icon: FaCalendarTimes,
      label: 'Past',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      borderColor: 'border-gray-300',
    },
    'free': {
      icon: FaCheckCircle,
      label: 'Free',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
    },
    'paid': {
      icon: FaExclamationTriangle,
      label: 'Paid',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-300',
    },
  };

  // Size configurations
  const sizes = {
    small: {
      padding: 'px-2 py-0.5',
      fontSize: 'text-xs',
      iconSize: 'w-3 h-3',
    },
    medium: {
      padding: 'px-3 py-1',
      fontSize: 'text-sm',
      iconSize: 'w-4 h-4',
    },
    large: {
      padding: 'px-4 py-1.5',
      fontSize: 'text-base',
      iconSize: 'w-5 h-5',
    },
  };

  const config = configs[status?.toLowerCase()] || configs['pending'];
  const sizeConfig = sizes[size] || sizes.medium;

  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-start">
      <span
        className={`
          inline-flex items-center
          ${sizeConfig.padding}
          ${sizeConfig.fontSize}
          ${config.bgColor}
          ${config.textColor}
          border
          ${config.borderColor}
          rounded-full
          font-medium
          ${className}
        `}
      >
        {showIcon && IconComponent && (
          <IconComponent className={`${sizeConfig.iconSize} mr-1.5`} />
        )}
        {config.label}
      </span>
      
      {/* Show rejection reason if status is rejected */}
      {status?.toLowerCase() === 'rejected' && rejectionReason && (
        <span className="mt-1 text-xs text-red-600 italic">
          Reason: {rejectionReason}
        </span>
      )}
    </div>
  );
};

// StatusBadge with tooltip
export const StatusBadgeWithTooltip = ({ status, rejectionReason, tooltip }) => {
  return (
    <div className="relative group">
      <StatusBadge status={status} rejectionReason={rejectionReason} />
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// Compact StatusBadge for tables
export const CompactStatusBadge = ({ status, rejectionReason }) => {
  const colorMap = {
    'pending': 'bg-yellow-500',
    'approved': 'bg-green-500',
    'rejected': 'bg-red-500',
    'upcoming': 'bg-blue-500',
    'past': 'bg-gray-500',
    'free': 'bg-green-500',
    'paid': 'bg-purple-500',
  };

  const dotColor = colorMap[status?.toLowerCase()] || 'bg-gray-500';

  return (
    <div className="flex items-center space-x-2">
      <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`}></span>
      <span className="text-sm capitalize">{status || 'Pending'}</span>
      {status?.toLowerCase() === 'rejected' && rejectionReason && (
        <span className="text-xs text-red-600 ml-1">(Reason: {rejectionReason})</span>
      )}
    </div>
  );
};

export default StatusBadge;