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
