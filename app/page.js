"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from "./components/Footer";
import SponsorSlider from "./components/SponsorSlider";
import "./globals.css";
import { Helmet } from "react-helmet";

const openingHours = [
    { day: "Onsdag", hours: "10:00 - 18:00" },
    { day: "Lördag", hours: "10:00 - 16:00" },
    { day: "Söndag", hours: "12:00 - 15:00" },
];

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Helmet>
                <meta name="description" content="Arlanda MC är klubben för motorcykelentusiaster. Vi har öppet onsdagar, lördagar och söndagar. Välkommen till oss!" />
                <title>Arlanda MC</title>
            </Helmet>
            <main className="flex-grow flex items-center justify-center bg-gray-100 bg-opacity-50 p-4 main-content bg-home h-screen">
                <div className="flex flex-col items-center justify-center w-full max-w-4xl relative">
                    <div className="flex flex-row items-stretch justify-between w-full equal-height">
                        <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center w-2/3 mb-20 flex flex-col justify-center">
                            <h1 className="font-bold mb-4 text-black drop-shadow-lg">
                                <span className="font-bold text-4xl">Välkommen till</span> <br/>
                                <span className="font-extrabold text-6xl">Arlanda MC</span>
                            </h1>
                            <p className="text-lg mb-4 text-black">
                                Klubben för motorcykelentusiaster
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-75 p-5 rounded-lg shadow-md max-w-xs mx-auto flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Öppettider denna vecka</h2>
                            <ul className="list-none p-0">
                                {openingHours.map((entry, index) => (
                                    <li key={index} className="flex flex-col justify-between py-1.5 mb-5">
                                        <span className="font-semibold">{entry.day}:</span> {entry.hours}
                                    </li>
                                ))}
                            </ul>
                            <section className="text-lg text-black mt-5 text-center">
                                <a href="/calendar" className="flex items-center justify-center text-blue-600 no-underline mb-2 hover:underline">
                                    <p className="text-black font-bold">Kalender</p>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="ml-2 w-6 h-6 text-black"/>
                                </a>
                            </section>
                        </div>
                    </div>
                    <SponsorSlider />
                </div>
            </main>
        </div>
    );
}