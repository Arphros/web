import db from '$lib/database/database';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const post = async (req) => {
	const username = req.body.get('username');
	const password = req.body.get('password');

	let rows = await db.execute('SELECT * FROM user WHERE username = ?', [username]);
	if (!rows[0][0]) {
		return {
			headers: { 'Location': `/errorHandler?status=401&msg=Invalid%20Credentials` },
			status: 300
		};
	}
	const isPassCorrect = await bcrypt.compareSync(password, rows[0][0].password);
	if (isPassCorrect === false) {
		return {
			headers: { 'Location': `/errorHandler?status=401&msg=Invalid%20Credenticals` },
			status: 300
		};
	}

	rows = await db.execute('SELECT id FROM user WHERE username = ?', [username]);
	const sessionId = uuidv4();

	await db.execute('INSERT INTO session (session, id, timestamp) VALUES (?, ?, ?)', [sessionId, rows[0][0].id, Date.now()]);

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', sessionId, {
			httpOnly: false,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		}),
		'Location': '/'
	};

	return {
		status: 302,
		headers
	};
};
