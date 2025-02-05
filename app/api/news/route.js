import { pool } from '../../lib/db';

export async function GET(req) {
    try {
        const result = await pool.query('SELECT title, description, date FROM news ORDER BY date DESC');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title, description, date } = await req.json();
        const result = await pool.query(
            'INSERT INTO news (title, description, date) VALUES ($1, $2, $3) RETURNING *',
            [title, description, date]
        );
        return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add news' }), { status: 500 });
    }
}
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await pool.query('DELETE FROM news WHERE id = $1', [id]);
        return new Response(JSON.stringify({ message: 'News deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete news' }), { status: 500 });
    }
}