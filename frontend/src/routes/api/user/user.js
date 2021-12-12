import db from '$lib/database/database.js';

export const post = async (req) => {
	let id = JSON.parse(req.body).id;

	if (!id) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 300
		};
	}
	let rows = await db
		.execute('SELECT username, id, info, about about FROM user WHERE id = ?', [id])
		.catch((err) => {
			return {
				headers: { Location: `/errorHandler?status=300&msg=${err.sqlMessage}` },
				status: 300
			};
		});

	return {
		body: {
			user: rows[0][0]
		},
		status: 302
	};
};
