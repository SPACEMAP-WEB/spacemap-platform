import api from '@app.modules/api'
import { API_RSOS, API_TLES } from '@app.modules/keyFactory'
import { TRsoParams, Ttle } from './type'

export const getTles = async (year, month, date, hour) => {
  const DATE_URI = '/' + year + '/' + month + '/' + date + '/' + hour
  const { data } = await api.GET<null, { data: { tles: Ttle } }>(API_TLES + DATE_URI)
  return data.data.tles
}

export const getRsosParams = async () => {
  const { data } = await api.GET<null, { data: { rsoParams: TRsoParams } }>(API_RSOS)
  return data.data.rsoParams
}

export const dateParser = (initialTime) => {
  const originTleDate = initialTime.clone().add(0, 'd')
  const year = originTleDate.year()
  const month = originTleDate.month() + 1
  const date = originTleDate.date()
  const hour = originTleDate.hour()
  return { year, month, date, hour }
}

export const updateTlesAndRsos = async (initialTime) => {
  const { year, month, date, hour } = dateParser(initialTime)
  const tles = await getTles(year, month, date, hour)
  const rsoParams = await getRsosParams()
  return { tles, rsoParams }
}

export const updateCZML = ({
  initialTime,
  initialTimeISOString,
  duration,
  intervalUnitTime,
  tles,
  rsoParams,
  worker,
  viewer,
  czmlDataSource,
}) => {
  worker.postMessage([initialTimeISOString, duration, intervalUnitTime, tles, rsoParams])
  worker.onmessage = (e) => {
    czmlDataSource.load(e.data).then(function (ds) {
      viewer.dataSources.add(ds)
      const clockViewModel = viewer.clockViewModel
      clockViewModel.startTime = initialTime.toISOString()
      clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
      worker.terminate()
    })
  }
}
