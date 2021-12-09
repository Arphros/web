import db from '$lib/database/database';
import crypto from "crypto";

export const post = async (req) => {
	const username = req.body.get('username');
	const email = req.body.get('email');
	const password = req.body.get('password');
	const sha = crypto.createHash("sha256");
	const hashPassword = sha.update(password).digest("hex");

	if (!username || !email || !password) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 302
		};
	}

	let rows = await db.execute('SELECT id FROM user WHERE email = ?', [email]);
	if(rows[0][0]) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Email is already taken` },
			status: 302
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
				status: 302
			};
		});

	return {
		headers: { Location: `/auth/login` },
		status: 302
	};
};
