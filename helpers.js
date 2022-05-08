export function formatDate(timestamp) {
  if (!timestamp) {
    return ''
  }
  const formattedDate = new Date(timestamp).toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return formattedDate
}

export function convertDateToTimestamp(date) {
  const timestamp = new Date(date).getTime()
  return timestamp
}
