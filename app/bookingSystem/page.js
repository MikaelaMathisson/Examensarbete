"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";


const BookingSystem = () => {
    const router = useRouter();

    const handleBookingClick = () => {
        router.push(`/bookingSystem/calendar`);
    };

    const handleMyBookings = () => {
        router.push(`/bookingSystem/myBookings`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg text-center max-w-lg w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="font-bold text-gray-800 text-4xl">Boka arbetspass i kiosken</h1>
                        <button onClick={handleMyBookings} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Mina bokningar</button>
                    </div>
                    <p className="text-gray-700 mb-4">Info om de olika passen som går att boka:</p>
                    <div className="space-y-4">
                        <div className="bg-gray-200 p-4 rounded">
                            <div className="text-left">
                                <h2 className="font-bold text-xl">Onsdagsträning</h2>
                                <p className="text-gray-700">
                                    <FontAwesomeIcon icon={faClock} className="mr-2" /> 3 timmar
                                    <FontAwesomeIcon icon={faUser} className="mr-2 ml-3" /> 1 person

                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-200 p-4 rounded">
                            <div className="text-left">
                                <h2 className="font-bold text-xl">Helg träningsdag</h2>
                                <p className="text-gray-700">
                                    <FontAwesomeIcon icon={faClock} className="mr-2" /> 7 timmar
                                    <FontAwesomeIcon icon={faUser} className="mr-2 ml-3" /> 2 personer

                                </p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleBookingClick} className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Boka</button>
                </div>
            </main>
        </div>
    );
};

export default BookingSystem;