<script setup lang="ts">
  import CreateTaskDialog from '@/components/task/CreateTaskDialog.vue'
  import { useLocalStorage } from '@/composables/useLocalStorage'
  import { TASK_STATUSES } from '@/constants'
  import type { Task, TaskStatus } from '@/types'

  const { tasks, loadFromStorage, saveToStorage } = useLocalStorage()

  // Initialize tasks on client-side only
  onMounted(() => {
    tasks.value = loadFromStorage()
  })

  // Watch for changes to save to localStorage
  watch(
    tasks,
    (newTasks) => {
      saveToStorage(newTasks)
    },
    { deep: true }
  )

  const draggedTaskId = useState<number | null>('draggedTaskId', () => null)
  const isDragging = useState<boolean>('isDragging', () => false)
  const showCreateDialog = useState<boolean>('showCreateDialog', () => false)

  const columns: typeof TASK_STATUSES = TASK_STATUSES

  const backlogTasks = computed(() => tasks.value.filter((task) => task.status === 'backlog'))

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

    const taskIndex = tasks.value.findIndex((t) => t.id === draggedTaskId.value)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        status: newStatus
      }
    }

    draggedTaskId.value = null
    isDragging.value = false
  }

  const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
    updateTaskStatus(taskId, newStatus)
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
</script>

<template>
  <div class="min-h-screen bg-background p-4 text-primary sm:p-8">
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-bold sm:text-2xl">My Project</h1>
      <button
        class="rounded bg-purple px-3 py-1.5 text-sm transition-colors hover:bg-purple-hover sm:px-4 sm:py-2 sm:text-base"
        @click="showCreateDialog = true"
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
        @status-change="handleStatusChange"
        @delete="deleteTask"
      />
    </div>

    <div class="mt-4 sm:mt-8">
      <BacklogSection
        :tasks="backlogTasks"
        @drag-start="handleDragStart"
        @drop="handleDrop"
        @status-change="handleStatusChange"
        @delete="deleteTask"
      />
    </div>

    <CreateTaskDialog
      :is-open="showCreateDialog"
      @close="showCreateDialog = false"
      @create="createTask"
    />
  </div>
</template>
