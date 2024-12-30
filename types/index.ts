export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
  id: number
  title: string
  description?: string
  status: TaskStatus
  priority?: 'low' | 'medium' | 'high'
  dueDate?: Date
  assignee?: string
}

export interface TaskList {
  id: number
  name: string
  tasks: Task[]
}
