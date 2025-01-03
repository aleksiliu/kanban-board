# Kanban Board

A modern, responsive Kanban board application built with Nuxt 3, Vue 3, and TypeScript. Manage your tasks efficiently with a beautiful and intuitive drag and drop interface.

**[Live Demo](https://kanban-board-eight-tau.vercel.app)**

## Features

- Responsive design that works seamlessly on desktop and mobile
- Local storage persistence for tasks
- Drag and drop task management
- Priority levels (Low, Medium, High) with visual indicators
- Due date tracking for tasks
- Backlog section for upcoming tasks
- Testing with Vitest

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework with Composition API
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [VueUse](https://vueuse.org/) - Collection of Vue Composition Utilities
- [Vitest](https://vitest.dev/) - Next Generation Testing Framework

## Project Structure

```
├── components/     # Vue components
├── composables/    # Vue composables
├── constants/      # Shared constants
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Testing

The project uses Vitest for unit and integration testing. Tests are co-located with their source files in `__tests__` directories.

### Running Tests

```bash
# Run all tests
npm run test
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Preview the production build:

```bash
# npm
npm run preview
```
