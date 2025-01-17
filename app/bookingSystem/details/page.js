"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const BookingDetailsPage = () => {
    const searchParams = useSearchParams();
    const date = searchParams.get('date');
    const [name, setName] = useState('');
    const [personnummer, setPersonnummer] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleConfirmBooking = () => {
        fetch('/api/submitBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, name, personnummer, phone, email }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log('Booking confirmed:', data);
                // Redirect to a confirmation page or show a success message
            })
            .catch((error) => console.error('Error confirming booking:', error));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold text-gray-800 text-4xl mb-8">Boka {date}</h1>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Namn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Personnummer"
                            value={personnummer}
                            onChange={(e) => setPersonnummer(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Telefon"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                            onClick={handleConfirmBooking}
                        >
                            Bekräfta Bokning
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default BookingDetailsPage;