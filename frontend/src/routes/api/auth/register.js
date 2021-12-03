import db from "$lib/database/database"
import crypto from 'crypto';

export const post = async (req) => {
    const username = req.body.get("username")
    const email = req.body.get("email")
    const password = req.body.get("password")
    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")
  
    console.log(username);

  if (!username || !email || !password) {
    return {
			headers: { Location: `/errorHandler?status=300&msg=Missing%20required%20field` },
			status: 300
		};
  }
  
  await db
		.execute('INSERT INTO `user` (username, email, password) VALUES (?, ?, ?)', [
			username,
			email,
			hashPassword
		])
		.catch((err) => {
			return {
				headers: { Location: `/errorHandler?status=300&msg=${err.sqlMessage}` },
				status: 300
			};
		});

  return {
		body: {
			message: 'success'
		},
		headers: { Location: `/login` },
		status: 200
	};
};