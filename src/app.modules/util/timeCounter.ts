import { useEffect, useState } from 'react'

const timeCounter = (time: string) => {
  const [seconds, setSeconds] = useState<number>(+time.match(/-?\w+(?=s)/)[0])
  const [minutes, setMinutes] = useState<number>(+time.match(/-?\w+(?=m)/)[0])
  const [hours, setHours] = useState<number>(+time.match(/-?\w+(?=h)/)[0])
  const [days, setDays] = useState<number>(+time.match(/-?\w+(?=d)/)[0])

  return `${days}d ${hours}h ${minutes}m ${seconds}s left`
}

export default timeCounter
