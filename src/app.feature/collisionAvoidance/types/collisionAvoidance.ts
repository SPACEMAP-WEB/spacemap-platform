export type COLADBResponseDataType = {
  _id: string
  email: string
  trajectoryPath: string
  predictionEpochTime: string
  launchEpochTime: string
  status: 'Pending' | 'Done' | string
  createdAt: string
  __v: number
}

export type COLADBDataType = {
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

export type COLADBTempDataType = {
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

export type COLADBDetailResponseDataType = {
  trajectoryPath: string
  predictionEpochTime: string
  launchEpochTime: string
  trajectoryLength: number
  coladb: COLADBTempDataType[]
}

export type COLADBRequestType = {
  threshold: string
  trajectory: File
}

export type COLADBPostResponseDataType = {
  taskId: string
}
