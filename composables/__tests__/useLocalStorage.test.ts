import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockTasks } from '@/mocks/mockTasks'
import type { Task } from '@/types'

import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  let storage: Record<string, string> = {}

  // Mock localStorage
  beforeEach(() => {
    storage = {}
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => storage[key]),
      setItem: vi.fn((key, value) => {
        storage[key] = value
      })
    })

    // Mock import.meta.client
    vi.stubGlobal('import.meta', { client: true })
  })

  it('should load mock tasks when storage is empty', () => {
    const { loadFromStorage } = useLocalStorage()
    const tasks = loadFromStorage()

    expect(tasks).toEqual(mockTasks)
    expect(localStorage.setItem).toHaveBeenCalledWith('kanban-tasks', JSON.stringify(mockTasks))
  })

  it('should load existing tasks from storage', () => {
    const testTasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test',
        status: 'todo'
      }
    ]
    storage['kanban-tasks'] = JSON.stringify(testTasks)

    const { loadFromStorage } = useLocalStorage()
    const tasks = loadFromStorage()

    expect(tasks).toEqual(testTasks)
    expect(localStorage.getItem).toHaveBeenCalledWith('kanban-tasks')
  })

  it('should save tasks to storage', () => {
    const { saveToStorage } = useLocalStorage()
    const testTasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test',
        status: 'todo'
      }
    ]

    saveToStorage(testTasks)

    expect(localStorage.setItem).toHaveBeenCalledWith('kanban-tasks', JSON.stringify(testTasks))
  })

  it('should handle dates correctly when loading tasks', () => {
    const date = new Date()
    const testTasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test',
        status: 'todo',
        dueDate: date
      }
    ]
    storage['kanban-tasks'] = JSON.stringify(testTasks)

    const { loadFromStorage } = useLocalStorage()
    const tasks = loadFromStorage()

    expect(tasks[0].dueDate).toBeInstanceOf(Date)
    expect(tasks[0].dueDate?.getTime()).toBe(date.getTime())
  })
})
