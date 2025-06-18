import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-5xl mx-auto my-10 px-6">
        <h2 className="text-3xl font-bold font-serif text-center text-secondary mb-8">All Bookings</h2>
      
        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="font-semibold text-gray-700">Filter by Booking Number:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter booking number"
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      
        {/* Booking Results */}
        <div className="grid gap-6">
          {currentBookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <p><strong className="text-gray-900 text-lg">Booking Code:</strong> {booking.bookingConfirmationCode}</p>
              <p><strong className="text-gray-700">Check In Date:</strong> {booking.checkInDate}</p>
              <p><strong className="text-gray-700">Check Out Date:</strong> {booking.checkOutDate}</p>
              <p><strong className="text-gray-700">Total Guests:</strong> {booking.totalNumOfGuest}</p>
              <button
                className="mt-4 px-5 py-2 bg-btn_bg text-white rounded-md font-semibold hover:bg-hover_btn_bg transition"
                onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
              >
                Manage Booking
              </button>
            </div>
          ))}
        </div>
      
        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            roomsPerPage={bookingsPerPage}
            totalRooms={filteredBookings.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
      
    );
};

export default ManageBookingsPage;
