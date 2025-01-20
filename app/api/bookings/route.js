import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';  // Adjust the path as needed

export async function GET(request) {
    try {
        // Query to get all distinct booked dates from the bookings table
        const { rows } = await pool.query('SELECT DISTINCT date FROM "public"."bookings" WHERE is_available = false');

        // If there are booked dates, return them
        if (rows.length > 0) {
            return NextResponse.json(rows);
        } else {
            return NextResponse.json({ message: 'No booked dates found' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return NextResponse.json({ error: 'Something went wrong', details: error.message }, { status: 500 });
    }
}
