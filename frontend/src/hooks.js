import db from '$lib/database/database';
import cookie from 'cookie';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie ?? '');

	request.locals.user = cookies;

	if (!cookies.session_id) {
		request.locals.user.authenticated = false;
	} else {
<<<<<<< HEAD
		request.locals.user.authenticated = true
		let rows = await db.execute("SELECT * FROM session WHERE session = ?", [cookies.session_id]);
		if(!rows[0][0]) {
			request.locals.user.authenticated = false
		} else {
			rows = await db.execute("SELECT * FROM user WHERE id = ?", [rows[0][0].id]);
			request.locals.user.id = rows[0][0].id;
			request.locals.user.username = rows[0][0].username;
			request.locals.user.info = JSON.parse(rows[0][0].info);
			request.locals.user.about = rows[0][0].about;
		}
=======
		request.locals.user.authenticated = true;
		let rows = await db.execute('SELECT * FROM session WHERE session = ?', [cookies.session_id]);
		rows = await db.execute('SELECT * FROM user WHERE id = ?', [rows[0][0].id]);
		request.locals.user.id = rows[0][0].id;
		request.locals.user.username = rows[0][0].username;
		request.locals.user.info = JSON.parse(rows[0][0].info);
		request.locals.user.about = rows[0][0].about;
>>>>>>> 66ae920ceffbf5933a89c01f34a1558240fb0d7b
	}

	const res = await resolve(request);
	return {
		...res
	};
};

export const getSession = async (request) => {
	if(request.locals.user) {
		if (!request.locals.user.authenticated) {
			return {
				authenticated: false
			};
		}

		return {
			authenticated: true,
			id: request.locals.user.id,
			username: request.locals.user.username,
			info: request.locals.user.info,
			about: request.locals.user.about
		};
	}
};
