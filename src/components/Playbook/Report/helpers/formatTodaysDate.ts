const formatter = new Intl.DateTimeFormat(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function formatTodaysDate() {
  return formatter.format(new Date())
}
