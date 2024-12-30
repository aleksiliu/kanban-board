import type { Task } from '@/types'

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design System Setup',
    description: 'Set up Tailwind CSS with custom HSL color system and component library',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-03-20')
  },
  {
    id: 2,
    title: 'Authentication Flow',
    description: 'Implement user authentication with OAuth and session management',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-03-22')
  },
  {
    id: 3,
    title: 'Dark Mode Implementation',
    description: 'Add dark mode support using CSS variables and Tailwind',
    status: 'done',
    priority: 'medium',
    dueDate: new Date('2024-03-15')
  },
  {
    id: 4,
    title: 'API Integration',
    description: 'Connect frontend with backend REST APIs using Nuxt composables',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-03-25')
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description: 'Optimize bundle size and implement lazy loading for components',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Component Library',
    description: 'Create reusable UI components with Shadcn Vue and Radix Vue',
    status: 'backlog',
    priority: 'high',
    dueDate: new Date('2024-04-01')
  },
  {
    id: 7,
    title: 'State Management',
    description: 'Set up Pinia stores with TypeScript for global state management',
    status: 'backlog',
    priority: 'medium',
    dueDate: new Date('2024-04-05')
  },
  {
    id: 8,
    title: 'Unit Testing Setup',
    description: 'Configure Vitest and implement tests for critical components',
    status: 'backlog',
    priority: 'low',
    dueDate: new Date('2024-04-10')
  }
]
