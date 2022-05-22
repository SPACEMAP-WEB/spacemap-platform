export const isCalculatableDate = () => {
  const currentDate = new Date()
  const hours = currentDate.getUTCHours()
  return hours < 4 || hours >= 10
}
