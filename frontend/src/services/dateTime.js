export function splitDateTime(dateTime) {
  const d = new Date(dateTime)
  return {
    date: d.toISOString().slice(0, 10),
    time: d.toTimeString().slice(0, 5),
  }
}

export function combineDateTime(date, time) {
  return `${date}T${time}:00`
}

export function formatDate(dateTime) {
  return new Date(dateTime).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
