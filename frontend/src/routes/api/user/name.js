import db from '$lib/database/database.js';

export const post = async (req) => {
	let id = JSON.parse(req.body).id;
	let username = JSON.parse(req.body).username;

	if (!id || !username) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 300
		};
	}
	let rows = await db
		.execute('UPDATE user SET username = ? WHERE id = ?', [username, id])
		.catch((err) => {
			return {
				headers: { Location: `/errorHandler?status=300&msg=${err.sqlMessage}` },
				status: 300
			};
		});

	return {
		body: {
			message: 'Success!'
		},
		status: 200
	};
};
