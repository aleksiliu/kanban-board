import { mockTasks } from '@/mocks/mockTasks'
import type { Task } from '@/types'

const STORAGE_KEY = 'kanban-tasks'

export const useLocalStorage = () => {
  const initializeStorage = () => {
    if (import.meta.client && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks))
    }
  }

  const saveToStorage = (tasks: Task[]) => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }

  const loadFromStorage = (): Task[] => {
    if (import.meta.client) {
      initializeStorage()
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const tasks = JSON.parse(stored)
        return tasks.map((task: Task) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }))
      }
    }
    return mockTasks
  }

  return {
    saveToStorage,
    loadFromStorage
  }
}
