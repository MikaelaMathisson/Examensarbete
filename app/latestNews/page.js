"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import NewsCard from "../components/NewsCard";

const SenasteNytt = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Format the date to only show the date part
                const formattedData = data.map(item => ({
                    ...item,
                    date: new Date(item.date).toLocaleDateString()
                }));
                setNewsItems(formattedData);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen bg-other p-4">
            <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center max-w-4xl w-full">
                <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
                    Senaste Nytt
                </h1>
                <div className="flex flex-wrap justify-center text-left text-black">
                    {newsItems.map((item, index) => (
                        <NewsCard key={index} title={item.title} description={item.description} date={item.date} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default SenasteNytt;