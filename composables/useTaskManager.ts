import { watch } from 'vue'

import type { Task, TaskStatus } from '@/types'

import { useLocalStorage } from './useLocalStorage'
import { useNotification } from './useNotification'

export const useTaskManager = () => {
  const { tasks, loadFromStorage, saveToStorage } = useLocalStorage()
  const draggedTaskId = useState<number | null>('draggedTaskId', () => null)
  const isDragging = useState<boolean>('isDragging', () => false)
  const filteredTasks = useState<Task[]>('filteredTasks', () => [])
  const { show } = useNotification()

  tasks.value = loadFromStorage()
  filteredTasks.value = [...tasks.value]

  watch(
    tasks,
    (newTasks) => {
      saveToStorage(newTasks)

      filteredTasks.value = [...newTasks]
    },
    { deep: true }
  )

  const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === taskId)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        status: newStatus
      }

      const filteredIndex = filteredTasks.value.findIndex((t) => t.id === taskId)
      if (filteredIndex !== -1) {
        filteredTasks.value[filteredIndex] = { ...tasks.value[taskIndex] }
      }
    }
  }

  const handleDragStart = (taskId: number) => {
    draggedTaskId.value = taskId
    isDragging.value = true
  }

  const handleDrop = (newStatus: TaskStatus) => {
    if (!draggedTaskId.value) return

    updateTaskStatus(draggedTaskId.value, newStatus)
    draggedTaskId.value = null
    isDragging.value = false
  }

  const deleteTask = (taskId: number) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === taskId)
    if (taskIndex !== -1) {
      const taskTitle = tasks.value[taskIndex].title
      tasks.value.splice(taskIndex, 1)
      show(`Task "${taskTitle}" deleted`)
    }
  }

  const createTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData
    }
    tasks.value.push(newTask)
    show(`Task "${newTask.title}" created`)
  }

  const updateFilters = (newFilteredTasks: Task[]) => {
    filteredTasks.value = newFilteredTasks
  }

  return {
    tasks,
    filteredTasks,
    isDragging,
    handleDragStart,
    handleDrop,
    updateTaskStatus,
    deleteTask,
    createTask,
    updateFilters
  }
}
