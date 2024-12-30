export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
}

export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'bg-priority-high'
    case 'medium':
      return 'bg-priority-medium'
    case 'low':
      return 'bg-priority-low'
    default:
      return 'bg-secondary'
  }
}
