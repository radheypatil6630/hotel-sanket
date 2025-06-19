import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import AboutSection from "../common/AboutSection";

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
 
        <div className="max-w-3xl mx-auto my-16 p-8 bg-white shadow-md rounded-xl text-center border border-gray-300 shadow-[#687a5e]">
        <h1 className="text-3xl font-bold font-serif text-secondary mb-8">Welcome, {adminName}</h1>
      
        <div className="flex flex-col sm:flex-row justify-evenly items-center gap-6">
          <button
            className="bg-btn_bg text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-hover_btn_bg transition-colors duration-300 w-full sm:w-auto"
            onClick={() => navigate('/admin/manage-rooms')}
          >
            Manage Rooms
          </button>
          <button
            className="bg-btn_bg text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-hover_btn_bg transition-colors duration-300 w-full sm:w-auto"
            onClick={() => navigate('/admin/manage-bookings')}
          >
            Manage Bookings
          </button>
        </div>
      </div>
    
    );
}

export default AdminPage;
