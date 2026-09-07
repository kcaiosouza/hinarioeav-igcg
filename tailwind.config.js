/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        hinario: {
          bg: '#263a30',
          'bg-page': '#0e1712',
          surface: '#344E41',
          'surface-raised': '#3A5A40',
          gold: '#5C7650',
          'gold-soft': '#A3B18A',
          ink: '#12201a',
          cream: '#DAD7CD',
          muted: '#b7c2ab',
          'muted-dim': '#5c6c5f',
          line: 'rgba(218, 215, 205, 0.12)',
          sage: '#DAD7CD',
        },
      },
    },
  },
  plugins: [],
};
