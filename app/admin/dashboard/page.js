"use client";
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [repliedContacts, setRepliedContacts] = useState([]); // Define repliedContacts state
    const [visibleRepliedCount, setVisibleRepliedCount] = useState(3); // State to track visible replied messages
    const [colors, setColors] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
    const [newNews, setNewNews] = useState({ title: '', description: '', date: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [editingNews, setEditingNews] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

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

        fetch('/api/news')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));

        fetch('/api/contact')
            .then(response => response.json())
            .then(data => {
                setContacts(data.filter(contact => !contact.replied));
                setRepliedContacts(data.filter(contact => contact.replied));
            })
            .catch(error => console.error('Error fetching contacts:', error));

        // Set the current date
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    const handleViewApplication = (member) => {
        setSelectedMember(member);
    };

    const handleAcceptMember = (id) => {
        fetch(`/api/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'accepted' })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setMembers(members.filter(member => member.id !== id));
                setSelectedMember(null);
            })
            .catch(error => console.error('Error accepting member:', error));
    };

    const handlePendingMember = (id) => {
        fetch(`/api/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'pending' })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setMembers(members.filter(member => member.id !== id));
                setSelectedMember(null);
            })
            .catch(error => console.error('Error setting member to pending:', error));
    };

    const handleAddEvent = () => {
        fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                setEvents([...events, data]);
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
            })
            .catch(error => console.error('Error adding event:', error));
    };

    const handleAddNews = () => {
        fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNews)
        })
            .then(response => {
                if (!response.ok) {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                    if (response.status === 405) {
                        throw new Error('Method Not Allowed');
                    }
                    throw new Error('Network response was not ok');
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                setNews([...news, data]);
                setNewNews({ title: '', description: '', date: '' });
            })
            .catch(error => console.error('Error adding news:', error));
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

    const handleEditNews = (newsItem) => {
        if (!newsItem || !newsItem.id) {
            console.error('Invalid news item');
            return;
        }
        setEditingNews(newsItem);
        setNewNews({
            ...newsItem,
            date: newsItem.date.split('T')[0] // Ensure date is in yyyy-MM-dd format
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
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                setEvents(events.map(event => event.id === data.id ? data : event));
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
                setEditingEvent(null);
            })
            .catch(error => console.error('Error updating event:', error));
    };

    const handleUpdateNews = () => {
        if (!editingNews || !editingNews.id) {
            console.error('No news item is being edited or the news item has no id');
            return;
        }

        fetch(`/api/news/${editingNews.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNews)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                setNews(news.map(newsItem => newsItem.id === data.id ? data : newsItem));
                setNewNews({ title: '', description: '', date: '' });
                setEditingNews(null);
            })
            .catch(error => console.error('Error updating news:', error));
    };

    const handleDeleteEvent = (id) => {
        fetch(`/api/events`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setEvents(events.filter(event => event.id !== id));
                setEditingEvent(null); // Reset editingEvent to null
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' }); // Reset newEvent to default values
            })
            .catch(error => console.error('Error deleting event:', error));
    };

    const handleDeleteNews = (id) => {
        fetch(`/api/news`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setNews(news.filter(newsItem => newsItem.id !== id));
            })
            .catch(error => console.error('Error deleting news:', error));
    };
    const handleReplyContact = (id) => {
        fetch('/api/contact', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, replied: true })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
                const repliedContact = contacts.find(contact => contact.id === id);
                setRepliedContacts([...repliedContacts, { ...repliedContact, replied: true }]);
            })
            .catch(error => console.error('Error updating contact:', error));
    };

    const handleShowMoreReplied = () => {
        setVisibleRepliedCount(prevCount => prevCount + 3);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 min-h-screen bg-gray-100">
            <div className="col-span-3 flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Admin Översikt</h1>
                <div className="text-xl">Dagens datum: {currentDate}</div>
            </div>
            <div className="bg-white p-4 shadow-md col-span-3">
                <h2 className="text-2xl font-bold mb-2">Nya medlemsansökningar</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.id} className="flex items-center">
                            <button onClick={() => handleViewApplication(member)} className="mr-2 p-1 bg-blue-500 text-white border border-black mb-1">Visa ansökan</button>
                            {member.first_name} {member.last_name} - {member.email}
                            <button onClick={() => handleAcceptMember(member.id)} className="ml-2 p-1 bg-green-500 text-white border border-black">Acceptera medlem</button>
                            <button onClick={() => handlePendingMember(member.id)} className="ml-2 p-1 bg-yellow-500 text-white border border-black">Lägg väntande</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedMember && (
                <div className="bg-white p-4 shadow-md col-span-3">
                    <h2 className="text-2xl font-bold mb-2">Medlemsansökan</h2>
                    <p><strong>Förnamn:</strong> {selectedMember.first_name}</p>
                    <p><strong>Efternamn:</strong> {selectedMember.last_name}</p>
                    <p><strong>Email:</strong> {selectedMember.email}</p>
                    <p><strong>Telefon:</strong> {selectedMember.phone}</p>
                    <p><strong>Adress:</strong> {selectedMember.address}</p>
                    <button onClick={() => setSelectedMember(null)} className="mt-2 p-1 bg-gray-500 text-white">Stäng</button>
                </div>
            )}
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">Händelser på klubben</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id} className="flex items-center">
                            <button onClick={() => handleEditEvent(event)} className="mr-2 p-1 bg-yellow-500 text-white border border-black mb-1">Ändra</button>
                            <button onClick={() => handleDeleteEvent(event.id)} className="mr-2 p-1 bg-red-500 text-white border border-black">Ta bort</button>
                            {event.title} - {formatDate(event.date)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">{editingEvent ? 'Ändra händelse' : 'Lägg till en ny händelse'}</h2>
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
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">{editingNews ? 'Ändra nyhet' : 'Lägg till en ny nyhet'}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newNews.description}
                    onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="date"
                    value={newNews.date}
                    onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                    className="mb-2 p-2 border border-gray-300"
                />
                <button onClick={editingNews ? handleUpdateNews : handleAddNews} className="p-2 bg-blue-500 text-white">
                    {editingNews ? 'Update News' : 'Add News'}
                </button>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">Senaste nytt</h2>
                <ul>
                    {news.map(newsItem => (
                        <li key={newsItem.id} className="flex items-center">
                            <button onClick={() => handleEditNews(newsItem)} className="mr-2 p-1 bg-yellow-500 text-white border border-black mb-1">Ändra</button>
                            <button onClick={() => handleDeleteNews(newsItem.id)} className="mr-2 p-1 bg-red-500 text-white border border-black">Ta bort</button>
                            {newsItem.title} - {formatDate(newsItem.date)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">Kontaktmeddelanden</h2>
                <ul>
                    {contacts.map(contact => (
                        <li key={contact.id} className="mb-2">
                            <p><strong>Namn:</strong> {contact.name}</p>
                            <p><strong>E-post:</strong> <a href={`mailto:${contact.email}`} className="text-blue-500 underline">{contact.email}</a></p>
                            <p><strong>Meddelande:</strong> {contact.message}</p>
                            <p><strong>Skickat:</strong> {new Date(contact.created_at).toLocaleString()}</p>
                            <button onClick={() => handleReplyContact(contact.id)} className="mt-2 p-1 bg-blue-500 text-white">Markera som svarat</button>
                            <hr className="my-2" />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">Svarade meddelanden</h2>
                <ul>
                    {repliedContacts.slice(0, visibleRepliedCount).map(contact => (
                        <li key={contact.id} className="mb-2">
                            <p><strong>Namn:</strong> {contact.name}</p>
                            <p><strong>E-post:</strong> <a href={`mailto:${contact.email}`} className="text-blue-500 underline">{contact.email}</a></p>
                            <p><strong>Meddelande:</strong> {contact.message}</p>
                            <p><strong>Skickat:</strong> {new Date(contact.created_at).toLocaleString()}</p>
                            <hr className="my-2" />
                        </li>
                    ))}
                </ul>
                {visibleRepliedCount < repliedContacts.length && (
                    <button onClick={handleShowMoreReplied} className="mt-2 p-1 bg-blue-500 text-white">Visa mer</button>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;