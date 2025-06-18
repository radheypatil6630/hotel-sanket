import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="edit-profile-page max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Edit Profile</h2>
        
        {/* Error Message */}
        {error && <p className="error-message text-red-600 text-center mb-4">{error}</p>}
      
        {/* Profile Details */}
        {user && (
          <div className="profile-details bg-white shadow-md rounded-lg p-6 mb-6">
            <p><strong className="text-lg">Name:</strong> {user.name}</p>
            <p><strong className="text-lg">Email:</strong> {user.email}</p>
            <p><strong className="text-lg">Phone Number:</strong> {user.phoneNumber}</p>
      
            {/* Delete Profile Button */}
            <button
              className="delete-profile-button bg-red-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-red-700"
              onClick={handleDeleteProfile}
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
      
    );
};

export default EditProfilePage;
