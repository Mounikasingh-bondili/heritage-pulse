import React from 'react';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info' // 'info', 'warning', 'danger'
}) => {
  if (!isOpen) return null;

  const colors = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      confirm: 'bg-blue-600 hover:bg-blue-700'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      confirm: 'bg-yellow-600 hover:bg-yellow-700'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-500',
      confirm: 'bg-red-600 hover:bg-red-700'
    }
  };

  const color = colors[type] || colors.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`flex items-center gap-3 ${color.bg} px-4 py-2 rounded-lg`}>
            <FaExclamationCircle className={color.icon} />
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 ${color.confirm} text-white py-2.5 rounded-lg transition font-medium`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;