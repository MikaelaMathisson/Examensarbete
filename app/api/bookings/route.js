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
export async function POST(req) {
    try {
        const { bokningsnummer, personnummer } = await req.json();

        // Validate incoming data
        if (!bokningsnummer || !personnummer) {
            return NextResponse.json(
                { error: 'Bokningsnummer och personnummer är obligatoriska' },
                { status: 400 }
            );
        }

        // Fetch the booking from the database
        const { rows } = await pool.query(
            'SELECT * FROM bookings WHERE bokningsnummer = $1 AND personnummer = $2',
            [bokningsnummer, personnummer]
        );

        // Convert date to Swedish time
        const bookings = rows.map(booking => ({
            ...booking,
            date: moment.tz(booking.date, 'Europe/Stockholm').format()
        }));

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        console.log('Received id:', id);

        // Validate incoming data
        if (!id) {
            return NextResponse.json(
                { error: 'ID är obligatoriskt' },
                { status: 400 }
            );
        }

        // Check if the booking exists
        const checkResult = await pool.query(
            'SELECT * FROM bookings WHERE id = $1',
            [id]
        );
        console.log('Check result:', checkResult);

        if (checkResult.rowCount === 0) {
            return NextResponse.json(
                { error: 'Bokningen hittades inte' },
                { status: 404 }
            );
        }

        // Delete the booking from the database
        const deleteResult = await pool.query(
            'DELETE FROM bookings WHERE id = $1 RETURNING *',
            [id]
        );
        console.log('Delete result:', deleteResult);

        return NextResponse.json(
            { message: 'Bokningen avbokades framgångsrikt' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}