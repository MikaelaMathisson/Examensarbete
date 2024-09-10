import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen p-5 font-sans">
      <div className="text-left">
        <h1 className="text-6xl text-black-800 mb-4">Baninformation</h1>
        <p className="text-black-600 leading-relaxed">
          På Arlanda MC finns 3 crossbanor, Stora, Mellan och Lilla. Bredvid
          depån finns tillgång till tvättstation under sommartid.
        </p>
        <ol className="list-decimal list-inside">
          <li>Längd Stora MX: 1 740m </li>
          <li>Längd Mellan MX: 1 110m</li>
          <li>Längd Lilla MX: ca 300m</li>
          <li>Underlag: Sand</li>
        </ol>
      </div>
    </div>
  );
};

export default Page;
