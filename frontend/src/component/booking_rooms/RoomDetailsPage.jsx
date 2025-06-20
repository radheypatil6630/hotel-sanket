import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  
  const today = new Date();

  const { roomId } = useParams(); 
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [checkInDate, setCheckInDate] = useState(null); 
  const [checkOutDate, setCheckOutDate] = useState(null);  
  const [numAdults, setNumAdults] = useState(1); 
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [totalGuests, setTotalGuests] = useState(1); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(''); 
  const [showMessage, setShowMessage] = useState(false); 
  const [confirmationCode, setConfirmationCode] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [roomId]); 

  const handleConfirmBooking = async () => {
    
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }

    
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }


    const oneDay = 24 * 60 * 60 * 1000; 
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    
    const totalGuests = numAdults + numChildren;

   
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };





  const acceptBooking = async () => {
    try {

  
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);


      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];




      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };


      const bookingResponse = await ApiService.bookRoom(roomId, userId, booking);
      if (bookingResponse.statusCode !== 200) {

        setErrorMessage(bookingResponse.message || "Booking failed.");
        setTimeout(() => setErrorMessage(""), 5000);
        return; 
      }


      const orderResponse = await ApiService.paymentGetway(totalPrice)
     

      const order = orderResponse;

      const options = {
        key: "rzp_test_P6Vfg99dxGR0Ji",
        amount: order.amount,
        currency: order.currency,
        name: "Hotel sanket",
        description: "Payment Transaction",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);


          // const bookingResponse = await ApiService.bookRoom(roomId, userId, booking);
          if (bookingResponse.statusCode === 200) {
            setConfirmationCode(bookingResponse.bookingConfirmationCode);
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
              navigate('/rooms');
            }, 5000);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();



    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  if (isLoading) {
    return <p className='room-detail-loading'>Loading room details...</p>;
  }

  if (error) {
    return <p className='room-detail-loading'>{error}</p>;
  }

  if (!roomDetails) {
    return <p className='room-detail-loading'>Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="max-w-4xl mx-auto my-12 px-6 border border-gray-300 rounded-lg shadow-md shadow-[#687a5e] bg-white p-8">

      {showMessage && (
        <p className="text-gray-600 font-semibold text-center mb-4">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
        </p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-semibold text-center mb-4">
          {errorMessage}
        </p>
      )}

      {/* Room Details Section */}
      <h2 className="text-4xl font-bold font-serif text-center text-secondary mb-6">Room Details</h2>

      <div className="flex justify-center mb-6">
        <img src={roomPhotoUrl} alt={roomType} className="rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2" />
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800">{roomType}</h3>
        <p className="text-xl text-[#6c943b]  font-medium ">Price: ₹{roomPrice} / night</p>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>

      {/* Existing Booking Details */}
      {bookings && bookings.length > 0 && (
        <div className="mt-8 border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-md shadow-[#687a5e] ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Booking Details</h3>
          <ul className="space-y-4">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="p-4 bg-white shadow-md rounded-md">
                <span className="font-semibold">Booking {index + 1} </span>
                <span className="text-gray-600">Check-in: {booking.checkInDate} </span>
                <span className="text-gray-600">Out: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Booking Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <button
          className="px-6 py-3 bg-btn_bg text-white font-semibold rounded-md hover:bg-hover_btn_bg transition-colors duration-300"
          onClick={() => setShowDatePicker(true)}
        >
          Book Now
        </button>
        <button
          className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition-colors duration-300"
          onClick={() => setShowDatePicker(false)}
        >
          Go Back
        </button>
      </div>

      {/* Date Picker & Guest Information */}
      {showDatePicker && (
        <div className="mt-8 border border-gray-300 rounded-lg p-4 bg-blue-200 shadow-sm  ">
          <div className="flex flex-col items-center space-y-6">
            <DatePicker
              className="px-4 py-2 border border-gray-500 bg-sky-50  text-black  rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              minDate={today}
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              className="px-4 py-2 border border-gray-500 bg-sky-50  text-black  rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              dateFormat="dd/MM/yyyy"
            />

            {/* Guest Information */}
            <div className="flex justify-between space-x-6 mt-6 w-full max-w-md">
              <div className="flex flex-col">
                <label className="text-lg">Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-500 bg-sky-50  text-black  rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg">Children:</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-500 bg-sky-50  text-black  rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
                />
              </div>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-btn_bg text-white font-semibold rounded-md hover:bg-hover_btn_bg transition-colors duration-300"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Total Price Section */}
      {totalPrice > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold  text-gray-800">Total Price: ₹{totalPrice}</p>
          <p className="text-xl font-semibold  text-gray-700">Total Guests: {totalGuests}</p>
          <button
            onClick={acceptBooking}
            className="mt-4 px-6 py-3 bg-btn_bg text-white font-semibold rounded-md hover:bg-hover_btn_bg transition-colors duration-300"
          >
            Accept Booking
          </button>
        </div>
      )}
    </div>

  );
};

export default RoomDetailsPage;
