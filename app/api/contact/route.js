import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM contacts ORDER BY created_at DESC');
        client.release();
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO contacts (name, email, message, replied) VALUES ($1, $2, $3, $4)',
            [name, email, message, false]
        );
        client.release();
        return NextResponse.json({ message: 'Contact created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating contact message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req) {
    const { id, replied } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const client = await pool.connect();
        await client.query(
            'UPDATE contacts SET replied = $1 WHERE id = $2',
            [replied, id]
        );
        client.release();
        return NextResponse.json({ message: 'Contact updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating contact message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}