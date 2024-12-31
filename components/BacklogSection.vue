<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'

  interface Props {
    tasks: Task[]
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
    class="mt-8"
    @dragover.prevent
    @drop="emit('drop', 'backlog')"
  >
    <h2 class="text-xl font-semibold">Backlog</h2>
    <div
      class="mt-4 space-y-2"
      @dragover="handleDragOver"
      @drop="emit('drop', 'backlog')"
    >
      <template v-if="tasks.length">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @drag-start="emit('drag-start', $event)"
          @status-change="(taskId, status) => emit('status-change', taskId, status)"
        />
      </template>
      <template v-else>
        <div class="rounded-lg border-2 border-dashed border-card-hover p-8 text-center">
          <p class="text-secondary">Drag tasks here to add them to the backlog</p>
        </div>
      </template>
    </div>
  </div>
</template>
