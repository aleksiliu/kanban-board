<script setup lang="ts">
  import { mockTasks } from '@/mocks/mockTasks'
  import type { TaskStatus } from '@/types'
  import { formatDate, getPriorityColor } from '@/utils'

  const tasks = ref(mockTasks)
  const draggedTaskId = ref<number | null>(null)
  const isDragging = ref(false)

  const todoTasks = computed(() => tasks.value.filter((task) => task.status === 'todo'))
  const inProgressTasks = computed(() =>
    tasks.value.filter((task) => task.status === 'in-progress')
  )
  const doneTasks = computed(() => tasks.value.filter((task) => task.status === 'done'))
  const backlogTasks = computed(() => tasks.value.filter((task) => task.status === 'backlog'))

  watch(
    tasks,
    (newTasks) => {
      console.log('Tasks updated:', newTasks)
    },
    { deep: true }
  )

  watch(draggedTaskId, (newId) => {
    console.log('Dragged task ID:', newId)
  })

  watch(isDragging, (dragging) => {
    console.log('Dragging state:', dragging)
  })

  const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
    console.log('Updating task status:', { taskId, newStatus })
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) {
      const oldStatus = task.status
      task.status = newStatus
      console.log('Task updated:', { taskId, oldStatus, newStatus })
    }
  }

  const handleDragStart = (taskId: number) => {
    console.log('Drag started:', taskId)
    draggedTaskId.value = taskId
    isDragging.value = true
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (newStatus: TaskStatus) => {
    console.log('Drop event:', { draggedTaskId: draggedTaskId.value, newStatus })
    if (draggedTaskId.value) {
      updateTaskStatus(draggedTaskId.value, newStatus)
      draggedTaskId.value = null
      isDragging.value = false
      console.log('Drop completed')
    }
  }
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8 text-white">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">My Project</h1>
      <button class="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700">Create</button>
    </header>

    <div class="mt-8 grid grid-cols-3 gap-4">
      <div
        class="rounded-lg bg-gray-800 p-4 transition-colors duration-200"
        :class="{ 'bg-gray-700': isDragging }"
        @dragover="handleDragOver"
        @drop="handleDrop('todo')"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">To Do {{ todoTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="cursor-move rounded-lg bg-gray-700 p-4"
            draggable="true"
            @dragstart="handleDragStart(task.id)"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-lg bg-gray-800 p-4"
        @dragover="handleDragOver"
        @drop="handleDrop('in-progress')"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">In Progress {{ inProgressTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in inProgressTasks"
            :key="task.id"
            class="cursor-move rounded-lg bg-gray-700 p-4"
            draggable="true"
            @dragstart="handleDragStart(task.id)"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-lg bg-gray-800 p-4"
        @dragover="handleDragOver"
        @drop="handleDrop('done')"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">Done {{ doneTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in doneTasks"
            :key="task.id"
            class="cursor-move rounded-lg bg-gray-700 p-4"
            draggable="true"
            @dragstart="handleDragStart(task.id)"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold">Backlog</h2>
      <div
        class="mt-4 space-y-2"
        @dragover="handleDragOver"
        @drop="handleDrop('backlog')"
      >
        <div
          v-for="task in backlogTasks"
          :key="task.id"
          class="cursor-move rounded-lg bg-gray-800 p-4"
          draggable="true"
          @dragstart="handleDragStart(task.id)"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-medium">{{ task.title }}</h3>
            <div
              v-if="task.dueDate"
              class="text-sm text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
          <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
          <div :class="[getPriorityColor(task.priority), 'mt-3 h-1 w-2 rounded']" />
        </div>
      </div>
    </div>
  </div>
</template>
