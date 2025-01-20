// components/Calendar.js
"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Meeting",
            date: "2023-10-10",
            color: "#FF0000",
            time: "10:00 AM",
            description: "Team meeting to discuss project updates."
        }
    ]);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

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
            return (
                <div className="text-xs text-white rounded-full p-1" style={{ backgroundColor: event ? event.color : '#ccc' }}>
                    {event ? event.title : 'No Event'}
                </div>
            );
        }
    };

    const onClickDay = (value) => {
        const event = events.find(event => new Date(event.date).toDateString() === value.toDateString());
        setSelectedEvent(event);
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex justify-center items-center p-5" style={{ backgroundImage: "url('/background1.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Kalender</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileContent={tileContent}
                    onClickDay={onClickDay}
                    className="w-full text-black"
                    tileClassName={({ activeStartDate, date, view }) =>
                        "p-2 text-center" +
                        (view === 'month' && date.toDateString() === new Date().toDateString() ? " bg-blue-600 text-white" : "")
                    }
                />
                {selectedEvent && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                        <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p>Time: {selectedEvent.time}</p>
                        <p>Description: {selectedEvent.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;