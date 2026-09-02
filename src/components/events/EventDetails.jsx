import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaTags,
  FaArrowLeft,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaClock
} from 'react-icons/fa';
import { selectEvent, setEvents, updateEventStatus } from '../redux/slices/eventsSlice';
import { toggleBookmark } from '../redux/slices/bookmarksSlice';
import { allEvents } from '../data/mockEvents';
import StatusBadge from '../components/common/StatusBadge';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ConfirmationModal from '../components/common/ConfirmationModal';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEvent, loading } = useSelector(state => state.events);
  const bookmarks = useSelector(state => state.bookmarks.items);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    // Initialize events if not already
    if (!selectedEvent || selectedEvent.id !== parseInt(id)) {
      const event = allEvents.find(e => e.id === parseInt(id));
      if (event) {
        dispatch(selectEvent(event.id));
      }
    }
  }, [id, dispatch, selectedEvent]);

  useEffect(() => {
    if (selectedEvent) {
      // Get related events (same category or city)
      const related = allEvents
        .filter(e => 
          e.id !== selectedEvent.id && 
          (e.category === selectedEvent.category || e.city === selectedEvent.city)
        )
        .slice(0, 3);
      setRelatedEvents(related);
    }
  }, [selectedEvent]);

  if (loading) return <Loader fullScreen text="Loading event details..." />;

  if (!selectedEvent) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState 
          type="no-results"
          message="Event not found"
          subMessage="The event you're looking for doesn't exist or has been removed."
          actionText="Browse Events"
          onAction={() => navigate('/events')}
        />
      </div>
    );
  }

  const {
    id: eventId,
    title,
    category,
    city,
    state,
    date,
    time,
    language,
    isFree,
    image,
    fullDescription,
    description,
    organizer,
    organizerEmail,
    organizerPhone,
    status,
    registrationStatus,
    venue,
    paymentLink,
    popularity
  } = selectedEvent;

  const isBookmarked = bookmarks.includes(eventId);
  const isPast = new Date(date) < new Date();
  const isUpcoming = !isPast;

  const handleBookmark = () => {
    dispatch(toggleBookmark(eventId));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/events/${eventId}`;
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this heritage event: ${title}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  const handleRegister = () => {
    if (isFree) {
      navigate(`/register/${eventId}`);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = () => {
    setShowPaymentModal(false);
    if (paymentLink) {
      window.open(paymentLink, '_blank');
    } else {
      alert('Payment link not available. Please contact the organizer.');
    }
  };

  const handleAdminAction = (action) => {
    const reason = action === 'reject' ? prompt('Enter rejection reason:') : null;
    if (action === 'reject' && !reason) return;
    
    dispatch(updateEventStatus({ 
      id: eventId, 
      status: action === 'approve' ? 'approved' : 'rejected',
      rejectionReason: reason || null
    }));
  };

  return (
    <div className="bg-heritage-cream min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-96 bg-heritage-maroon">
        <img 
          src={image || 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=500&fit=crop'} 
          alt={title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-heritage-maroon/80 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="absolute top-6 left-6 bg-white/90 p-3 rounded-full hover:bg-white transition-all shadow-lg"
        >
          <FaArrowLeft className="text-heritage-maroon" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={handleBookmark}
            className="bg-white/90 p-3 rounded-full hover:bg-white transition-all shadow-lg"
          >
            {isBookmarked ? (
              <FaBookmark className="text-heritage-maroon text-xl" />
            ) : (
              <FaRegBookmark className="text-heritage-maroon text-xl" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 p-3 rounded-full hover:bg-white transition-all shadow-lg"
          >
            <FaShare className="text-heritage-maroon text-xl" />
          </button>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-heritage-maroon px-4 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              isFree ? 'bg-green-500' : 'bg-purple-500'
            }`}>
              {isFree ? 'FREE' : 'PAID'}
            </span>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              isUpcoming ? 'bg-blue-500' : 'bg-gray-500'
            }`}>
              {isUpcoming ? 'Upcoming' : 'Past'}
            </span>
            {status && status !== 'approved' && (
              <StatusBadge status={status} />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt /> {city}, {state}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendar /> {new Date(date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> {time}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-heritage-maroon mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed">
                {fullDescription || description}
              </p>
            </div>

            {/* Organizer Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-heritage-maroon mb-4">Organizer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaUser className="text-heritage-maroon" />
                  <span className="font-medium">{organizer || 'HeriTej Pulse'}</span>
                </div>
                {organizerEmail && (
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-heritage-maroon" />
                    <a href={`mailto:${organizerEmail}`} className="text-heritage-maroon hover:underline">
                      {organizerEmail}
                    </a>
                  </div>
                )}
                {organizerPhone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-heritage-maroon" />
                    <a href={`tel:${organizerPhone}`} className="hover:text-heritage-maroon">
                      {organizerPhone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FaTags className="text-heritage-maroon" />
                  <span>Language: {language || 'English'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-heritage-maroon mb-4">Registration</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${isUpcoming ? 'text-green-600' : 'text-red-600'}`}>
                    {isUpcoming ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className={`font-medium ${isFree ? 'text-green-600' : 'text-purple-600'}`}>
                    {isFree ? 'Free' : 'Paid'}
                  </span>
                </div>
                {popularity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Popularity:</span>
                    <span className="font-medium">{popularity}%</span>
                  </div>
                )}
              </div>

              {isUpcoming && (
                <button
                  onClick={handleRegister}
                  className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                    isFree 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-heritage-maroon hover:bg-opacity-90'
                  }`}
                >
                  {isFree ? 'Register Now' : 'Book Now'}
                </button>
              )}

              {status === 'pending' && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-600">Admin Actions:</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdminAction('approve')}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAdminAction('reject')}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-heritage-maroon mb-4">Related Events</h3>
                <div className="space-y-3">
                  {relatedEvents.map(event => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-heritage-maroon transition group"
                    >
                      <h4 className="font-medium group-hover:text-heritage-maroon transition">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {event.city}, {event.state}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <ConfirmationModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handlePaymentConfirm}
        title="Payment Confirmation"
        message="You will be redirected to the organizer's payment page."
        confirmText="Proceed to Payment"
        cancelText="Cancel"
      />
    </div>
  );
};

export default EventDetailPage;