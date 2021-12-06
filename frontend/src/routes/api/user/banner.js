import fs from 'fs';

export const post = async (req) => {
	let data = JSON.parse(req.body);
	fs.writeFile(
		`${process.cwd()}/static/user/banner/${data.id.toString()}.png`,
		data.img.split(',')[1],
		'base64',
		(err) => {
			if (err) {
				console.log(err);
				return {
					body: {
						message: 'Error!'
					}
				};
			} else {
				return {
					body: {
						message: 'Success!'
					}
				};
			}
		}
	);
};
