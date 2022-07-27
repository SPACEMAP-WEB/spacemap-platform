export type ResponseDataType<T> = {
  message: string
  success: boolean
  data: T
}

export type LPDBResponseDataType = {
  _id: string
  email: string
  trajectoryPath: string
  predictionEpochTime: string
  launchEpochTime: string
  status: 'Pending' | 'Done' | string
  createdAt: string
  __v: number
}

export type LPDBDataType = {
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

export type LPDBTempDataType = {
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

export type LPDBDetailResponseDataType = {
  trajectoryPath: string
  predictionEpochTime: string
  launchEpochTime: string
  trajectoryLength: number
  lpdb: LPDBTempDataType[]
}

export type LPDBDetailResponseType = {
  message: string
  success: boolean
  data: LPDBDetailResponseDataType
}

export type LPDBRequestType = {
  threshold: string
  trajectory: File
}

export type LPDBPostResponseDataType = {
  taskId: string
}

export type LPDBPostResponseErrorType = {
  success: boolean
  message: string
}
