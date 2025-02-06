"use client";
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [repliedContacts, setRepliedContacts] = useState([]);
    const [visibleRepliedCount, setVisibleRepliedCount] = useState(3);
    const [colors, setColors] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
    const [newNews, setNewNews] = useState({ title: '', description: '', date: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [editingNews, setEditingNews] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [membersRes, eventsRes, newsRes, contactsRes] = await Promise.all([
                    fetch('/api/members'),
                    fetch('/api/events'),
                    fetch('/api/news'),
                    fetch('/api/contact')
                ]);

                const membersData = await membersRes.json();
                const eventsData = await eventsRes.json();
                const newsData = await newsRes.json();
                const contactsData = await contactsRes.json();

                setMembers(membersData);
                setEvents(eventsData);
                setNews(newsData);
                setContacts(contactsData.filter(contact => !contact.replied));
                setRepliedContacts(contactsData.filter(contact => contact.replied));
                setColors([...new Set(eventsData.map(event => event.color))]);
                setCurrentDate(new Date().toLocaleDateString());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMemberStatusChange = (id, status) => {
        fetch(`/api/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(() => setMembers(members.filter(member => member.id !== id)))
            .catch(error => console.error(`Error setting member to ${status}:`, error));
    };

    const handleEventChange = (method, event) => {
        fetch(`/api/events${method === 'PUT' ? `/${event.id}` : ''}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                setEvents(method === 'POST' ? [...events, data] : events.map(e => e.id === data.id ? data : e));
                setNewEvent({ title: '', description: '', date: '', start_time: '', end_time: '', color: '' });
                setEditingEvent(null);
            })
            .catch(error => console.error(`Error ${method === 'POST' ? 'adding' : 'updating'} event:`, error));
    };

    const handleNewsChange = (method, newsItem) => {
        fetch(`/api/news${method === 'PUT' ? `/${newsItem.id}` : ''}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newsItem)
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                setNews(method === 'POST' ? [...news, data] : news.map(n => n.id === data.id ? data : n));
                setNewNews({ title: '', description: '', date: '' });
                setEditingNews(null);
            })
            .catch(error => console.error(`Error ${method === 'POST' ? 'adding' : 'updating'} news:`, error));
    };

    const handleDelete = (type, id) => {
        fetch(`/api/${type}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(() => {
                if (type === 'events') setEvents(events.filter(event => event.id !== id));
                if (type === 'news') setNews(news.filter(newsItem => newsItem.id !== id));
            })
            .catch(error => console.error(`Error deleting ${type.slice(0, -1)}:`, error));
    };

    const handleReplyContact = (id) => {
        fetch('/api/contact', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, replied: true })
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
                const repliedContact = contacts.find(contact => contact.id === id);
                setRepliedContacts([...repliedContacts, { ...repliedContact, replied: true }]);
            })
            .catch(error => console.error('Error updating contact:', error));
    };

    const formatDate = (date) => new Date(date).toLocaleDateString();

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
                            <button onClick={() => setSelectedMember(member)} className="mr-2 p-1 bg-blue-500 text-white border border-black mb-1">Visa ansökan</button>
                            {member.first_name} {member.last_name} - {member.email}
                            <button onClick={() => handleMemberStatusChange(member.id, 'accepted')} className="ml-2 p-1 bg-green-500 text-white border border-black">Acceptera medlem</button>
                            <button onClick={() => handleMemberStatusChange(member.id, 'pending')} className="ml-2 p-1 bg-yellow-500 text-white border border-black">Lägg väntande</button>
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
                            <button onClick={() => setEditingEvent(event)} className="mr-2 p-1 bg-yellow-500 text-white border border-black mb-1">Ändra</button>
                            <button onClick={() => handleDelete('events', event.id)} className="mr-2 p-1 bg-red-500 text-white border border-black">Ta bort</button>
                            {event.title} - {formatDate(event.date)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">{editingEvent ? 'Ändra händelse' : 'Lägg till en ny händelse'}</h2>
                <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="text" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="time" value={newEvent.start_time} onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="time" value={newEvent.end_time} onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <select value={newEvent.color} onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })} className="mb-2 p-2 border border-gray-300">
                    <option value="">Select Color</option>
                    {colors.map(color => <option key={color} value={color} style={{ backgroundColor: color }}>{color}</option>)}
                </select>
                <button onClick={() => handleEventChange(editingEvent ? 'PUT' : 'POST', newEvent)} className="p-2 bg-blue-500 text-white">
                    {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">{editingNews ? 'Ändra nyhet' : 'Lägg till en ny nyhet'}</h2>
                <input type="text" placeholder="Title" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="text" placeholder="Description" value={newNews.description} onChange={(e) => setNewNews({ ...newNews, description: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <input type="date" value={newNews.date} onChange={(e) => setNewNews({ ...newNews, date: e.target.value })} className="mb-2 p-2 border border-gray-300" />
                <button onClick={() => handleNewsChange(editingNews ? 'PUT' : 'POST', newNews)} className="p-2 bg-blue-500 text-white">
                    {editingNews ? 'Update News' : 'Add News'}
                </button>
            </div>
            <div className="bg-white p-4 shadow-md col-span-1">
                <h2 className="text-2xl font-bold mb-2">Senaste nytt</h2>
                <ul>
                    {news.map(newsItem => (
                        <li key={newsItem.id} className="flex items-center">
                            <button onClick={() => setEditingNews(newsItem)} className="mr-2 p-1 bg-yellow-500 text-white border border-black mb-1">Ändra</button>
                            <button onClick={() => handleDelete('news', newsItem.id)} className="mr-2 p-1 bg-red-500 text-white border border-black">Ta bort</button>
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
                    <button onClick={() => setVisibleRepliedCount(prevCount => prevCount + 3)} className="mt-2 p-1 bg-blue-500 text-white">Visa mer</button>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;