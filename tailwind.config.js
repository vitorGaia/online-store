/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accent: '#31C28D',
        base: '#F5F5F5',
        baseM: '#FFF',
        font: '#2B2730',
        fontM: '#8B7E74'
      },
      fontFamily: {
        'poppins': ['poppins', 'poppins'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}