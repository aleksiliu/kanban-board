<script setup lang="ts">
  import { mockTasks } from '@/mocks/mockTasks'
  import { formatDate, getPriorityColor } from '@/utils'

  const todoTasks = computed(() => mockTasks.filter((task) => task.status === 'todo'))
  const inProgressTasks = computed(() => mockTasks.filter((task) => task.status === 'in-progress'))
  const doneTasks = computed(() => mockTasks.filter((task) => task.status === 'done'))
  const backlogTasks = computed(() => mockTasks.filter((task) => task.status === 'backlog'))
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8 text-white">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">My Project</h1>
      <button class="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700">Create</button>
    </header>

    <div class="mt-8 grid grid-cols-3 gap-4">
      <div class="rounded-lg bg-gray-800 p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">To Do {{ todoTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="rounded-lg bg-gray-700 p-4"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gray-800 p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">In Progress {{ inProgressTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in inProgressTasks"
            :key="task.id"
            class="rounded-lg bg-gray-700 p-4"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gray-800 p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">Done {{ doneTasks.length }}</h2>
          <button class="text-gray-400 hover:text-white">+</button>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in doneTasks"
            :key="task.id"
            class="rounded-lg bg-gray-700 p-4"
          >
            <div :class="[getPriorityColor(task.priority), 'mb-2 h-1 rounded']" />
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
            <div
              v-if="task.dueDate"
              class="mt-3 text-xs text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold">Backlog</h2>
      <div class="mt-4 space-y-2">
        <div
          v-for="task in backlogTasks"
          :key="task.id"
          class="rounded-lg bg-gray-800 p-4"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-medium">{{ task.title }}</h3>
            <div
              v-if="task.dueDate"
              class="text-sm text-gray-400"
            >
              {{ formatDate(task.dueDate) }}
            </div>
          </div>
          <p class="mt-2 text-sm text-gray-400">{{ task.description }}</p>
          <div :class="[getPriorityColor(task.priority), 'mt-3 h-1 w-2 rounded']" />
        </div>
      </div>
    </div>
  </div>
</template>
