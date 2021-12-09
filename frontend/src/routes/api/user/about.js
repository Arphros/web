import db from '$lib/database/database.js';

export const post = async (request) => {
	let req = JSON.parse(request.body);
	if (!req.value || !req.id) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 300
		};
	}
	await db.execute('UPDATE user SET about = ? WHERE id = ?', [req.value, req.id]);
	return {
		body: {
			message: 'Success!'
		},
		status: 302
	};
};
