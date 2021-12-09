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
	let rows;
	rows = await db.execute("SELECT info FROM user WHERE id = ?", [id]);

	let userInfo = rows[0][0].info
	let ticket = parseInt(JSON.parse(rows[0][0].info).ticket);
	let JSONData = userInfo.ticket = (parseInt(JSON.parse(rows[0][0].info)) - 200).toString();
	if(ticket < 200) {
		return {
			body: {
				message: "Not enough tickets!"
			},
			status: 300
		};
	} else {
		await db.execute('UPDATE user SET info = ? WHERE id = ?', [JSONData, id])
	}
	await db
		.execute('UPDATE user SET username = ? WHERE id = ?', [username, id])
		.catch((err) => {
			return {
				body: {
					message: "Database error!"
				},
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
