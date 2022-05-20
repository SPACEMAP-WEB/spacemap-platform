export const winodwHeightFn = (height: number) => {
  if (height <= 800) return 2
  else if (height <= 900) return 3
  else if (height <= 1000) return 4
  else {
    return 5
  }
}
