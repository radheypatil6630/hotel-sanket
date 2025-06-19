import React from 'react';
import Contactpage from './Contactpage.jsx'

const AboutSection = () => (
  <section className="bg-gray-50 py-4 animate-fadeIn ">
    {/* About Us */}
    <div className="container mx-auto flex flex-col md:flex-row items-center md:space-x-12 px-4">
      {/* Image */}
      <div className="md:w-1/2" data-aos="fade-right">
        <img
          src="/assets/images/hotel121.jpg"
          alt="Hotel interior & ambiance"
          className="rounded-xl shadow-2xl object-cover w-full h-96 hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Text Content */}
      <div className="md:w-1/2 mt-10 md:mt-0 animate-slideInUp">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
         <span className="text-green-700">Hotel Sanket</span>
        </h2>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          With over <span className="font-semibold text-green-700">40 years</span> of hospitality excellence,
          we are your serene gateway to luxury, comfort, and unforgettable memories.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Luxurious rooms & suites</li>
          <li>On-site dining & spa lounge</li>
          <li>Steps away from top attractions</li>
          <li>Heartwarming family-style service</li>
        </ul>
        <a
          href="/rooms"
          className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-md shadow hover:bg-green-800 hover:scale-105 transition-transform duration-300"
        >
          Explore Our Rooms
        </a>
      </div>
    </div>

    
   
  </section>
);

export default AboutSection;
