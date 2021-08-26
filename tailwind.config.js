/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#bda699',
          light: '#b8b6a5',
          dark: '#94918b',
          darker: '#1a1819',
        },
        brown: {
          DEFAULT: '#4a4341',
        }
      }
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      backgroundColor: ['selected'],
      backgroundOpacity: ['selected'],
    },
  },
  plugins: [
    require('tailwindcss-easing'),
    plugin(function ({ addUtilities, addVariant, e }) {
      const newUtilities = {
        '.underline-dotted': {
          textDecoration: "underline dotted"
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])

      addVariant('selected', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`selected${separator}${className}`)}:hover,.${e(`selected${separator}${className}`)}:focus,.${e(`selected${separator}${className}`)}.active,.${e(`selected${separator}${className}`)}[aria-selected="true"]`
        })
      })
    })
  ],
}
