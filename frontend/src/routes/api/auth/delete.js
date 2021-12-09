import db from '$lib/database/database';
import crypto from "crypto";

export const post = async (req) => {
	const id = req.body.get('id');
	const password = req.body.get('password');
	const sha = crypto.createHash("sha256");
	const hashPassword = sha.update(password).digest("hex");

	if (!id || !password) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 302
		};
	}

	let rows = await db.execute('SELECT password FROM user WHERE id = ?', [id]);
	if(rows[0][0].password !== hashPassword) {
		return {
			headers: { Location: `/errorHandler?status=300&msg=Incorrect Password` },
			status: 302
		};
	}
	await db
		.execute('DELETE FROM session WHERE id = ?', [
			id
		])
	await db
		.execute('DELETE FROM user WHERE id = ? AND password = ?', [
			id,
			hashPassword
		])
		.catch(() => {
			return {
				headers: { Location: `/errorHandler?status=300&msg=Something went wrong!` },
				status: 302
			};
		});

	return {
		headers: { Location: `/` },
		status: 302
	};
};
