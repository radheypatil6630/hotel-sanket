import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  return (
<div className="booking-results space-y-6">
  {bookingSearchResults.map((booking) => (
    <div
      key={booking.id}
      className="booking-result-item p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <p className="text-lg font-semibold text-gray-800">
        <span className="font-bold">Room ID:</span> {booking.roomId}
      </p>
      <p className="text-lg font-semibold text-gray-800">
        <span className="font-bold">User ID:</span> {booking.userId}
      </p>
      <p className="text-lg font-semibold text-gray-800">
        <span className="font-bold">Start Date:</span> {booking.startDate}
      </p>
      <p className="text-lg font-semibold text-gray-800">
        <span className="font-bold">End Date:</span> {booking.endDate}
      </p>
      <p className={`text-lg font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}`}>
        <span className="font-bold">Status:</span> {booking.status}
      </p>
      
      {/* Edit Link */}
      <Link
        to={`/admin/edit-booking/${booking.id}`}
        className="text-blue-500 hover:text-blue-700 font-semibold mt-2 inline-block"
      >
        Edit
      </Link>
    </div>
  ))}
</div>

  );
};

export default BookingResult;
