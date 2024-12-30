/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        background: 'hsl(var(--color-background))',
        card: 'hsl(var(--color-card))',
        'card-hover': 'hsl(var(--color-card-hover))',
        'card-active': 'hsl(var(--color-card-active))',

        // Text colors
        primary: '#ffffff',
        secondary: '#94a3b8',

        // Priority colors
        'priority-high': '#ef4444', // red
        'priority-medium': '#eab308', // yellow
        'priority-low': '#3b82f6' // blue
      }
    }
  },
  plugins: []
}
