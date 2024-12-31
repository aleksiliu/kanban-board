<script setup lang="ts">
  import { TASK_STATUSES } from '@/constants'
  import type { Task, TaskStatus } from '@/types'

  interface Props {
    task: Task
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    'drag-start': [taskId: number]
    'status-change': [taskId: number, newStatus: TaskStatus]
  }>()

  const showStatusMenu = ref(false)
  const statusOptions: Record<string, TaskStatus> = {
    Backlog: 'backlog',
    ...TASK_STATUSES
  }

  const handleStatusChange = (newStatus: TaskStatus) => {
    emit('status-change', props.task.id, newStatus)
    showStatusMenu.value = false
  }
</script>

<template>
  <div class="relative">
    <div
      class="flex cursor-move items-start justify-between rounded-lg bg-card-hover p-3 hover:bg-card-active sm:p-4"
      draggable="true"
      @dragstart="emit('drag-start', task.id)"
    >
      <div class="flex-1">
        <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
        <h3 class="text-sm font-medium sm:text-base">{{ task.title }}</h3>
        <p class="mt-1 text-xs text-secondary sm:mt-2 sm:text-sm">{{ task.description }}</p>
        <div
          v-if="task.dueDate"
          class="mt-2 text-xs text-secondary sm:mt-3"
        >
          {{ formatDate(task.dueDate) }}
        </div>
      </div>

      <button
        class="ml-2 block text-secondary hover:text-primary"
        @click="showStatusMenu = !showStatusMenu"
      >
        <span class="sr-only">Change status</span>
        •••
      </button>
    </div>

    <div
      v-if="showStatusMenu"
      class="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg bg-card p-1 shadow-lg"
    >
      <button
        v-for="(value, label) in statusOptions"
        :key="value"
        class="w-full rounded px-3 py-2 text-left text-sm text-secondary hover:bg-card-hover hover:text-primary"
        :class="{ 'text-primary': task.status === value }"
        @click="handleStatusChange(value)"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>
