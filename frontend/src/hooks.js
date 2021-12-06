import db from '$lib/database/database';
import cookie from 'cookie';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie ?? '');

	request.locals.user = cookies;

	if (!cookies.session_id) {
		request.locals.user.authenticated = false;
	} else {
		request.locals.user.authenticated = true;
		let selectId = await db.execute('SELECT * FROM session WHERE session = ?', [cookies.session_id]);
		let rows = await db.execute('SELECT * FROM user WHERE id = ?', [selectId[0][0].id]);
		request.locals.user.id = rows[0][0].id;
		request.locals.user.username = rows[0][0].username;
		request.locals.user.info = JSON.parse(rows[0][0].info);
		request.locals.user.about = rows[0][0].about;
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
