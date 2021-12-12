const path = require("path");

module.exports = {
	content: [
		path.join(__dirname, "./src/**/*.svelte"),
		path.join(__dirname, "./src/**/**/*.svelte"),
		path.join(__dirname, "./src/*.html"),
		path.join(__dirname, "./src/**/*.svelte"),
	],
	corePlugins: {
		preflight: true,
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	plugins: []
};
