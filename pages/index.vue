<script setup lang="ts">
  import CreateTaskDialog from '@/components/task/CreateTaskDialog.vue'
  import { TASK_STATUSES } from '@/constants'
  import type { TaskStatus } from '@/types'

  const {
    tasks,
    isDragging,
    handleDragStart,
    handleDrop,
    updateTaskStatus,
    deleteTask,
    createTask
  } = useTaskManager()

  const showCreateDialog = useState<boolean>('showCreateDialog', () => false)
  const columns: typeof TASK_STATUSES = TASK_STATUSES
  const backlogTasks = computed(() => tasks.value.filter((task) => task.status === 'backlog'))
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
        :is-dragging="isDragging"
        @drag-start="handleDragStart"
        @drop="handleDrop"
        @status-change="updateTaskStatus"
        @delete="deleteTask"
      />
    </div>

    <div class="mt-4 sm:mt-8">
      <BacklogSection
        :tasks="backlogTasks"
        :is-dragging="isDragging"
        @drag-start="handleDragStart"
        @drop="handleDrop"
        @status-change="updateTaskStatus"
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
