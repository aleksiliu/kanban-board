<script setup lang="ts">
  import type { Task } from '@/types'

  defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
    create: [task: Omit<Task, 'id'>]
  }>()

  const title = ref('')
  const description = ref('')
  const priority = ref<Task['priority']>('medium')
  const dueDate = ref<string>('')

  const handleSubmit = () => {
    emit('create', {
      title: title.value,
      description: description.value,
      status: 'backlog',
      priority: priority.value,
      dueDate: dueDate.value ? new Date(dueDate.value) : undefined
    })

    title.value = ''
    description.value = ''
    priority.value = 'medium'
    dueDate.value = ''

    emit('close')
  }
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-background/80"
  >
    <div class="w-full max-w-md rounded-lg bg-card p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Create New Task</h2>
        <button
          class="text-secondary hover:text-primary"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>
      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-secondary"
            >Title</label
          >
          <input
            id="title"
            v-model="title"
            type="text"
            class="mt-1 w-full rounded-md bg-card-hover p-2 text-primary"
            required
          />
        </div>
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-secondary"
            >Description</label
          >
          <textarea
            id="description"
            v-model="description"
            class="mt-1 w-full rounded-md bg-card-hover p-2 text-primary"
            rows="3"
            required
          />
        </div>
        <div>
          <label
            for="priority"
            class="block text-sm font-medium text-secondary"
            >Priority</label
          >
          <select
            id="priority"
            v-model="priority"
            class="mt-1 w-full rounded-md bg-card-hover p-2 text-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label
            for="dueDate"
            class="block text-sm font-medium text-secondary"
            >Due Date</label
          >
          <input
            id="dueDate"
            v-model="dueDate"
            type="date"
            class="mt-1 w-full rounded-md bg-card-hover p-2 text-primary"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded px-4 py-2 text-secondary hover:bg-card-hover"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded bg-purple px-4 py-2 hover:bg-purple-hover"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
