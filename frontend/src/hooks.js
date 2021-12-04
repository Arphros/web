import db from '$lib/database/database';
import cookie from 'cookie';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getContext = async({ headers }) => {
	const cookies = cookie.parse(headers.cookie || '');

	if(!cookies.session_id) {
		return {
			authenticated: false
		};
	}

	let rows = await db.execute("SELECT * FROM session WHERE session = ?", [cookies.session_id])[0][0];

	if (rows) {
		rows = await db.execute("SELECT * FROM user WHERE id = ?", [rows.id])[0][0];
		return {
			authenticated: true,
			id: rows.id,
			username: rows.username
		};

	}
};

export const getSession = async ({ context }) => {
	if(context !== undefined) {
		if (!context.authenticated) {
			return {
				authenticated: false
			};
		}

		return {
			authenticated: true,
			id: context.id,
			username: context.username
		};
	}
};
