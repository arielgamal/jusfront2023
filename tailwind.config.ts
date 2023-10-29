import type { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */

const config: Config = {
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
      screens: {
        sm: "500px",
        md: "768px",
        lg: "1024px",
        // => @media (min-width: 640px) { ... }
      },
      colors: {
        TJRJ: '#6ee7b7',
        TJMG: '#121063',
        TJSC: '#3ab7bf',
        TJBA: '#ecebff',
        TJSP: '#ff77e9',
      },
    },      
  },
  plugins: [],
}
export default config
