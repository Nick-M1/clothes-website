/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],


  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      fontFamily: {
        monserrat: ['var(--font-monserrat)'],
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit,minmax(15rem,1fr))',
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },

      grayscale: {
        40: '40%',
      },




      animation: {
        fade: 'fadeOut 0.5s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.slate.100') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),

    },
  },

  darkMode: "class",

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
}
