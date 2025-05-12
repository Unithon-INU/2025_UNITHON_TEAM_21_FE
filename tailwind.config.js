/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                'main-color': '#FFB257',
                'main-gray': '#D5D5D5',
                'font-black': '#484848',
                'font-gray': '#9A9A9A',
                'bg-gray': '#EDEDED',
            },
        },
    },
    plugins: [],
};
