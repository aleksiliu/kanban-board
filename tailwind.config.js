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
        background: 'hsl(var(--color-background) / <alpha-value>)',
        card: 'hsl(var(--color-card) / <alpha-value>)',
        'card-hover': 'hsl(var(--color-card-hover) / <alpha-value>)',
        'card-active': 'hsl(var(--color-card-active) / <alpha-value>)',

        // Text colors
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',

        // Priority colors
        'priority-high': 'hsl(var(--color-priority-high) / <alpha-value>)',
        'priority-medium': 'hsl(var(--color-priority-medium) / <alpha-value>)',
        'priority-low': 'hsl(var(--color-priority-low) / <alpha-value>)'
      }
    }
  },
  plugins: []
}
