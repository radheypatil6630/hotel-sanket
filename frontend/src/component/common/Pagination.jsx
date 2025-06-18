import React from 'react';

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-nav">
    <ul className="flex justify-center space-x-2">
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
              currentPage === number
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-white'
            }`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default Pagination;

