/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Landing embeds use Tailwind; keep lander CSS Modules as source of truth elsewhere.
  corePlugins: {
    preflight: false,
  },
}
