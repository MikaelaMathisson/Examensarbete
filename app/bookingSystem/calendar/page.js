"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const BookingCalendar = () => {
    const [date, setDate] = useState(new Date());
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const handleDateChange = (newDate) => {
        setDate(newDate);
        router.push(`/bookingSystem/${type}/book?date=${newDate.toISOString().split('T')[0]}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold text-black text-4xl mb-8">Välj ett datum</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        tileDisabled={({ date }) => {
                            if (type === "onsdagstraning") {
                                return date.getDay() !== 3; // Only Wednesdays
                            } else if (type === "helgtraning") {
                                return date.getDay() !== 6 && date.getDay() !== 0; // Only Saturdays and Sundays
                            }
                            return false;
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default BookingCalendar;