export type WCDBResponseDataType = {
  _id: string
  email: string
  trajectoryPath: string
  predictionEpochTime: string
  launchEpochTime: string
  status: 'Pending' | 'Done' | string
  createdAt: string
  __v: number
}

export type WCDBDataType = {
  index: number
  id: string
  primary: number | string
  secondary: number | string
  dca: number
  start: string
  tca: string
  end: string
  probability: string
  'tca/dca': string
}

export type WCDBTempDataType = {
  createdAt: string
  dca: number
  pName: string
  pid: number
  sName: string
  sid: number
  standardTime: string
  tcaEndTime: string
  tcaStartTime: string
  tcaTime: string
  __v: number
  _id: string
  placeId: string
}

export type WCDBDetailResponseDataType = {
  latitude: string
  longitude: string
  epochTime: string
  predictionEpochTime: string
  wcdb: WCDBTempDataType[]
}

export type WCDBDetailResponseType = {
  message: string
  success: boolean
  data: WCDBDetailResponseDataType
}

export type WCDBResponseType = {
  message: string
  success: boolean
  data: WCDBResponseDataType[]
}

export type WCDBRequestType = {
  altitude: number
  fieldOfView: number
  latitude: number
  longitude: number
  epochTime: string
}
