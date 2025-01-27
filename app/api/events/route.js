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