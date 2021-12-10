export const post = async (req) => {
	let data = req.body;
	let fetchUrls = process.env.DEVURLs ?? "http://arphros.ddns.net:5000/"
	let fetchData = await fetch(`${fetchUrls}user/avatar`,
		{
			method: 'POST',
			body: JSON.stringify({ id: data.id, image: data.img }),
			headers: {"Content-Type": "application/json"}
		})
	if(fetchData.status !== 200) {
		return {
			body: {
				message: "Error"
			}
		}
	} else {
		return {
			body: {
				message: 'Success!'
			}
		}
	}
};
