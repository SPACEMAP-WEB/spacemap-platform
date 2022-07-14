import { LPDBDataType } from '@app.feature/launchConjunctions/types/launchConjunctions'
import { WCDBDataType } from '@app.feature/watcherCatcher/types/watcherCatcher'
import { Draft } from '@reduxjs/toolkit'
import * as Cesium from 'cesium'
import moment from 'moment'
import { czml } from './czmlType'

export type TStoreCesium = {
  viewer: Cesium.Viewer
  scene: Cesium.Scene
  camera: Cesium.Camera
  czmlDataSource: Cesium.CzmlDataSource
  accessToken: string
  tles: Ttle
  rsoParams: TRsoParams
  primarySatColor: Cesium.Color
  secondarySatColor: Cesium.Color
  apartColor: Cesium.Color
  closeColor: Cesium.Color

  isPairMode: boolean
  prevPid: string | null
  prevSid: string | null
}

export type TStateCesium = {
  viewer: Draft<Cesium.Viewer>
  scene: Draft<Cesium.Scene>
  camera: Draft<Cesium.Camera>
  czmlDataSource: Draft<Cesium.CzmlDataSource>
  accessToken: string
  tles: Ttle
  rsoParams: TRsoParams
  primarySatColor: Cesium.Color
  secondarySatColor: Cesium.Color
  apartColor: Cesium.Color
  closeColor: Cesium.Color

  isPairMode: boolean
  prevPid: string | null
  prevSid: string | null
  worker: Worker
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
  intervalUnitTime?: number
}

export type TdrawConjuctions = TargDrawConjuctions & {
  tles: Ttle
  rsoParams: TRsoParams
  initialTime: moment.Moment
}

export type TargDrawLcaConjuctions = {
  trajectory: string
  predictionEpochTime: string
  launchEpochTime: string
  trajectoryLength?: number
  lpdb: LPDBDataType[]
  intervalUnitTime?: number
}

export type TdrawLcaConjuctions = TargDrawLcaConjuctions & {
  tles: Ttle
  rsoParams: TRsoParams
  trajectoryCzml: czml
  endInterval: number
  duration: number
  initialTime: moment.Moment
  intervalUnitTime: number
}

export type TargDrawWc = {
  latitude: number
  longitude: number
  predictionEpochTime: string
  epochTime: string
  intervalUnitTime?: number
  wcdb: WCDBDataType[]
}

export type TDrawWc = {
  initialTime: moment.Moment
  tles: Ttle
  rsoParams: TRsoParams
  siteCzml: czml
  siteConeCzml: czml
  wcdb: WCDBDataType[]
  epochTime: string
  intervalUnitTime: number
}

export type TUpdateCzml<T> = TStateCesium & {
  initialTime: moment.Moment
  initialTimeISOString: string
  duration: number
  intervalUnitTime: number
  callback: (
    ds: Cesium.CzmlDataSource,
    rest: { initialTime: moment.Moment } & Omit<
      TUpdateCzml<T>,
      'initialTime' | 'initialTimeISOString' | 'duration' | 'intervalUnitTime' | 'callback'
    >
  ) => void | Promise<void>
} & T
