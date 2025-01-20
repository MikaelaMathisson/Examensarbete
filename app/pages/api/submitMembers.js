// pages/api/submitMember.js
import { queryMembers } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        console.log('Received member application:', { name, email, message });
        try {
            const result = await queryMembers(
                'INSERT INTO members (name, email, message) VALUES ($1, $2, $3)',
                [name, email, message]
            );
            res.status(200).json({ message: 'Application submitted successfully' });
        } catch (error) {
            console.error('Error saving application:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}