// app/components/NewsCard.js
import React from "react";

const NewsCard = ({ title, description, date }) => {
    return (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-4 mr-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-500 mb-2">{date}</p>
            <p className="text-gray-700">{description}</p>
        </div>
    );
};

export default NewsCard;