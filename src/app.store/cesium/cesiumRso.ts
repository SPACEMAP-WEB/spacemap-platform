import api from '@app.modules/api'
import { API_RSOS, API_TLES } from '@app.modules/keyFactory'
import { TRsoParams, Ttle } from './type'

export const getTles = async (year: number, month: number, date: number, hour: number) => {
  const DATE_URI = '/' + year + '/' + month + '/' + date + '/' + hour
  const { data } = await api.GET<null, { data: { tles: Ttle[] } }>(API_TLES + DATE_URI)
  return data.data.tles
}

export const getRsosParams = async () => {
  const { data } = await api.GET<null, { data: { rsoParams: TRsoParams } }>(API_RSOS)
  return data.data.rsoParams
}

export const dateParser = (initialTime: moment.Moment) => {
  const originTleDate = initialTime.clone().add(0, 'd')
  const year = originTleDate.year()
  const month = originTleDate.month() + 1
  const date = originTleDate.date()
  const hour = originTleDate.hour()
  return { year, month, date, hour }
}

export const getTleById = async (targetTime: moment.Moment, noradId: number) => {
  const { year, month, date, hour } = dateParser(targetTime)
  const DATE_AND_ID_URI = '/' + year + '/' + month + '/' + date + '/' + hour + '/' + noradId
  const { data } = await api.GET<null, { data: { tles: Ttle } }>(API_TLES + DATE_AND_ID_URI)
  return data.data.tles
}

export const updateTlesAndRsos = async (initialTime) => {
  const { year, month, date, hour } = dateParser(initialTime)
  const tles = await getTles(year, month, date, hour)
  const rsoParams = await getRsosParams()
  return { tles, rsoParams }
}
