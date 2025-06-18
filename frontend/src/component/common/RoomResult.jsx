import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Lottie from "lottie-react";


const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/assets/animation/not aviable.json')
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

    return (
        <section className="room-results p-4 ">
        {roomSearchResults && roomSearchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {roomSearchResults.map((room) => (
              <div key={room.id} className="room-list-item bg-white shadow-lg rounded-2xl overflow-hidden border border-[#687a5e]  hover:shadow-[#687a5e]   rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
                <img
                  className="room-list-item-image w-full h-60 object-cover"
                  src={room.roomPhotoUrl}
                  alt={room.roomType}
                />
                <div className="room-details px-4">
                <p className="text-2xl font-semibold text-black mt-2">{room.roomDescription}</p>
                  <h3 className="text-md font-semibold text-gray-800">{room.roomType}</h3>
                  {/* <p className="text-sm text-gray-500 mt-2">{room.roomDescription}</p> */}
                  <div className="flex justify-between mt-2">
                  <p className="text-lg text-[#6c943b] font-semibold">Price: ${room.roomPrice} / night</p>
                  <div className="flex items-center mt-2 bg-black text-white px-2  rounded-full w-fit">
    <span className="text-yellow-400 mr-1">★</span>
    <span className="text-sm">{room.rating || '4.5'}</span>
  </div>
  </div>
                </div>
      
                <div className="w-full p-2  text-center">
                  {isAdmin ? (
                    <button
                      className=" bg-[#7ca34d] text-white px-4 py-2 rounded-md hover:bg-[#2c4f03]"
                      onClick={() => navigate(`/admin/edit-room/${room.id}`)} 
                    >
                      Edit Room
                    </button>
                  ) : (
                    <button
                      className=" bg-[#7ba14d] text-white px-4 py-2 rounded-md hover:bg-[#6d9141]"
                      onClick={() => navigate(`/room-details-book/${room.id}`)} 
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          animationData && (
            <div className="flex justify-center items-center h-96">
              <Lottie animationData={animationData} loop={true} />
            </div>
          )
        )}
      </section>
      
    );
}

export default RoomResult;
