import type { Task } from '@/types'

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Grocery Shopping',
    description: 'Get weekly groceries from Walmart',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-03-20')
  },
  {
    id: 2,
    title: 'Gym Workout',
    description: 'Complete 45min cardio session',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Pay Bills',
    description: 'Pay electricity and water bills',
    status: 'done',
    priority: 'high',
    dueDate: new Date('2024-03-15')
  },
  {
    id: 4,
    title: 'Client Meeting',
    description: 'Prepare presentation for client review',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-03-21')
  },
  {
    id: 5,
    title: 'Code Review',
    description: 'Review pull requests for frontend features',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Implement user authentication',
    description:
      'Add user authentication to the application using Supabase Auth. This will allow users to create accounts and manage their boards securely.',
    status: 'backlog',
    priority: 'high',
    dueDate: new Date('2024-02-14')
  },
  {
    id: 7,
    title: 'Add dark mode support',
    description:
      'Extend the existing dark mode support to the calendar view and timeline view components. Ensure consistent styling with the rest of the application.',
    status: 'backlog',
    priority: 'medium',
    dueDate: new Date('2024-02-08')
  },
  {
    id: 8,
    title: 'Create unit tests for date utility functions',
    description:
      'Write unit tests to ensure the correctness of the date utility functions in date-utils.ts. Aim for at least 90% code coverage.',
    status: 'backlog',
    priority: 'low',
    dueDate: new Date('2024-02-29')
  }
]
