export const isCalculatableDate = () => {
  const currentDate = new Date()
  const hours = currentDate.getUTCHours()
  return hours < 12 || hours >= 18
}
