"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const BookingCalendar = () => {
    const [date, setDate] = useState(new Date(2025, 0, 1)); // Set initial date to January 1, 2025
    const [view, setView] = useState('year');
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const handleDateChange = (newDate) => {
        setDate(newDate);
        router.push(`/bookingSystem/${type}/book?date=${newDate.toISOString().split('T')[0]}`);
    };

    const handleActiveStartDateChange = ({ activeStartDate, view }) => {
        setView(view);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold text-gray-800 text-4xl mb-8">Välj ett datum</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        view={view}
                        onActiveStartDateChange={handleActiveStartDateChange}
                        minDetail="year"
                        maxDetail="month"
                        className="react-calendar"
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
            <style jsx global>{`
                .react-calendar__month-view__weekdays__weekday abbr {
                    @apply no-underline;
                }
                .react-calendar__navigation__label__labelText--from {
                    @apply capitalize;
                }
                .react-calendar__navigation button {
                    @apply bg-none border-none cursor-pointer;
                }
                .react-calendar__year-view__months__month,
                .react-calendar__month-view__days__day {
                    @apply pointer-events-auto;
                }
                .react-calendar__tile--now {
                    @apply bg-blue-200;
                }
                .react-calendar__tile--active {
                    @apply bg-blue-500 text-white;
                }
                .react-calendar__navigation__label {
                    @apply capitalize;
                }
                .react-calendar__navigation__arrow {
                    @apply mx-2 text-lg; /* Add margin and increase size for single arrows */
                }
                .react-calendar__navigation__arrow--double {
                    @apply mx-4 text-xl; /* Add more margin and increase size for double arrows */
                }
            `}</style>
        </div>
    );
};

export default BookingCalendar;