import { computed } from 'vue'
import type { Ref } from 'vue'

interface Notification {
  message: string
  type: 'success' | 'error'
}

export const useNotification = () => {
  const notification: Ref<Notification | null> = useState('notification', () => null)
  const isVisible = computed(() => !!notification.value)

  const show = (message: string, type: Notification['type'] = 'success') => {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  return {
    notification,
    isVisible,
    show
  }
}
