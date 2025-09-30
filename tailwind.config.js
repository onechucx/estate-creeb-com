/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2563eb',
        'brand-secondary': '#64748b', 
        'brand-surface': '#f8fafc',
        'brand-border': '#e2e8f0',
        'brand-text-primary': '#1e293b',
        'brand-text-secondary': '#64748b',
        'dark-primary': '#3b82f6',
        'dark-secondary': '#94a3b8',
        'dark-surface': '#1e293b',
        'dark-border': '#334155',
        'dark-text-primary': '#f1f5f9',
        'dark-text-secondary': '#94a3b8'
      }
    },
  },
  plugins: [],
}
