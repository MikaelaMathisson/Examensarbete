"use client";
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [colors, setColors] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        fetch('/api/members')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error('Error fetching members:', error));

        fetch('/api/events')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                const uniqueColors = [...new Set(data.map(event => event.color))];
                setColors(uniqueColors);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleAddEvent = () => {
        fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        })
            .then(response => response.json())
            .then(data => {
                setEvents([...events, data]);
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
            })
            .catch(error => console.error('Error adding event:', error));
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({
            ...event,
            date: event.date.split('T')[0], // Ensure date is in yyyy-MM-dd format
            start_time: event.start_time.split('T')[1].substring(0, 5), // Ensure time is in HH:mm format
            end_time: event.end_time.split('T')[1].substring(0, 5) // Ensure time is in HH:mm format
        });
    };

    const handleUpdateEvent = () => {
        fetch(`/api/events/${editingEvent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEvents(events.map(event => event.id === data.id ? data : event));
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
                setEditingEvent(null);
            })
            .catch(error => console.error('Error updating event:', error));
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4 min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-md">
                <h2 className="text-2xl font-bold mb-2">Membership Applications</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.id}>{member.first_name} {member.last_name} - {member.email}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md">
                <h2 className="text-2xl font-bold mb-2">Events</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.title} - {formatDate(event.date)}
                            <button onClick={() => handleEditEvent(event)} className="ml-2 p-1 bg-yellow-500 text-white">Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md">
                <h2 className="text-2xl font-bold mb-2">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="time"
                    value={newEvent.start_time}
                    onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="time"
                    value={newEvent.end_time}
                    onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <select
                    value={newEvent.color}
                    onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                >
                    <option value="">Select Color</option>
                    {colors.map(color => (
                        <option key={color} value={color} style={{ backgroundColor: color }}>{color}</option>
                    ))}
                </select>
                <button onClick={editingEvent ? handleUpdateEvent : handleAddEvent} className="p-2 bg-blue-500 text-white">
                    {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
            </div>
            <div className="bg-white p-4 shadow-md">
                <h2 className="text-2xl font-bold mb-2">Other Section</h2>
                <p>Content for the fourth section goes here.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;