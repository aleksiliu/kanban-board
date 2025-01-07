<script setup lang="ts">
  import type { Task } from '@/types'

  interface Props {
    tasks: ReadonlyArray<Task>
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    'filter-change': [filteredTasks: Task[]]
  }>()

  const searchQuery = ref('')
  const filterPriority = ref<Task['priority'] | 'all'>('all')

  const filteredTasks = computed(() => {
    return [...props.tasks].filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesPriority =
        filterPriority.value === 'all' || task.priority === filterPriority.value
      return matchesSearch && matchesPriority
    })
  })

  watch([searchQuery, filterPriority], () => {
    emit('filter-change', filteredTasks.value)
  })
</script>

<template>
  <div class="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
    <div class="relative flex-1">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tasks..."
        class="w-full rounded-lg bg-card-hover px-4 py-2 text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-purple/50"
      />
    </div>
    <select
      v-model="filterPriority"
      class="rounded-lg bg-card-hover px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-purple/50"
    >
      <option value="all">All Priorities</option>
      <option value="low">Low Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="high">High Priority</option>
    </select>
  </div>
</template>
