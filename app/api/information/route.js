import { pool } from '../../lib/db';

export async function GET(req) {
    try {
        const result = await pool.query('SELECT type, REPLACE(content, \'\n\', \' \') as content FROM information');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
}