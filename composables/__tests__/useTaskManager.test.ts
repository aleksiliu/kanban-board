import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const tasks = ref([])
const saveToStorage = vi.fn()
const notificationShow = vi.fn()

mockNuxtImport('useState', () => {
  return (key: string, init: () => any) => {
    if (key === 'draggedTaskId') return ref(null)
    if (key === 'isDragging') return ref(false)
    return ref(init())
  }
})

mockNuxtImport('useLocalStorage', () => {
  return () => ({
    tasks,
    loadFromStorage: () => [],
    saveToStorage
  })
})

mockNuxtImport('useNotification', () => {
  return () => ({
    show: notificationShow
  })
})

describe('useTaskManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    tasks.value = []
  })

  it('creates a new task', () => {
    const { tasks, createTask } = useTaskManager()

    createTask({
      title: 'New Task',
      description: 'Test Description',
      status: 'backlog',
      priority: 'medium'
    })

    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].title).toBe('New Task')
    expect(notificationShow).toHaveBeenCalledWith('Task "New Task" created')
  })

  it('deletes a task', () => {
    const { tasks, createTask, deleteTask } = useTaskManager()

    createTask({
      title: 'Task to Delete',
      description: 'Will be deleted',
      status: 'backlog',
      priority: 'low'
    })

    const taskId = tasks.value[0].id
    deleteTask(taskId)
    expect(tasks.value).toHaveLength(0)
    expect(notificationShow).toHaveBeenCalledWith('Task "Task to Delete" deleted')
  })

  it('updates task status', () => {
    const { tasks, createTask, updateTaskStatus } = useTaskManager()

    createTask({
      title: 'Task to Update',
      description: 'Will update status',
      status: 'backlog',
      priority: 'medium'
    })

    const taskId = tasks.value[0].id
    updateTaskStatus(taskId, 'in-progress')
    expect(tasks.value[0].status).toBe('in-progress')
  })

  it('handles drag and drop', () => {
    const { tasks, createTask, handleDragStart, handleDrop } = useTaskManager()

    createTask({
      title: 'Drag Task',
      description: 'Will be dragged',
      status: 'backlog',
      priority: 'medium'
    })

    const taskId = tasks.value[0].id
    handleDragStart(taskId)
    handleDrop('in-progress')
    expect(tasks.value[0].status).toBe('in-progress')
  })
})
