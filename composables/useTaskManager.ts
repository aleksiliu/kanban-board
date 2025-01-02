import { watch } from 'vue'

import type { Task, TaskStatus } from '@/types'

import { useLocalStorage } from './useLocalStorage'

export const useTaskManager = () => {
  const { tasks, loadFromStorage, saveToStorage } = useLocalStorage()
  const draggedTaskId = useState<number | null>('draggedTaskId', () => null)
  const isDragging = useState<boolean>('isDragging', () => false)

  onMounted(() => {
    tasks.value = loadFromStorage()
  })

  watch(
    tasks,
    (newTasks) => {
      saveToStorage(newTasks)
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
      tasks.value.splice(taskIndex, 1)
    }
  }

  const createTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData
    }
    tasks.value.push(newTask)
  }

  return {
    tasks: readonly(tasks),
    isDragging: readonly(isDragging),
    handleDragStart,
    handleDrop,
    updateTaskStatus,
    deleteTask,
    createTask
  }
}
