import { mockTasks } from '@/mocks/mockTasks'
import type { Task } from '@/types'

const STORAGE_KEY = 'kanban-tasks'

export const useLocalStorage = () => {
  const tasks = useState<Task[]>('tasks', () => [])

  const loadFromStorage = () => {
    if (!import.meta.client) return []

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks))
        return mockTasks
      }

      return JSON.parse(stored).map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }))
    } catch (error) {
      console.error('Failed to load tasks:', error)
      return []
    }
  }

  const saveToStorage = (newTasks: Task[]) => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  return {
    tasks,
    loadFromStorage,
    saveToStorage
  }
}
