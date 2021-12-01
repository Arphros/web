import db from '$lib/database/database';

export const post = async (req) => {
	const username = req.body.get('username');
	const password = req.body.get('password');

    const rows = await db.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

    if (rows.length <= 0) {
        return {
            status: 401,
            body: {
                message: 'Invalid credentials'
            }
        };
    }

	return {
        headers: { Location: '/__error' },
		status: 302
	};
};