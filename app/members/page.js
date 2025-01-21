import React from "react";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faUser, faCalendarAlt, faBook, faChalkboardTeacher, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

const Medlemmar = () => {
  return (
      <main className="relative inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
        <div className="bg-opacity-75 bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Medlemmar
          </h1>
          <p className="text-lg mb-4 text-black">
            Välkommen till Arlanda MC:s medlemssektion! Här hittar du information om våra medlemmar och medlemsförmåner.
          </p>
          <h2 className="text-2xl font-bold mb-2 text-black">Medlemsförmåner</h2>
          <ul className="list-disc list-inside text-black mb-4">
            <li className="mb-2">Tillgång till alla banor.</li>
            <li className="mb-2">Rabatter på evenemang och utrustning.</li>
            <li className="mb-2">Exklusiva träningstillfällen.</li>
            <li className="mb-2">Nyhetsbrev och uppdateringar.</li>
          </ul>
        </div>
        <nav className="fixed right-0 top-1/4 bg-gray-800 text-white p-4 rounded-l-lg">
          <ul className="space-y-2">
            <li><a href="#klubbinfo" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faInfoCircle} className="mr-2" />Klubbinfo</a></li>
            <li><a href="#medlemsinfo" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faUser} className="mr-2" />Medlemsinfo</a></li>
            <li><a href="#bokakioskdag" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Boka kioskdag</a></li>
            <li><a href="#instruktionerkiosken" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faBook} className="mr-2" />Instruktioner kiosken</a></li>
            <li><a href="#kioskkalender" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Kiosk kalender & Ersättare</a></li>
            <li><a href="#utbildning" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />Utbildning tävlingsfunktion</a></li>
            <li><a href="#arlandarc" className="flex items-center hover:text-yellow-500"><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />Arlanda RC</a></li>
          </ul>
        </nav>
      </main>
  );
};

export default Medlemmar;