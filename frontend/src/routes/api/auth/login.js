import db from '$lib/database/database';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const post = async (req) => {
	const username = req.body.get('username');
	const password = req.body.get('password');
	
	// Hash the password using bcrypt
	const hashPassword = bcrypt.hashSync(password, 32);

	let rows = await db.execute('SELECT * FROM user WHERE username = ?', [
		username,
	]);

	bcrypt.compare(password, rows[0][0].password, (err, res) => {
		if (res === false) {
			if (!rows[0][0]) {
				return {
					status: 401,
					body: {
						message: 'Invalid credentials'
					}
				};
			}
		}
	});

	rows = await db.execute('SELECT id FROM user WHERE username = ?', [username]);
	const sessionId = uuidv4();

	let sessionFinding = await db.execute('SELECT * FROM session WHERE id = ?', [rows[0][0].id])
	if(sessionFinding[0][0]) {
		if(Date.now() - sessionFinding[0][0].timestamp > 604800000) {
			await db.execute('DELETE FROM session WHERE id = ?', [rows[0][0].id]);
		}
	}

	if(!sessionFinding[0][0]) {
		await db.execute('INSERT INTO session (session, id, timestamp) VALUES (?, ?, ?)', [sessionId, rows[0][0].id, Date.now()]);
	}

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
		headers,
	};
};
