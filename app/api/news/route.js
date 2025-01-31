import { pool } from '../../lib/db';

export async function GET(req) {
    try {
        const result = await pool.query('SELECT title, description, date FROM news ORDER BY date DESC');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
    }
}