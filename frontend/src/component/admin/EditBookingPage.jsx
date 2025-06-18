import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
    const [error, setError] = useState(null); // Track any errors
    const [success, setSuccessMessage] = useState(null); // Track any errors



    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);


    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Acheive this booking?')) {
            return; // Do nothing if the user cancels
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The boking was Successfully Acheived")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
<div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl shadow-[#687a5e] rounded-xl border border-gray-300 ">
  <h2 className="text-3xl font-bold font-serif text-center text-secondary mb-6">Booking Details</h2>

  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  {success && <p className="text-green-600 text-center mb-4">{success}</p>}

  {bookingDetails && (
    <div className="space-y-8 ">
      {/* Booking Info */}
      <div className="border-l-4  border-btn_bg  pl-4 flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booking Info</h3>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Confirmation Code:</span> {bookingDetails.bookingConfirmationCode}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Check-in:</span> {bookingDetails.checkInDate}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Check-out:</span> {bookingDetails.checkOutDate}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Adults:</span> {bookingDetails.numOfAdults}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Children:</span> {bookingDetails.numOfChildren}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Guest Email:</span> {bookingDetails.guestEmail}</p>
      </div>

      {/* Booker Info */}
    
      <div className="border-l-4  border-btn_bg  pl-4 flex flex-col gap-4">
  
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booker Details</h3>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Name:</span> {bookingDetails.user.name}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Email:</span> {bookingDetails.user.email}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Phone:</span> {bookingDetails.user.phoneNumber}</p>
      </div>

      {/* Room Info */}
      <div className="border-l-4 border-btn_bg pl-4 flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Room Details</h3>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Type:</span> {bookingDetails.room.roomType}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Price:</span> ${bookingDetails.room.roomPrice}</p>
        <p className=' border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><span className="font-semibold">Description:</span> {bookingDetails.room.roomDescription}</p>
        <img
          src={bookingDetails.room.roomPhotoUrl}
          alt="Room"
          className="mt-4 w-full max-h-72 object-cover rounded-md shadow"
        />
      </div>

      <button
        onClick={() => acheiveBooking(bookingDetails.id)}
        className="w-full bg-btn_bg text-white font-bold py-3 rounded-md hover:bg-hover_btn_bg transition-colors duration-300"
      >
        Archive Booking
      </button>
    </div>
  )}
</div>

    );
};

export default EditBookingPage;
