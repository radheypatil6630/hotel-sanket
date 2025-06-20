import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-br from-[#e8f5e9] to-[#f1f8f6] text-gray-800  pt-2 shadow-inner mt-2 border-t border-green-100">
      <div className="max-w-7xl mx-auto px-2 py-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
     
        <div>
          <h2 className="text-3xl font-extrabold text-[#84a871] mb-3">Hotel Sanket</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Where heritage meets hospitality. Luxurious rooms, personalized service, and unforgettable memories await you.
          </p>
          <div className="flex gap-4 mt-5 text-[#84a871] text-xl">
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              +980 123 (4567) 890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-600" />
              hotelsanket@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-green-600 mt-1" />
              <span>Radhanagari - Main road , kurukali , Karveer - 416001</span>
            </li>
          </ul>
        </div>

        {/* Quick Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/aboutus" className="hover:text-[#84a871] hover:underline transition duration-200">About Us</a>
            </li>
            <li>
              <a href="/rooms" className="hover:text-[#84a871] hover:underline transition duration-200">Rooms</a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-[#84a871] hover:underline transition duration-200">Contact</a>
            </li>
            
          </ul>
        </div>
      </div>

    

        <div className="container mx-auto text-center py-2 bg-gray-400">
            <span className="text-md">
                 Hotel Sanket ,Kurukali | All Rights Reserved &copy; {new Date().getFullYear()}
            </span>
        </div>
    </footer>
    
    );
};

export default FooterComponent;
