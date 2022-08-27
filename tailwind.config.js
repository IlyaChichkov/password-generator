/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,css}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto Mono', 'monospace']
            },
            colors: {
                'gd-dark': '#08070C',
                'gd-light': '#14131B',
                'dark-gray-500': '#18171F',
                'dark-gray-400': '#24232B',
                'gray': '#525159',
                'light-gray': '#83818F',
                'light-green': '#A4FFAF',
                'white': '#EDECF4',
            }
        },
    },
    plugins: [

    ]
}
