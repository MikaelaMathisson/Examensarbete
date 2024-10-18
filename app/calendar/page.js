// components/Calendar.js
"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: String,
    date: Date,
});

const Event = mongoose.model('Event', EventSchema);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });
        Event.find({}, (err, events) => {
            if (err) {
                console.error(err);
            } else {
                setEvents(events);
            }
        });
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
            return event ? <p>{event.title}</p> : null;
        }
    };

    return (
        <div className="bg-gray-800 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Kalender</h2>
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
            />
        </div>
    );
};

export default MyCalendar;