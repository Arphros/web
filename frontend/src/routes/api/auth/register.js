import db from '$lib/database/database';
import bcrypt from 'bcrypt';

export const post = async (req) => {
	const username = req.body.get('username');
	const email = req.body.get('email');
	const password = req.body.get('password');
	const hashPassword = bcrypt.hashSync(password, 10);

	if (!username || !email || !password) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 300
		};
	}

	await db
		.execute('INSERT INTO `user` (username, email, password) VALUES (?, ?, ?)', [
			username,
			email,
			hashPassword
		])
		.catch((err) => {
			return {
				headers: { Location: `/errorHandler?status=300&msg=${err.sqlMessage}` },
				status: 300
			};
		});

	return {
		headers: { Location: `/auth/login` },
		status: 302
	};
};
