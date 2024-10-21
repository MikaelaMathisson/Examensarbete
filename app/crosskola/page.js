import React from "react";
import "../globals.css";

const Crosskola = () => {
  return (
      <main className="absolute inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
        <div className="bg-opacity-75 bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Crosskola
          </h1>
          <p className="text-lg mb-4 text-black font-bold">
            Välkommen till Arlanda MC:s crosskola! Här lär vi ut grunderna i motocross till både nybörjare och erfarna förare.
          </p>
          <ul className="text-left text-black">
            <li className="mb-2">Grundläggande körteknik och säkerhet.</li>
            <li className="mb-2">Träningspass och övningar.</li>
            <li className="mb-2">Tävlingar och evenemang.</li>
            <li className="mb-2">Möjlighet att hyra utrustning.</li>
          </ul>
        </div>
      </main>
  );
};

export default Crosskola;