<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'

  interface Props {
    tasks: Task[]
  }

  defineProps<Props>()
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
        <div
          v-for="task in tasks"
          :key="task.id"
          class="bg-card hover:bg-card-hover cursor-move rounded-lg p-4"
          draggable="true"
          @dragstart="emit('drag-start', task.id)"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-medium">{{ task.title }}</h3>
            <div
              v-if="task.dueDate"
              class="text-secondary text-sm"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
          <p class="text-secondary mt-2 text-sm">{{ task.description }}</p>
          <div :class="[getPriorityColor(task.priority), 'mt-3 h-1 w-2 rounded']" />
        </div>
      </template>
      <template v-else>
        <div class="border-card-hover rounded-lg border-2 border-dashed p-8 text-center">
          <p class="text-secondary">Drag tasks here to add them to the backlog</p>
        </div>
      </template>
    </div>
  </div>
</template>
