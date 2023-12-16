import mariadb from 'mariadb';
import '../../../Infrastructure/config';

export const pool = mariadb.createPool({
    host: process.env.DB_HOSTNAME || 'markitos.mariadb',
    port: (process.env.DB_HOSTPOST as unknown as number) || 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
});
