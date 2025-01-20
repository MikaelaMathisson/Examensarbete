import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date, name, personnummer, phone, email } = req.body;
        if (!date || !name || !personnummer || !phone || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        console.log('Received booking:', { date, name, personnummer, phone, email });
        try {
            const result = await query(
                'INSERT INTO bookings (date, name, personnummer, phone, email, is_available) VALUES ($1, $2, $3, $4, $5, $6)',
                [date, name, personnummer, phone, email, false]
            );
            res.status(200).json({ message: 'Booking confirmed' });
        } catch (error) {
            console.error('Error saving booking:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}