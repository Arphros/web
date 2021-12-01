import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const connection = mysql
	.createPool({
		host: dotenv.config().parsed.HOST,
		user: dotenv.config().parsed.USER,
		password: dotenv.config().parsed.PASSWORD,
		database: dotenv.config().parsed.DATABASE
	})
	.promise();

export default connection;
