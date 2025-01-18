import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Konfigurera PostgreSQL-anslutning
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'booking_db',
    password: 'mysecretpassword',
    port: 5432,
});

export async function POST(req) {
    try {
        // Hämta request body som JSON
        const body = await req.json();
        const { date, name, personnummer, phone, email } = body;

        // Validering av inkommande data
        if (!date || !name || !personnummer || !phone || !email) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // SQL-fråga för att lägga till bokningen i databasen
        const query = `
            INSERT INTO bookings (date, name, personnummer, phone, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;  -- Returnerar den nyligen tillagda raden
        `;
        const values = [date, name, personnummer, phone, email];

        // Exekvera SQL-frågan
        const result = await pool.query(query, values);

        // Svara med en bekräftelse på bokningen
        return NextResponse.json(
            {
                message: 'Booking confirmed',
                data: result.rows[0],  // Returnerar den bokade raden
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error during booking submission:', error); // Logga fel
        return NextResponse.json(
            { error: 'Something went wrong', details: error.message },
            { status: 500 }
        );
    }
}
