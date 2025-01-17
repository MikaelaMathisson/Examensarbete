"use client";
import React, { useState } from "react";

const BookingSystem = () => {
    const [formData, setFormData] = useState({ name: '', email: '', date: '', time: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Booking...');
        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('Booking successful!');
                setFormData({ name: '', email: '', date: '', time: '' });
            } else {
                setStatus('Failed to book.');
            }
        } catch (error) {
            setStatus('Failed to book.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold mb-4 text-black text-4xl">Boka arbetspass</h1>
                    <p>Fyll i formuläret nedan för att boka ett arbetspass på klubben.</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-left text-black font-semibold">Namn</label>
                            <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-black font-semibold">E-post</label>
                            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-left text-black font-semibold">Datum</label>
                            <input type="date" id="date" name="date" className="w-full p-2 border border-gray-300 rounded" value={formData.date} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-left text-black font-semibold">Tid</label>
                            <input type="time" id="time" name="time" className="w-full p-2 border border-gray-300 rounded" value={formData.time} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Boka</button>
                    </form>
                    {status && <p className="mt-4 text-black">{status}</p>}
                </div>
            </main>
        </div>
    );
};

export default BookingSystem;