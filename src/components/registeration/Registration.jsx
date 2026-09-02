import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUsers, FaStickyNote } from 'react-icons/fa';
import { addRegistration } from '../../redux/slices/registrationsSlice';
import { validateRegistration, generateRegistrationId } from '../../utils/validation';
import Loader from '../common/Loader';

const RegistrationForm = ({ eventId, eventTitle, onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    participants: 1,
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const regId = generateRegistrationId();
      setRegistrationId(regId);
      
      // Save to Redux
      dispatch(addRegistration({
        ...formData,
        eventId,
        eventTitle,
        registrationId: regId,
        registrationDate: new Date().toISOString()
      }));
      
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess(regId);
      }
    }, 1500);
  };

  if (loading) return <Loader text="Processing registration..." />;

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-4">You have successfully registered for <strong>{eventTitle}</strong></p>
        <div className="bg-heritage-cream p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Your Registration ID:</p>
          <p className="text-2xl font-bold text-heritage-maroon">{registrationId}</p>
        </div>
        <button
          onClick={() => navigate('/events')}
          className="px-6 py-2 bg-heritage-maroon text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Browse More Events
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition"
              placeholder="Enter your city"
            />
          </div>
        </div>

        {/* Participants */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Participants *
          </label>
          <div className="relative">
            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              min="1"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition ${
                errors.participants ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Number of participants"
            />
          </div>
          {errors.participants && <p className="text-red-500 text-xs mt-1">{errors.participants}</p>}
        </div>

        {/* Special Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Notes
          </label>
          <div className="relative">
            <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-maroon transition resize-none"
              placeholder="Any special requirements or notes..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-heritage-maroon py-3 text-sm font-semibold text-white transition hover:bg-opacity-90"
        >
          Register Now
        </button>
        <button
          type="button"
          onClick={() => navigate('/events')}
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
