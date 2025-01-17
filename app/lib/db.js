import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my-postgres-db',
    password: 'mysecretpassword',
    port: 5432,
});

export const query = (text, params) => pool.query(text, params);