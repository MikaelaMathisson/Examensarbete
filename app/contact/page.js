"use client";
import React, { useState } from "react";
import "../globals.css";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            setStatus('Failed to send message.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center bg-page bg-gray-100 bg-opacity-50 p-4">
                <div className="bg-opacity-50 bg-white p-8 shadow-lg rounded-lg text-center transform max-w-lg w-full">
                    <h1 className="font-bold mb-4 text-black drop-shadow-lg text-4xl">Kontakta oss</h1>
                    <p> Kontakta oss vid frågor så svarar vi så snabbt vi har möjlighet</p>
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
                            <label htmlFor="message" className="block text-left text-black font-semibold">Meddelande</label>
                            <textarea id="message" name="message" className="w-full p-2 border border-gray-300 rounded" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Skicka</button>
                    </form>
                    {status && <p className="mt-4 text-black">{status}</p>}
                </div>
            </main>
        </div>
    );
};

export default Contact;