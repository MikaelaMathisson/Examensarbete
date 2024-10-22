import React from "react";
import "../globals.css";

const Medlemmar = () => {
  return (
      <main className="relative inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100  p-4">
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
      </main>
  );
};

export default Medlemmar;