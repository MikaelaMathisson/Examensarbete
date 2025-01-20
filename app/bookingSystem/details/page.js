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
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const router = useRouter();

    const handleConfirmBooking = () => {
        if (!date || !name || !personnummer || !phone || !email) {
            console.error('All fields are required');
            return;
        }

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
                setConfirmationMessage('Bokningen är bekräftad!');
                setName('');
                setPersonnummer('');
                setPhone('');
                setEmail('');
                // Redirect to a confirmation page or show a success message
            })
            .catch((error) => {
                console.error('Error confirming booking:', error);
                setConfirmationMessage('Ett fel uppstod vid bokningen.');
                // Show an error message to the user
            });
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
                    {confirmationMessage && (
                        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
                            {confirmationMessage}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookingDetailsPage;