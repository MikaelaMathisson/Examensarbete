import { Pool } from 'pg';
import moment from 'moment';

// Configure PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'booking_db',
    password: 'mysecretpassword',
    port: 5432,
});

export async function GET(req, res) {
    try {
        const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD');
        const result = await pool.query(
            'SELECT id, title, description, date, start_time, end_time, color FROM events WHERE date BETWEEN $1 AND $2',
            [startOfWeek, endOfWeek]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}