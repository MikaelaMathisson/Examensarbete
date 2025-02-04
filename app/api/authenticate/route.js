import { pool } from '../../lib/db';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // Hämta användaren från databasen
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
        }

        // Kontrollera lösenordet
        if (password !== user.password) {
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
        }

        // Kontrollera användarens roll
        if (user.role !== 'admin') {
            return new Response(JSON.stringify({ message: 'Access denied' }), { status: 403 });
        }

        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } catch (error) {
        console.error('Error during authentication:', error);
        return new Response(JSON.stringify({ message: 'Error during authentication' }), { status: 500 });
    }
}