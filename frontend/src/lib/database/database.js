import config from './config.json'
import mysql from 'mysql2';

const connection = mysql
    .createPool({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE
    })
    .promise();

export default connection;