// app/page.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from "./components/Footer";
import SponsorSlider from "./components/SponsorSlider";
import "./globals.css";

const openingHours = [
    { day: "Onsdag", hours: "09:00 - 15:00", tracks: [] },
    { day: "Lördag", hours: "10:00 - 14:00", tracks: ["Enduro", "MX"] },
    { day: "Söndag", hours: "10:00 - 14:00", tracks: ["Enduro"] },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-page bg-gray-100 bg-opacity-50 p-4 main-content">
                <div className="flex flex-col items-center justify-center w-full max-w-4xl relative">
                    <div className="flex flex-row items-start justify-between w-full equal-height">
                        <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center w-2/3 mb-4">
                            <h1 className="font-bold mb-4 text-black drop-shadow-lg">
                                <span className="font-bold text-4xl">Välkommen till</span> <br/>
                                <span className="font-extrabold text-6xl">Arlanda MC</span>
                            </h1>
                            <p className="text-lg mb-4 text-black">
                                Klubben för motorcykelentusiaster
                            </p>
                            <div className="additional-links mt-4">
                                <p className="text-lg text-black">

                                    <a href="/calendar" className="flex items-center">
                                    <p className="text-black font-bold">Kalender</p>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="ml-2 w-6 h-6 icon-black"/>
                                    </a>
                                </p>
                                <p className="text-lg text-black mt-2">

                                </p>
                            </div>
                        </div>
                        <div className="opening-hours bg-opacity-50 bg-white p-8 shadow-lg rounded-lg w-1/3 mb-4">
                            <h2 className="text-2xl font-bold mb-4">Öppettider denna vecka</h2>
                            <ul className="text-lg text-black">
                                {openingHours.map((item, index) => (
                                    <li key={index} className="mb-5">
                                        <span className="font-semibold">{item.day}:</span> {item.hours}
                                        {item.tracks.length > 0 && (
                                            <div className="tracks">
                                                <span className="font-semibold">Banor öppna:</span> {item.tracks.join(", ")}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <SponsorSlider />
                </div>
            </main>
        </div>
    );
}