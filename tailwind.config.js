/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            "colors": { "background": "#020202", "background-light": "#f7f7f7" }
        },
    },
    plugins: [],
}
