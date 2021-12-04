import db from '$lib/database/database';
import cookie from 'cookie';

export const handle = async({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies;

	if(!cookies.session_id) {
		request.locals.user.authenticated = false
	} else {
		request.locals.user.authenticated = true
	}

	if(cookies.session_id) {
		let rows = await db.execute("SELECT * FROM session WHERE session = ?", [cookies.session_id]);
		if (rows[0][0]) {
			if(rows[0].length > 1) {
				await db.execute("DELETE FROM session WHERE id = ?", [rows[0][0].id])
			}
			rows = await db.execute("SELECT * FROM user WHERE id = ?", [rows[0][0].id]);
			request.locals.user.id = rows[0][0].id;
			request.locals.user.username = rows[0][0].username;
		}

		const res = await resolve(request);
		return {
			...res
		}
	}
};

export const getSession = async (request) => {
	if (!request.locals.user.authenticated) {
		return {
			authenticated: false
		};
	}

	return {
		authenticated: true,
		id: request.locals.user.id,
		username: request.locals.user.username
	};
};
