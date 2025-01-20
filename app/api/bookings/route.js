import { NextResponse } from 'next/server';
import { pool } from "@/app/lib/db";
import moment from 'moment-timezone';

export async function GET() {
    try {
        // Hämta alla bokningar där is_available är false
        const { rows } = await pool.query('SELECT * FROM public.bookings WHERE is_available = false');

        // Konvertera datum till svensk tid
        const bookings = rows.map(booking => ({
            ...booking,
            date: moment.tz(booking.date, 'Europe/Stockholm').format()
        }));

        // Logga bokningarna för att säkerställa att vi får data
        console.log('Bokningar som inte är tillgängliga:', bookings);

        // Returnera bokningarna som JSON
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}