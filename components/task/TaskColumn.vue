<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'

  interface Props {
    title: string
    tasks: Task[]
    status: TaskStatus
  }

  defineProps<Props>()

  const emit = defineEmits<{
    'drag-start': [taskId: number]
    drop: [status: TaskStatus]
    'status-change': [taskId: number, newStatus: TaskStatus]
  }>()

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }
</script>

<template>
  <div
    class="rounded-lg bg-card p-3 sm:p-4"
    @dragover="handleDragOver"
    @drop="emit('drop', status)"
  >
    <div class="mb-3 flex items-center justify-between sm:mb-4">
      <h2 class="text-sm font-semibold sm:text-base">{{ title }} {{ tasks.length }}</h2>
      <button class="text-sm text-secondary hover:text-primary sm:text-base">+</button>
    </div>
    <div class="space-y-2 sm:space-y-3">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="(taskId: number) => emit('drag-start', taskId)"
        @status-change="
          (taskId: number, status: TaskStatus) => emit('status-change', taskId, status)
        "
      />
    </div>
  </div>
</template>
