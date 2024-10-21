import React from "react";
import "../globals.css";

const Page = () => {
  return (
      <main className="absolute inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
        <div className="bg-opacity-75 bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
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
        </div>
      </main>
  );
};

export default Page;