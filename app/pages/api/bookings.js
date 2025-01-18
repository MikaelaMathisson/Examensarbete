import { query } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM bookings');
            res.status(200).json(results.rows);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}