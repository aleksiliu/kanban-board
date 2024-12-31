<script setup lang="ts">
  import { useLocalStorage } from '@/composables/useLocalStorage'
  import { TASK_STATUSES } from '@/constants'
  import type { Task, TaskStatus } from '@/types'

  const { saveToStorage, loadFromStorage } = useLocalStorage()

  const tasks = ref<Task[]>(loadFromStorage())

  watch(
    tasks,
    (newTasks) => {
      saveToStorage(newTasks)
    },
    { deep: true }
  )

  const draggedTaskId = ref<number | null>(null)
  const isDragging = ref(false)

  const columns: typeof TASK_STATUSES = TASK_STATUSES

  const backlogTasks = computed(() => tasks.value.filter((task) => task.status === 'backlog'))

  const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) {
      console.log(`Updating task ${taskId} status from ${task.status} to ${newStatus}`)
      task.status = newStatus
      console.log('Updated tasks:', tasks.value)
    } else {
      console.warn(`Task ${taskId} not found`)
    }
  }

  const handleDragStart = (taskId: number) => {
    console.log(`Started dragging task ${taskId}`)
    draggedTaskId.value = taskId
    isDragging.value = true
  }

  const handleDrop = (newStatus: TaskStatus) => {
    console.log(`Dropping task into ${newStatus} column`)
    if (draggedTaskId.value) {
      updateTaskStatus(draggedTaskId.value, newStatus)
      draggedTaskId.value = null
      isDragging.value = false
    } else {
      console.warn('No task being dragged')
    }
  }
</script>

<template>
  <div class="min-h-screen bg-background p-4 text-primary sm:p-8">
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-bold sm:text-2xl">My Project</h1>
      <button
        class="bg-purple hover:bg-purple-hover rounded px-3 py-1.5 text-sm transition-colors sm:px-4 sm:py-2 sm:text-base"
      >
        Create
      </button>
    </header>

    <div class="mt-4 flex flex-col gap-4 sm:mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <TaskColumn
        v-for="(status, title) in columns"
        :key="title"
        :title="title"
        :status="status"
        :tasks="tasks.filter((task) => task.status === status)"
        @drag-start="handleDragStart"
        @drop="handleDrop"
      />
    </div>

    <div class="mt-4 sm:mt-8">
      <BacklogSection
        :tasks="backlogTasks"
        @drag-start="handleDragStart"
        @drop="handleDrop"
      />
    </div>
  </div>
</template>
