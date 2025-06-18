import React, { useState ,useEffect} from 'react';
import ApiService from '../../service/ApiService'; 

import Lottie from "lottie-react";

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); // State variable for confirmation code
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
    const [error, setError] = useState(null); // Track any errors
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
      fetch('/assets/animation/not-aviable.json')
        .then((res) => res.json())
        .then(setAnimationData);
    }, []);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a booking confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Call API to get booking details
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); // Clear error if successful
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-12 px-6 border border-gray-300 rounded-lg shadow-md shadow-[#687a5e]  bg-white p-8">
        <h2 className="text-4xl font-bold font-serif text-center text-secondary mb-8">Find Your Booking</h2>
      
        {/* Search Container */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center border border-gray-300 rounded-md">
            <input
              required
              type="text"
              placeholder="Enter your booking confirmation code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="px-4 py-2 w-80 border-r border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-btn_bg"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-btn_bg text-white font-semibold rounded-r-md hover:bg-hover_btn_bg transition-colors duration-300"
            >
              Find
            </button>
          </div>
        </div>
      
        {/* Error Message */}
        {error && animationData && (
          <div className="flex justify-center items-center h-96">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )
      }
      
        {/* Booking Details Section */}
        {bookingDetails && (
    <div className="space-y-8 border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-md shadow-[#687a5e] hover:shadow-lg hover:shadow-[#687a5e]">
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

     
    </div>
  )}
      </div>
      
    );
};

export default FindBookingPage;
