<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'

  interface Props {
    title: string
    tasks: Task[]
    status: TaskStatus
  }

  defineProps<Props>()

  // Define all emits with their payload types
  const emit = defineEmits<{
    'drag-start': [taskId: number]
    drop: [status: TaskStatus]
  }>()

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }
</script>

<template>
  <div
    class="bg-card rounded-lg p-4"
    @dragover="handleDragOver"
    @drop="emit('drop', status)"
  >
    <div class="mb-4 flex items-center justify-between">
      <h2 class="font-semibold">{{ title }} {{ tasks.length }}</h2>
      <button class="text-secondary hover:text-primary">+</button>
    </div>
    <div class="space-y-3">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="emit('drag-start', $event)"
      />
    </div>
  </div>
</template>
