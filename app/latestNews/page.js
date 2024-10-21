// app/latestNews/page.js
import React from "react";
import "../globals.css";
import NewsCard from "../components/NewsCard";

const SenasteNytt = () => {
    const newsItems = [
        { title: "GGN-Träning", description: "3 timmars träning med transpondersystem, öppen för alla.\n" +
                "Vi körde på både crossbanan och endurobanan.\n" +
                "Resultat totalt finns här.\n" +
                "Alla varvtider finns här.", date: "2024-09-29" },
        { title: "Resultat KM 2024 cross", description: "Årets KM kördes 5 okt.\n" +
                "En samlad PDF-fil med alla resultat finns här.\n" +
                "Resultat finns nu på Mylaps/Speedhive.", date: "2024-10-05" },
        { title: "Gobraap 2.0", description: "Gobraap har släppt en ny version av appen," +
                " och du som förare / förälder behöver uppdatera appen innan du kommer till banan." +
                " (på grund av dålig täckning på anläggningen)", date: "2024-07-03" },
    ];

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