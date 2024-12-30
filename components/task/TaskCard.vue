<script setup lang="ts">
  import type { Task } from '@/types'

  interface Props {
    task: Task
  }

  defineProps<Props>()
  const emit = defineEmits<{
    'drag-start': [taskId: number]
  }>()
</script>

<template>
  <div
    class="bg-card-hover hover:bg-card-active cursor-move rounded-lg p-3 sm:p-4"
    draggable="true"
    @dragstart="emit('drag-start', task.id)"
  >
    <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
    <h3 class="text-sm font-medium sm:text-base">{{ task.title }}</h3>
    <p class="text-secondary mt-1 text-xs sm:mt-2 sm:text-sm">{{ task.description }}</p>
    <div
      v-if="task.dueDate"
      class="text-secondary mt-2 text-xs sm:mt-3"
    >
      {{ formatDate(task.dueDate) }}
    </div>
  </div>
</template>
