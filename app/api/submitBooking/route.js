import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import moment from 'moment-timezone';

// Configure PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'booking_db',
    password: 'mysecretpassword',
    port: 5432,
});

export async function POST(req) {
    try {
        // Get request body as JSON
        const body = await req.json();
        const { date, name, personnummer, phone, email } = body;

        // Validate incoming data
        if (!date || !name || !personnummer || !phone || !email) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Convert date to Swedish time
        const swedishDate = moment.tz(date, 'Europe/Stockholm').format();
        const dayOfWeek = moment(swedishDate).day();

        // Check the number of bookings for the selected date
        const existingBookings = await pool.query(
            'SELECT COUNT(*) FROM bookings WHERE date = $1',
            [swedishDate]
        );
        const bookingCount = parseInt(existingBookings.rows[0].count, 10);

        // Limit the number of bookings depending on the day of the week
        if (dayOfWeek === 3 && bookingCount >= 1) { // Wednesday
            return NextResponse.json(
                { error: 'Only one booking is allowed on Wednesdays' },
                { status: 400 }
            );
        } else if ((dayOfWeek === 6 || dayOfWeek === 0) && bookingCount >= 2) { // Saturday or Sunday
            return NextResponse.json(
                { error: 'Only two bookings are allowed on Saturdays and Sundays' },
                { status: 400 }
            );
        }

        // SQL query to add the booking to the database
        const query = `
            INSERT INTO bookings (date, name, personnummer, phone, email)
            VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
        `;
        const values = [swedishDate, name, personnummer, phone, email];

        // Execute the SQL query
        const result = await pool.query(query, values);

        // Respond with a confirmation of the booking
        return NextResponse.json(
            {
                message: 'Booking confirmed',
                data: result.rows[0],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error during booking submission:', error); // Log error
        return NextResponse.json(
            { error: 'Something went wrong', details: error.message },
            { status: 500 }
        );
    }
}