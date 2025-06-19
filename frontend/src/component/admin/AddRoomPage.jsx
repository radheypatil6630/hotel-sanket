import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import AboutSection from '../common/AboutSection';

const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomName: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);


    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
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


    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomName) {
            setError('All room details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this room?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomName', roomDetails.roomName);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Room Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
     
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg border border-gray-300  hover:shadow-[#687a5e]  overflow-hidden rounded-xl">
        <h2 className="text-4xl font-bold font-serif text-center text-secondary mb-6">Add New Room</h2>
      
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}
      
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            {preview && (
              <img src={preview} alt="Room Preview" className="w-full max-h-64 object-cover rounded-lg shadow" />
            )}
            <input
              type="file"
              name="roomPhoto"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
      
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Room Name</label>
            <input
                type="text"
              name="roomName"
              value={roomDetails.roomName}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-md px-3 py-2 resize-none"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Room Type</label>
            <select
              value={roomDetails.roomType}
              onChange={handleRoomTypeChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select a room type</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value="new">Other (please specify)</option>
            </select>
      
            {newRoomType && (
              <input
                type="text"
                name="roomType"
                placeholder="Enter new room type"
                value={roomDetails.roomType}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            )}
          </div>
      
      

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Room Price</label>
            <input
              type="text"
              name="roomPrice"
              value={roomDetails.roomPrice}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
      
          
      
          <button
            onClick={addRoom}
            className="w-full bg-[#629645] text-white font-bold py-3 rounded-md hover:bg-[#4f8a2f] transition-colors duration-300"
          >
            Add Room
          </button>
        </div>
      </div>
     
      
    );
};

export default AddRoomPage;
