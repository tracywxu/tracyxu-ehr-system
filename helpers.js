export function formatDate(timestamp) {
  const formattedDate = new Date(timestamp).toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return formattedDate
}

export function convertDateToTimestamp(date) {
  const timestamp = date.getTime()
  return timestamp
}
