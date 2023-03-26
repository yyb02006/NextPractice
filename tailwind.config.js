/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['S-core', ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [],
};
