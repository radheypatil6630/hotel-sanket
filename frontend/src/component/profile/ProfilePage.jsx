import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page max-w-4xl mx-auto px-6 py-8 my-12  border border-gray-300 rounded-lg shadow-lg shadow-[#687a5e] bg-white">
        {user && <h2 className="text-4xl font-serif font-semibold text-secondary text-center">Welcome, {user.name}</h2>}
        

        {/* <div className="profile-actions flex justify-center gap-4 mt-6">
          <button
            className="edit-profile-button bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="logout-button bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div> */}
      
   
        {error && <p className="error-message text-red-600 text-center mt-4">{error}</p>}
      
 
        {user && (
          <div className="profile-details mt-8 border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-md shadow-[#687a5e] hover:shadow-lg hover:shadow-[#687a5e] flex flex-col gap-4">
            <h3 className="text-3xl font-semibold font-serif text-gray-800">My Profile Details</h3>
            <p className="border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white"><strong>Email:</strong> {user.email}</p>
            <p className="border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white"><strong>Phone Number:</strong> {user.phoneNumber}</p>
          </div>
        )}
      
  
        <div className="bookings-section mt-12">
          <h3 className="text-3xl font-semibold font-serif text-gray-800">My Booking History</h3>
          <div className="booking-list space-y-4">
            {user && user.bookings.length > 0 ? (
              user.bookings.map((booking) => (
                <div key={booking.id} className="booking-item bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 border border-gray-300 hover:shadow-lg hover:shadow-[#687a5e]">
                  <p className='border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                  <p className='border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                  <p className='border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                  <p className='border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                  <p className='border border-gray-300 rounded-lg p-2 bg-sky-50 hover:bg-[#74d143] hover:text-white'><strong>Room Type:</strong> {booking.room.roomType}</p>
                  <img
                    src={booking.room.roomPhotoUrl}
                    alt="Room"
                    className="room-photo w-full h-64 object-cover mt-4 rounded-md"
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
      
    );
};

export default ProfilePage;
