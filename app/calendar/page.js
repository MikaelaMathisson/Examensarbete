// components/Calendar.js
"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css'; // Custom styles if needed

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
        <div className="bg-gray-800 text-white p-8 flex justify-center items-center min-h-screen">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Kalender</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileContent={tileContent}
                    className="custom-calendar" // Add a custom class if needed
                />
            </div>
        </div>
    );
};

export default CalendarPage;