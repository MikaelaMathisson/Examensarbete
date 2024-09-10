"use client";

import React, { useState } from "react";

const Page = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5 font-sans">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Enduro Information
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Enduro är en form av motorcykelsport som körs på varierande terräng,
          inklusive skogsstigar, grusvägar och tekniska sektioner. Här är
          öppettider för vår endurobana:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Längd: 12 km</li>
          <li>Underlag: Blandat (jord, grus, sand)</li>
          <li>Svårighetsgrad: Medel till svår</li>
          <li>Öppettider: 08:00 - 18:00</li>
        </ul>
        <button
          onClick={toggleDropdown}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isDropdownOpen ? "Dölj Träningstider" : "Visa Träningstider"}
        </button>
        {isDropdownOpen && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Träningstider
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Onsdag: 17:00 - 20:00</li>
              <li>Lördag: 09:00 - 15:00</li>
              <li>Söndag: 09:00 - 15:00</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
