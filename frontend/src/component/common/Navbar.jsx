import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
     
        <nav className=" flex justify-between items-center px-6 py-4 bg-primary text-white shadow-md text-xl font-sans relative z-2absolute top-0 left-0 w-full z-20 flex justify-between items-center px-6 py-4 text-white text-lg">
        {/* Logo */}
        {/* <div className="text-2xl font-bold text-white">
          <NavLink to="/home" className="no-underline hover:text-[#84a871]">
            Hotel Sanket
          </NavLink>
        </div> */}
      
        {/* Navigation Links */}
        <ul className="flex gap-8 pl-[35%]">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `relative inline-block px-1  
       ${isActive ? "text-[#84a871] font-semibold" : "text-[#a7ba9c]"} 
       after:block after:h-[2px] after:bg-gray-300 after:scale-x-0 
       hover:after:scale-x-100 hover:text-white after:transition-transform after:origin-left`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `relative inline-block px-1 
       ${isActive ? "text-[#84a871] font-semibold" : "text-[#a7ba9c]"} 
       after:block after:h-[2px] after:bg-gray-300 after:scale-x-0 
       hover:after:scale-x-100 hover:text-white after:transition-transform after:origin-left`
              
              }
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/find-booking"
              className={({ isActive }) =>
                `relative inline-block px-1 
              ${isActive ? "text-[#84a871] font-semibold" : "text-[#a7ba9c]"} 
              after:block after:h-[2px] after:bg-gray-300 after:scale-x-0 
              hover:after:scale-x-100 hover:text-white after:transition-transform after:origin-left`
                     }
            >
              Find Booking
            </NavLink>
          </li>
      
          {isUser && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `relative inline-block px-1 
                ${isActive ? "text-[#84a871] font-semibold" : "text-[#a7ba9c]"} 
                after:block after:h-[2px] after:bg-gray-300 after:scale-x-0 
                hover:after:scale-x-100 hover:text-white after:transition-transform after:origin-left`
                       }
              >
                Profile
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `relative inline-block px-1 
                ${isActive ? "text-[#84a871] font-semibold" : "text-[#a7ba9c]"} 
                after:block after:h-[2px] after:bg-gray-300 after:scale-x-0 
                hover:after:scale-x-100 hover:text-white after:transition-transform after:origin-left`
                       }
              >
                Admin
              </NavLink>
            </li>
          )}
        </ul>
      
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-1 rounded-md border border-gray-400 font-semibold ${
                    isActive
                      ? " border border-gray-400  text-white hover:bg-[#629645]"
                      : "  transition duration-300  text-white hover:bg-[#629645]"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-1 rounded-md border border-gray-400 font-semibold ${
                    isActive
                      ? " border border-gray-400  text-white hover:bg-blue-600"
                      : " transition duration-300  text-white hover:bg-blue-600"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-md  transition duration-300 font-semibold border border-gray-400  text-white hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      
    );
}

export default Navbar;
