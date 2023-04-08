const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				SCoreDream: ['SCoreDream', ...defaultTheme.fontFamily.sans],
				Pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
				GmarketSans: ['GmarketSans', ...defaultTheme.fontFamily.sans],
				Roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
