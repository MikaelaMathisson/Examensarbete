"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa'; // Import the calendar icon

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
                <div className="text-xs text-white rounded-full p-2" style={{ backgroundColor: event ? event.color : '#ccc' }}>
                    {event ? <FaCalendarAlt /> : 'No Event'}
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
            <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Kalender</h2>
                <div className="w-full">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                        onClickDay={onClickDay}
                        className="w-full text-black"
                        tileClassName={({ activeStartDate, date, view }) =>
                            "p-4 text-center rounded-full" +
                            (view === 'month' && date.toDateString() === new Date().toDateString() ? " border-4 border-green-500" : "")
                        }
                    />
                </div>
                {selectedEvent && (
                    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                        <p>Datum: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p>Tid: {new Date(selectedEvent.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedEvent.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>Info: {selectedEvent.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;