import { pool } from '../../lib/db';

export async function GET(req) {
    try {
        const result = await pool.query('SELECT * FROM members');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return new Response(JSON.stringify({ message: 'Error fetching members' }), { status: 500 });
    }
}