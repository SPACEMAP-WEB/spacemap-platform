import moment from 'moment'
import { useEffect, useState } from 'react'

const timeCounter = (tcaTime: string) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [days, setDays] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const time = moment.utc(new Date(tcaTime))
      const diffTime = time.diff(moment())
      setSeconds(moment.duration(diffTime).seconds())
      setMinutes(moment.duration(diffTime).minutes())
      setHours(moment.duration(diffTime).hours())
      setDays(moment.duration(diffTime).days())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  return days === 0
    ? `${hours}h ${minutes}m ${seconds}s left`
    : `${days}d ${hours}h ${minutes}m left`
}

export default timeCounter
