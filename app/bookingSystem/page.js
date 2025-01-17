"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";

const BookingSystem = () => {
    const router = useRouter();

    const handleBookingType = (type) => {
        router.push(`/bookingSystem/calendar?type=${type}`);
    };

    const handleMyBookings = () => {
        router.push(`/bookingSystem/myBookings`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-lg w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="font-bold text-black text-4xl">Boka arbetspass i kiosken</h1>
                        <button onClick={handleMyBookings} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Mina bokningar</button>
                    </div>
                    <p>Välj typ av träning för att fortsätta.</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
                            <div className="text-left">
                                <h2 className="font-bold text-xl">Onsdagsträning</h2>
                                <p className="text-gray-700">
                                    <FontAwesomeIcon icon={faClock} className="mr-2" /> 3 timmar
                                    <FontAwesomeIcon icon={faUser} className="ml-4 mr-2" /> 1 person
                                </p>
                            </div>
                            <button onClick={() => handleBookingType('onsdagstraning')} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Boka</button>
                        </div>
                        <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
                            <div className="text-left">
                                <h2 className="font-bold text-xl">Helg träning</h2>
                                <p className="text-gray-700">
                                    <FontAwesomeIcon icon={faClock} className="mr-2" /> 7 timmar
                                    <FontAwesomeIcon icon={faUser} className="ml-4 mr-2" /> 2 personer
                                </p>
                            </div>
                            <button onClick={() => handleBookingType('helgtraning')} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Boka</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingSystem;