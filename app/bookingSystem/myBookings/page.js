"use client";
import React, { useState } from "react";

const MyBookings = () => {
    const [bokningsnummer, setBokningsnummer] = useState("");
    const [personnummer, setPersonnummer] = useState("");
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Define successMessage state
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleFetchBookings = async () => {
        if (!bokningsnummer || !personnummer) {
            setError("Bokningsnummer och personnummer är obligatoriska");
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bokningsnummer, personnummer }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            setBookings(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setBookings([]);
        }
    };

    const handleCancelBooking = async (id) => {
        try {
            const response = await fetch(`/api/bookings?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to cancel booking');
            }

            // Remove the cancelled booking from the state
            setBookings(bookings.filter(booking => booking.id !== id));
            setShowConfirmDialog(false);
            setSelectedBooking(null);
            setSuccessMessage("Du har nu avbokat ditt pass."); // Set success message
            setBokningsnummer("");
            setPersonnummer("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleShowConfirmDialog = (booking) => {
        setSelectedBooking(booking);
        setShowConfirmDialog(true);
    };

    const handleConfirmCancel = () => {
        if (selectedBooking) {
            handleCancelBooking(selectedBooking.id);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold text-gray-800 text-4xl mb-8">Mina bokningar</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Bokningsnummer"
                            value={bokningsnummer}
                            onChange={(e) => setBokningsnummer(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Personnummer"
                            value={personnummer}
                            onChange={(e) => setPersonnummer(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <button
                        onClick={handleFetchBookings}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Hämta bokningar
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>} {/* Display success message */}
                    <div className="mt-4">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking.id} className="bg-gray-200 p-4 rounded mb-2">
                                    <p><strong>Datum:</strong> {booking.date}</p>
                                    <p><strong>Namn:</strong> {booking.name}</p>
                                    <p><strong>Personnummer:</strong> {booking.personnummer}</p>
                                    <p><strong>Telefon:</strong> {booking.phone}</p>
                                    <p><strong>Email:</strong> {booking.email}</p>
                                    <button
                                        onClick={() => handleShowConfirmDialog(booking)}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
                                    >
                                        Avboka
                                    </button>
                                </div>
                            ))
                        ) : (
                            !successMessage && <p>Inga bokningar hittades</p> // Hide message if successMessage is set
                        )}
                    </div>
                </div>
            </main>
            {showConfirmDialog && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg text-center">
                        <p>Är du säker på att du vill avboka detta pass?</p>
                        <p><strong>Datum:</strong> {selectedBooking.date}</p>
                        <p><strong>Namn:</strong> {selectedBooking.name}</p>
                        <button
                            onClick={handleConfirmCancel}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4"
                        >
                            Ja, avboka
                        </button>
                        <button
                            onClick={() => setShowConfirmDialog(false)}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-4 ml-2"
                        >
                            Avbryt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;