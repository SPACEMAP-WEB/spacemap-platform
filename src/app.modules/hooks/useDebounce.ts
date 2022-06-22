import { useState } from 'react'

export const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null)

  const debounceFn = () => {
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(callback, delay)
    setTimer(newTimer)
  }

  return debounceFn
}
