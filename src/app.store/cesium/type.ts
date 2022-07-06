import moment from 'moment'

export type Ttle = {
  name: string
  firstLine: string
  secondeLine: string
}

export type TRsoParams = { [key: string]: string }[]

export type TdrawRsos = {
  initialTime: moment.Moment
  initialTimeISOString: string
  duration: number
  intervalUnitTime: number
  tles: Ttle
  rsoParams: TRsoParams
  worker: Worker
}

export type TargDrawRsos = {
  initialTime: moment.Moment
  duration?: number
  intervalUnitTime?: number
}
