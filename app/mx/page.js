import React from "react";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faList, faQuestionCircle, faClock, faMotorcycle, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  return (
      <main className="relative inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
        <div className="bg-opacity-75 bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 id="baninformation" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Baninformation
          </h1>
          <p className="text-lg mb-4 text-black">
            På Arlanda MC finns 3 crossbanor, Stora, Mellan och Lilla. Bredvid
            depån finns tillgång till tvättstation under sommartid.
          </p>
          <h2 className="text-2xl font-bold mb-2 text-black">Träningstider</h2>
          <ul className="list-disc list-inside text-black mb-4">
            <li className="mb-2">Måndag: 10:00 - 18:00</li>
            <li className="mb-2">Onsdag: 12:00 - 20:00</li>
            <li className="mb-2">Fredag: 14:00 - 19:00</li>
            <li className="mb-2">Lördag: 09:00 - 17:00</li>
            <li className="mb-2">Söndag: 09:00 - 15:00</li>
          </ul>

          <h1 id="prislista" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Prislista
          </h1>
          <h1 id="faq" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Vanliga frågor
          </h1>
          <h1 id="traningstider" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Träningstider - Uppdelning
          </h1>
          <h1 id="gobraap" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            GoBraap
          </h1>
          <h1 id="licenser" className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Licenser och försäkringar
          </h1>
        </div>
        <nav className="fixed right-0 top-1/4 bg-gray-800 text-white p-4 rounded-l-lg">
          <ul className="space-y-2">
            <li><a href="#baninformation" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faInfoCircle} className="mr-2" />Baninformation</a></li>
            <li><a href="#prislista" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faList} className="mr-2" />Prislista</a></li>
            <li><a href="#faq" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />Vanliga frågor</a></li>
            <li><a href="#traningstider" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faClock} className="mr-2" />Träningstider</a></li>
            <li><a href="#gobraap" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faMotorcycle} className="mr-2" />GoBraap</a></li>
            <li><a href="#licenser" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faShieldAlt} className="mr-2" />Licenser</a></li>
          </ul>
        </nav>
      </main>
  );
};

export default Page;