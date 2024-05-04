import { Pool } from 'pg';

export default new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    post: 5432,
    database: 'cinema_park'
});