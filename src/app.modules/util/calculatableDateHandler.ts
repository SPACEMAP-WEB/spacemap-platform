export const isCalculatableDate = () => {
  const currentDate = new Date()
  const hours = currentDate.getUTCHours()
  return hours < 15 || hours >= 21
}
