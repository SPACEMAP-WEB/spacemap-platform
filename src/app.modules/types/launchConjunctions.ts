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

export type LPDBResponseType = {
  message: string
  success: boolean
  data: LPDBResponseDataType[]
}

export type LPDBRequestType = {
  threshold: string
  trajectory: File
}
