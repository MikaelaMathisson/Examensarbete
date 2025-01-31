"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";

const Page = () => {
  const [data, setData] = useState({ training_times: '', price_list: '', division: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/information');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const formattedData = result.reduce((acc, item) => {
          acc[item.type] = item.content;
          return acc;
        }, {});
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <main className="relative inset-0 flex items-center justify-center min-h-screen bg-other bg-gray-100 p-4">
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
            {data.training_times.split('. ').map((time, index) => (
                <li key={index} className="mb-2">{time}</li>
            ))}
          </ul>

          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Prislista
          </h1>
          <p className="text-lg mb-4 text-black">
            {data.price_list}
          </p>
          <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
            Träningstider - Uppdelning
          </h1>
          <p className="text-lg mb-4 text-black">
            {data.division}
          </p>
        </div>
      </main>
  );
};

export default Page;