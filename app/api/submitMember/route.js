// api/submitMember/route.js
import { pool } from '../../lib/db';

export async function POST(req) {
    try {
        const { membershipType, firstName, lastName, personalNumber, email, phone, sport, consent, verification } = await req.json();

        // Validera inkommande data
        if (!membershipType || !firstName || !lastName || !personalNumber || !email || !phone || !sport || !consent || verification !== '43439') {
            return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
        }

        // Sätt in data i databasen
        const result = await pool.query(
            'INSERT INTO members (membership_type, first_name, last_name, personal_number, email, phone, sport, consent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            [membershipType, firstName, lastName, personalNumber, email, phone, sport, consent]
        );

        return new Response(JSON.stringify({ message: 'Application submitted successfully', id: result.rows[0].id }), { status: 200 });
    } catch (error) {
        console.error('Error submitting application:', error);
        return new Response(JSON.stringify({ message: 'Error submitting application' }), { status: 500 });
    }
}