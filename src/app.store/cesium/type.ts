import { LPDBDataType } from '@app.feature/launchConjunctions/types/launchConjunctions'
import * as Cesium from 'cesium'
import moment from 'moment'

export type TStoreCesium = {
  viewer: Cesium.Viewer
  scene: Cesium.Scene
  camera: any
  czmlDataSource: Cesium.CzmlDataSource
  accessToken: string
  tles: Ttle
  rsoParams: TRsoParams
  satrecs: []
  primarySatColor: Cesium.Color
  secondarySatColor: Cesium.Color
  apartColor: Cesium.Color
  closeColor: Cesium.Color

  isPairMode: boolean
  prevPid: string | null
  prevSid: string | null
}

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
}

export type TargDrawRsos = {
  initialTime: moment.Moment
  duration?: number
  intervalUnitTime?: number
}

export type TargDrawConjuctions = {
  pid: string | number
  sid: string | number
  from: string
  tca: string
  to: string
}

export type TdrawConjuctions = TargDrawConjuctions & {
  tles: Ttle
  rsoParams: TRsoParams
}

export type TargDrawLcaConjuctions = {
  trajectory: string
  predictionEpochTime: string
  launchEpochTime: string
  trajectoryLength: number
  lpdb: LPDBDataType[]
}

export type TdrawLcaConjuctions = TargDrawLcaConjuctions & {
  tles: Ttle
  rsoParams: TRsoParams
}
