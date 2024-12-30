<script setup lang="ts">
  import { mockTasks } from '@/mocks/mockTasks'
  import type { Task, TaskStatus } from '@/types'
  import { TASK_STATUSES } from '@/types'

  const tasks = ref<Task[]>(mockTasks)
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
  <div class="bg-background text-primary min-h-screen p-8">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">My Project</h1>
      <button class="bg-card-hover hover:bg-card-active rounded px-4 py-2">Create</button>
    </header>

    <div class="mt-8 grid grid-cols-3 gap-4">
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

    <BacklogSection
      :tasks="backlogTasks"
      @drag-start="handleDragStart"
      @drop="handleDrop"
    />
  </div>
</template>
