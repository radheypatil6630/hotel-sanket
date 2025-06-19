import React from 'react'

const Contactpage = () => {
  return (
    <div className="container mx-auto mt-20 px-4">
    <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
      Contact Us 
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
        <h4 className="text-xl font-semibold text-green-700 mb-2">📞 Call Us</h4>
        <p className="text-gray-700">+980 123 (4567) 890</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
        <h4 className="text-xl font-semibold text-green-700 mb-2">✉️ Email</h4>
        <p className="text-gray-700">hotelsanket@gmail.com</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
        <h4 className="text-xl font-semibold text-green-700 mb-2">📍 Visit Us</h4>
        <p className="text-gray-700">Kurukali , karvir</p>
        <p className="text-gray-700">kolhapur-416001</p>
      </div>
    </div>
  </div>
  )
}

export default Contactpage
