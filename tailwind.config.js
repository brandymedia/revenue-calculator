module.exports = {
  purge: {
    content: ['*.html', 'app.js'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
