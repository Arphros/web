import db from '$lib/database/database';
import cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

export const post = async (req) => {
	const username = req.body.get('username');
	const password = req.body.get('password');

	let rows = await db.execute('SELECT * FROM user WHERE username = ? AND password = ?', [
		username,
		password
	]);

	if (!rows[0][0]) {
		return {
			status: 401,
			body: {
				message: 'Invalid credentials'
			}
		};
	}

	rows = await db.execute('SELECT id FROM user WHERE username = ?', [username]);

	const sessionId = uuidv4();

	await db.execute('INSERT INTO session (session, id) VALUES (?, ?)', [sessionId, rows[0][0].id]);

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', sessionId, {
			httpOnly: false,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: {
			message: 'Success!'
		}
	};
};
