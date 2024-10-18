import React from "react";
import "./globals.css";

export default function Home() {
    return (
        <main className="absolute inset-0 flex items-center justify-center min-h-screen bg-page bg-gray-100 bg-opacity-50 p-4">
            <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center transform ">
                <h1 className="font-bold mb-4 text-black drop-shadow-lg">
                    <span className="font-bold text-4xl">Välkommen till</span> <br/>
                    <span className="font-extrabold text-6xl">Arlanda MC</span>
                </h1>
                <p className="text-lg mb-4 text-black">
                    Klubben för motorcykelentusiaster
                </p>
            </div>
        </main>
    );
}