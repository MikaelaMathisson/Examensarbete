import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});

export const queryBookings = (text, params) => pool.query(text, params);
export const queryMembers = (text, params) => pool.query(text, params);