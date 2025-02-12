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
    delete: [taskId: number]
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
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold sm:text-base">{{ title }} {{ tasks.length }}</h2>
    </div>
    <template v-if="tasks.length > 0">
      <div class="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @drag-start="(taskId: number) => emit('drag-start', taskId)"
          @status-change="
            (taskId: number, status: TaskStatus) => emit('status-change', taskId, status)
          "
          @delete="(taskId: number) => emit('delete', taskId)"
        />
      </div>
    </template>
  </div>
</template>
