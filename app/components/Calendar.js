"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment-timezone';

// Function to format date to YYYY-MM-DD in Swedish time
const formatDate = (date) => {
    const d = moment.tz(date, 'Europe/Stockholm').startOf('day');
    return d.format('YYYY-MM-DD'); // Format: YYYY-MM-DD
};

// Function to check if the date is a Wednesday, Saturday, or Sunday
const isAllowedDate = (date) => {
    const dayOfWeek = moment.tz(date, 'Europe/Stockholm').day();  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return dayOfWeek === 3 || dayOfWeek === 6 || dayOfWeek === 0; // Wednesday (3), Saturday (6), Sunday (0)
};

const Calendar = ({ type }) => {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/bookings')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setBookings(data);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

    // Check if the date is booked
    const isDateBooked = (date) => {
        const formattedDate = formatDate(date);
        const dayOfWeek = moment.tz(date, 'Europe/Stockholm').day();
        const bookingsOnDate = bookings.filter(booking => formatDate(booking.date) === formattedDate);

        if (dayOfWeek === 3) {
            return bookingsOnDate.length >= 1; // Only one booking allowed on Wednesdays
        } else if (dayOfWeek === 6 || dayOfWeek === 0) {
            return bookingsOnDate.length >= 2; // Two bookings allowed on Saturdays and Sundays
        }
        return bookingsOnDate.some(booking => !booking.is_available);
    };

    const handleDateClick = (date) => {
        if (!isDateBooked(date) && isAllowedDate(date)) {
            setSelectedDate(date);
        }
    };

    const renderMonth = (month, year) => {
        const startOfMonth = moment.tz({ year, month }, 'Europe/Stockholm').startOf('month');
        const daysInMonth = startOfMonth.daysInMonth();
        const startDay = (startOfMonth.day() + 6) % 7; // Adjust start day to start from Monday
        const calendarDays = [];

        // Add empty days for the days before the start of the month
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = moment.tz({ year, month, day }, 'Europe/Stockholm');
            const formattedDate = formatDate(date);
            const booked = isDateBooked(formattedDate);
            const isAllowed = isAllowedDate(formattedDate);  // Check if the date is Wednesday, Saturday, or Sunday

            // Use different colors depending on whether the date is booked or not, and if it is allowed to book
            const dayClass = booked
                ? 'bg-red-200'  // Booked = red
                : isAllowed
                    ? 'bg-green-200'  // Allowed to book = green
                    : 'bg-gray-200'; // Not allowed to book = gray

            calendarDays.push(
                <div
                    key={day}
                    className={`p-2 cursor-pointer ${dayClass} ${selectedDate === formattedDate ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => handleDateClick(formattedDate)}
                >
                    {day}
                </div>
            );
        }

        return (
            <div key={month} className="mb-4">
                <h2 className="font-bold text-xl mb-2">{startOfMonth.format('MMMM')}</h2>
                <div className="grid grid-cols-7 gap-2">
                    {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day, index) => (
                        <div key={index} className="p-2 font-bold">{day}</div>
                    ))}
                    {calendarDays}
                </div>
            </div>
        );
    };

    const renderYear = () => {
        const today = moment.tz('Europe/Stockholm');
        const year = today.year();
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