/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',
          secondary: '#64748b',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: {
            primary: '#1e293b',
            secondary: '#64748b'
          }
        },
        dark: {
          primary: '#3b82f6',
          secondary: '#94a3b8',
          surface: '#1e293b',
          border: '#334155',
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8'
          }
        }
      }
    },
  },
  plugins: [],
}
