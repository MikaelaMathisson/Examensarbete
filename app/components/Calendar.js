"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Calendar = ({ type }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const router = useRouter();

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderMonth = (month, year) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calendarDays = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toISOString().split('T')[0];
            calendarDays.push(
                <div
                    key={day}
                    className={`p-2 cursor-pointer ${selectedDate === date ? 'bg-green-200' : 'bg-white'}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }

        return (
            <div key={month} className="mb-4">
                <h2 className="font-bold text-xl mb-2">{new Date(year, month).toLocaleString('default', { month: 'long' })}</h2>
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays}
                </div>
            </div>
        );
    };

    const renderYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const months = [];

        for (let month = 0; month < 12; month++) {
            months.push(renderMonth(month, year));
        }

        return months;
    };

    const handleNextClick = () => {
        if (selectedDate) {
            router.push(`/bookingSystem/details?date=${selectedDate}`);
        }
    };

    return (
        <div>
            {renderYear()}
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleNextClick}
                disabled={!selectedDate}
            >
                Next
            </button>
        </div>
    );
};

export default Calendar;