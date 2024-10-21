// components/Calendar.js
"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
            return event ? <p>{event.title}</p> : null;
        }
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex justify-center items-center p-5" style={{ backgroundImage: "url('/background1.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Kalender</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileContent={tileContent}
                    className="w-full text-black" // Tailwind classes for custom-calendar
                    tileClassName={({ activeStartDate, date, view }) =>
                        "p-2 text-center" +
                        (view === 'month' && date.toDateString() === new Date().toDateString() ? " bg-blue-600 text-white" : "")
                    }
                />
            </div>
        </div>
    );
};

export default CalendarPage;