import React from "react";
import "../globals.css";

const SenasteNytt = () => {
    return (
        <main className="absolute inset-0 flex items-center justify-center min-h-screen bg-page bg-gray-100 bg-opacity-50 p-4">
            <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
                    Senaste Nytt
                </h1>
                <p className="text-lg mb-4 text-black">
                    Här hittar du de senaste nyheterna och uppdateringarna från Arlanda MC.
                </p>
                <ul className="text-left text-black">
                    <li className="mb-2">Nyhet 1: Det senaste inom motocross.</li>
                    <li className="mb-2">Nyhet 2: Uppdateringar om våra banor.</li>
                    <li className="mb-2">Nyhet 3: Kommande evenemang och tävlingar.</li>
                </ul>
            </div>
        </main>
    );
};

export default SenasteNytt;