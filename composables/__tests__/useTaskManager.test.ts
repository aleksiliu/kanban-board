import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const tasks = ref([])
const saveToStorage = vi.fn()
const notificationShow = vi.fn()
const mockInitialTasks = [
  {
    id: 1,
    title: 'Initial Task',
    description: 'Initial Description',
    status: 'backlog',
    priority: 'low'
  }
]

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
    loadFromStorage: () => mockInitialTasks,
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

  it('loads initial tasks on initialization', () => {
    const { tasks } = useTaskManager()
    expect(tasks.value).toEqual(mockInitialTasks)
  })

  it('saves tasks to storage when modified', async () => {
    const { tasks, createTask } = useTaskManager()
    const initialLength = tasks.value.length

    createTask({
      title: 'Storage Test',
      description: 'Test storage',
      status: 'backlog',
      priority: 'low'
    })

    await nextTick()
    expect(saveToStorage).toHaveBeenCalledWith(tasks.value)
  })

  it('creates a new task', () => {
    const { tasks, createTask } = useTaskManager()
    const initialLength = tasks.value.length

    createTask({
      title: 'New Task',
      description: 'Test Description',
      status: 'backlog',
      priority: 'medium'
    })

    expect(tasks.value).toHaveLength(initialLength + 1)
    expect(tasks.value[tasks.value.length - 1].title).toBe('New Task')
    expect(notificationShow).toHaveBeenCalledWith('Task "New Task" created')
  })

  it('deletes a task', () => {
    const { tasks, deleteTask } = useTaskManager()
    const initialTask = tasks.value[0]
    const initialLength = tasks.value.length

    deleteTask(initialTask.id)
    expect(tasks.value).toHaveLength(initialLength - 1)
    expect(notificationShow).toHaveBeenCalledWith('Task "Initial Task" deleted')
  })

  it('updates task status', () => {
    const { tasks, updateTaskStatus } = useTaskManager()
    const initialTask = tasks.value[0]

    updateTaskStatus(initialTask.id, 'in-progress')
    expect(tasks.value[0].status).toBe('in-progress')
  })

  it('handles drag and drop', () => {
    const { tasks, handleDragStart, handleDrop } = useTaskManager()
    const initialTask = tasks.value[0]

    handleDragStart(initialTask.id)
    handleDrop('in-progress')
    expect(tasks.value[0].status).toBe('in-progress')
  })
})
