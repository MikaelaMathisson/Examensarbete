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
export async function POST(req) {
    try {
        const { id, status } = await req.json();

        // Validate required fields
        if (!id || !status) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        await pool.query(
            'UPDATE members SET status = $1 WHERE id = $2',
            [status, id]
        );
        return new Response(JSON.stringify({ message: 'Member status updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating member status:', error);
        return new Response(JSON.stringify({ error: 'Failed to update member status' }), { status: 500 });
    }
}