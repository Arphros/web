import db from '$lib/database/database';
import cookie from 'cookie';

export const post = async (req) => {
    const id = JSON.parse(req.body).id;
    const cookies = cookie.parse(req.headers.cookie ?? '')

    if(!id || !cookies.session_id) {
        return {
            body: {
                message: "Bad request"
            },
            status: 300
        }
    }

    let rows = await db.execute('SELECT * FROM session WHERE id = ?', [id]);
    if (rows[0][0]) {
        await db.execute('DELETE FROM session WHERE session = ?', [cookies.session_id])
    }

    const headers = {
        Location: '/'
    };

    return {
        status: 302,
        headers,
    };
};
