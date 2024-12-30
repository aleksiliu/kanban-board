import type { TaskList, TaskStatus } from '@/types'

export const mockData: TaskList[] = [
  {
    id: 1,
    name: 'Personal Tasks',
    tasks: [
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
        status: 'doing',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Pay Bills',
        description: 'Pay electricity and water bills',
        status: 'done',
        priority: 'high',
        dueDate: new Date('2024-03-15')
      }
    ]
  },
  {
    id: 2,
    name: 'Work Projects',
    tasks: [
      {
        id: 4,
        title: 'Client Meeting',
        description: 'Prepare presentation for client review',
        status: 'todo',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: new Date('2024-03-21')
      },
      {
        id: 5,
        title: 'Code Review',
        description: 'Review pull requests for frontend features',
        status: 'doing',
        priority: 'medium',
        assignee: 'Jane Smith'
      }
    ]
  }
]
