/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography')
  ],
}
