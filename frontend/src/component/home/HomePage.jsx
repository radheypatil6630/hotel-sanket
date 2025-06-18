import React, { useState , useEffect } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import ApiService from '../../service/ApiService';



const HomePage = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
    console.log("Search results:", results); 
  };

  useEffect(() => {
 
    ApiService.getAllAvailableRooms()
      .then((data) => {
        setAllRooms(data.roomList);  
        setRoomSearchResults([]);
        // setRoomSearchResults(data.roomList);  
        console.log("rooms :", data.roomList);  
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);
  


  return (
    <div>
      <div className="relative w-full h-[32rem] bg-primary overflow-hidden">
        <div className="absolute right-6 md:right-28 top-28 text-white max-w-xl z-10">
          <h1 className="text-4xl md:text-5xl font-serif">
            Your Gateway to Comfort <br /> and Convenience.
          </h1>
          <p className="mt-4 text-xl text-gray-200">Book now and get the best prices</p>
        </div>
        <img
            src="/assets/images/hotel1.jpg"
            alt="Hotel Room"
            className="absolute top-0 left-0 h-full w-[55%] object-cover z-10"
            style={{ clipPath: 'polygon(46% 0, 89% 48%, 70% 100%, 0 100%, 0 0)' }}
          />
        {/* clip-path: polygon(37% 0, 100% 45%, 73% 100%, 1% 100%, 0 0); */}
        {/* Search Box */}
        <div className="absolute bottom-28 left-2/4 transform -translate-x-1/2 w-full max-w-6xl px-4 z-40">
          <RoomSearch handleSearchResult={handleSearchResult} />
        </div>

        <div className="absolute left-4 lg:left-1/3 top-16 z-20">
          <div
            
            className="rounded-full h-80 w-80 lg:h-80 lg:w-80 object-cover bg-[#2e5cd1] border-2 border-white shadow-lg"
          > <h1 className="text-6xl font-serif font-bold text-center text-white mt-24">40 Years</h1> 
          <h4 className="text-3xl font-serif font-semibold text-center text-white mt-4">of  Experience</h4>
          </div> 
        </div>
      </div>

      <div>
        <h2 className=" text-4xl font-semibold font-serif text-center text-secondary mt-16">
          Our Rooms
        </h2>

        
        <RoomResult className="" roomSearchResults={roomSearchResults.length > 0 ? roomSearchResults : allRooms} />
      </div>

      <div className="bg-primary">
        <h2 className="home-services text-4xl font-semibold font-serif text-center text-white mt-16">
          Services at Hotel Sanket
        </h2>

        <div className="service-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4 pb-10 px-12">
          <div className="service-card bg-gray-50 border border-gray-300 hover:border-gray-500 p-2 shadow-xl hover:shadow-[#687a5e] rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
            <img src="./assets/images/ac.png" alt="Air Conditioning" className="w-full h-48 pt-4 object-cover" />
            <div className="service-details p-4">
              <h3 className="service-title text-2xl font-bold font-serif text-center text-gray-800">Air Conditioning</h3>
              <p className="text-gray-600 mt-2 text-md leading-relaxed">
                Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.
              </p>
            </div>
          </div>

          <div className="service-card bg-gray-50 border border-gray-300 hover:border-gray-500 p-2 shadow-xl hover:shadow-[#687a5e] rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
            <img src="./assets/images/mini_bar.png" alt="Mini Bar" className="w-full pt-4 object-cover" />
            <div className="service-details p-4">
              <h3 className="service-title text-2xl font-bold font-serif text-center text-gray-800">Mini Bar</h3>
              <p className="text-gray-600 mt-2 text-md leading-relaxed">
                Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.
              </p>
            </div>
          </div>

          <div className="service-card bg-gray-100 border border-gray-300 hover:border-gray-500 shadow-xl hover:shadow-[#687a5e] rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
            <img
              src="./assets/images/parking.png"
              alt="Parking"
              className="w-full pt-4 h-48 object-cover rounded-t-md"
            />
            <div className="bg-gray-50 h-full mt-4 p-4">
              <h3 className="service-title text-2xl font-serif font-bold text-gray-800 text-center">
                Parking
              </h3>
              <p className="text-gray-600 mt-2 text-md leading-relaxed">
                We offer on-site parking for your convenience. Please inquire about valet parking options if available.
              </p>
            </div>
          </div>

          <div className="service-card bg-gray-50 border border-gray-300 hover:border-gray-500 p-2 shadow-xl hover:shadow-[#687a5e] rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
            <img src="./assets/images/wifi.png" alt="WiFi" className="w-full h-48 object-cover m-auto" />
            <div className="service-details p-4">
              <h3 className="service-title text-2xl font-bold text-center font-serif text-gray-800">WiFi</h3>
              <p className="text-gray-600 mt-2 text-md leading-relaxed">
                Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
