import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#7A0B18',
        'dark-red': '#A02820',
        'brand-red': '#C4312E',
        'brand-green': '#4C8F3A',
        'brand-cream': '#FFF7ED',
        'brand-golden': '#EFBF3A',
        'brand-brown': '#6B4423',
        'brand-tan': '#D4A574',
        'brand-gray': '#8B8680',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

