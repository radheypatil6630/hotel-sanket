import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Room Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-xl shadow-[#a7ba9c] border border-gray-300 rounded-xl hover:shadow-[#687a5e]   rounded-lg overflow-hidden ">
        <h2 className="text-4xl font-bold font-serif text-center text-secondary mb-6">Edit Room</h2>
      
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="flex flex-col items-center space-y-3">
            {preview ? (
              <img src={preview} alt="Room Preview" className="w-full max-h-64 object-cover rounded-md shadow" />
            ) : roomDetails.roomPhotoUrl && (
              <img src={roomDetails.roomPhotoUrl} alt="Room" className="w-full max-h-64 object-cover rounded-md shadow" />
            )}
            <input
              type="file"
              name="roomPhoto"
              onChange={handleFileChange}
              className="mt-2"
            />
          </div>
         
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Room Location</label>
            <input
              type="text"
              name="roomType"
              // value={roomDetails.roomType}
              // onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Room Type</label>
            <input
              type="text"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
            />
          </div>
      
          {/* Room Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Room Price</label>
            <input
              type="text"
              name="roomPrice"
              value={roomDetails.roomPrice}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-btn_bg"
            />
          </div>
      
          {/* Room Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Room Description</label>
            <textarea
              name="roomDescription"
              value={roomDetails.roomDescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-1 focus:ring-btn_bg"
            ></textarea>
          </div>
      
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="w-full bg-[#629645]  text-white font-bold py-3 rounded-md hover:bg-[#4f8a2f] transition duration-300"
              onClick={handleUpdate}
            >
              Update Room
            </button>
            <button
              className="w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 transition duration-300"
              onClick={handleDelete}
            >
              Delete Room
            </button>
          </div>
        </div>
      </div>
      
    );
};

export default EditRoomPage;
