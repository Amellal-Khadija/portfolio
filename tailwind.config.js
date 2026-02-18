/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          crust: 'rgba(var(--bg-crust-rgb), <alpha-value>)',
          base: 'rgba(var(--bg-base-rgb), <alpha-value>)',
          surface0: 'rgba(var(--bg-surface0-rgb), <alpha-value>)',
          surface1: 'rgba(var(--bg-surface1-rgb), <alpha-value>)',
          text: 'rgba(var(--text-main-rgb), <alpha-value>)',
          subtext: 'rgba(var(--text-sub-rgb), <alpha-value>)',
          mauve: 'rgba(var(--accent-mauve-rgb), <alpha-value>)',
          pink: 'rgba(var(--accent-pink-rgb), <alpha-value>)',
          blue: 'rgba(var(--accent-blue-rgb), <alpha-value>)',
          peach: 'rgba(var(--accent-peach-rgb), <alpha-value>)',
          teal: 'rgba(var(--accent-teal-rgb), <alpha-value>)',
          yellow: 'rgba(var(--accent-yellow-rgb), <alpha-value>)',
          green: 'rgba(var(--accent-green-rgb), <alpha-value>)',
          red: 'rgba(var(--accent-red-rgb), <alpha-value>)',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
