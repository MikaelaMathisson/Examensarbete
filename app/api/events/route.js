import { Pool } from 'pg';

// Configure PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});

export async function GET(req) {
    try {
        const result = await pool.query('SELECT id, title, description, date, start_time, end_time, color FROM events');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title, description, date, start_time, end_time, color } = await req.json();

        // Validate required fields
        if (!title || !description || !date || !start_time || !end_time || !color) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        const startTimestamp = `${date} ${start_time}`;
        const endTimestamp = `${date} ${end_time}`;

        await pool.query(
            'INSERT INTO events (title, description, date, start_time, end_time, color) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, description, date, startTimestamp, endTimestamp, color]
        );
        return new Response(JSON.stringify({ message: 'Event added successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error adding event:', error);
        return new Response(JSON.stringify({ error: 'Failed to add event' }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, title, description, date, start_time, end_time, color } = await req.json();
        await pool.query(
            'UPDATE events SET title = $1, description = $2, date = $3, start_time = $4, end_time = $5, color = $6 WHERE id = $7',
            [title, description, date, start_time, end_time, color, id]
        );
        return new Response(JSON.stringify({ message: 'Event updated successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update event' }), { status: 500 });
    }
}