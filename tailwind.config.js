
import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Eudoxus Sans GX', ...defaultTheme.fontFamily.sans],
			},
		}
	},
	plugins: []
};
