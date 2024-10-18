"use client";

import React, { useState } from "react";
import "../globals.css";

const Page = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <main className="absolute inset-0 flex items-center justify-center min-h-screen bg-page bg-gray-100 bg-opacity-50 p-4">
        <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Enduro Information
          </h1>
          <p className="text-lg mb-4 text-black">
            Enduro är en form av motorcykelsport som körs på varierande terräng,
            inklusive skogsstigar, grusvägar och tekniska sektioner. Här är
            öppettider för vår endurobana:
          </p>
          <ul className="text-left text-black mb-4">
            <li className="mb-2">Längd: 12 km</li>
            <li className="mb-2">Underlag: Blandat (jord, grus, sand)</li>
            <li className="mb-2">Svårighetsgrad: Medel till svår</li>
            <li className="mb-2">Öppettider: 08:00 - 18:00</li>
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
      </main>
  );
};

export default Page;