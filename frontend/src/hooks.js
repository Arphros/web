import db from '$lib/database/database'
import cookie from "cookie"

export const handle = async ({ request, resolve }) => {
    const cookies = cookie.parse(request.headers.cookie || '');
    console.log(cookies);

    request.locals.user = cookies;

    if (!cookies.session_id) {
        request.locals.user.authenticated = false;
    } else {
        request.locals.user.authenticated = true;
    }

    // let rows = await db.execute("SELECT * FROM session WHERE session = ?", [cookies.session_id]);
    
    // console.log(rows)

    const response = await resolve(request);

    return {
        ...response
    };
}

export const getSession = (request) => {
	const user = request.locals.user;

	if (!user.session_id) {
		return { authenticated: false };
    }

    console.log(user);

	return { user };
};