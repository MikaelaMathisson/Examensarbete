"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
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
                        (view === 'month' && date.toDateString() === new Date().toDateString() ? " border-2 border-green-500" : "")
                    }
                />
                {selectedEvent && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                        <p>Datum: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p>Tid: {selectedEvent.start_time} - {selectedEvent.end_time}</p>
                        <p>Info: {selectedEvent.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;