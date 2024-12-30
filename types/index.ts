export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority?: 'low' | 'medium' | 'high'
  dueDate?: Date
  assignee?: string
}

export const TASK_STATUSES = {
  'To Do': 'todo',
  'In Progress': 'in-progress',
  Done: 'done'
} as const

export type ColumnConfig = {
  [K in keyof typeof TASK_STATUSES]: TaskStatus
}
