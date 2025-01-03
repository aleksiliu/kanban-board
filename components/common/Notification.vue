<script setup lang="ts">
  import { useNotification } from '@/composables/useNotification'

  const { notification, isVisible } = useNotification()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg"
      :class="notification?.type === 'success' ? 'bg-green-400' : 'bg-red-500'"
    >
      {{ notification?.message }}
    </div>
  </Transition>
</template>
