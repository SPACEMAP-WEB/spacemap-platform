import moment from 'moment'

const remainingTimeChecker = (tcaTime: moment.Moment) => {
  let diffTime = moment.utc(tcaTime).diff(moment())
  const seconds = moment.duration(diffTime).seconds()
  const minutes = moment.duration(diffTime).minutes()
  const hours = moment.duration(diffTime).hours()
  const days = moment.duration(diffTime).days()

  const remainedTime = `${days}d ${hours}h ${minutes}m ${seconds}s left`

  return remainedTime
}

export default remainingTimeChecker
