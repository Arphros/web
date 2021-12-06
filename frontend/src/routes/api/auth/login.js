import db from '$lib/database/database';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const post = async (req) => {
	const username = req.body.get('username');
	const email = req.body.get('email');
	const password = req.body.get('password');

	let rows = await db.execute('SELECT * FROM user WHERE username = ? AND email = ?', [username, email]);
	if (!rows[0][0]) {
		return {
			headers: {
				Location: "/errorHandler?msg=Invalid%20username%20or%20email&status=300"
			},
			status: 302
		};
	}
	const isPassCorrect = await bcrypt.compareSync(password, rows[0][0].password);
	if (isPassCorrect === false) {
		return {
			headers: {
				Location: "/errorHandler?msg=Invalid%20password&status=300"
			},
			status: 302
		};
	}

	rows = await db.execute('SELECT id FROM user WHERE username = ? AND email = ?', [username, email]);
	const sessionId = uuidv4();

	await db.execute('INSERT INTO session (session, id, timestamp) VALUES (?, ?, ?)', [sessionId, rows[0][0].id, Date.now()]);

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', sessionId, {
			httpOnly: false,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		}),
		Location: '/'
	};

	return {
		status: 302,
		headers
	};
};
