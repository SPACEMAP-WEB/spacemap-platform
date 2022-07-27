export type PPDBDataType = {
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

export type ConjunctionsDataType = {
  createdAt: string
  dca: number
  pName: string
  pid: number
  probability: string
  sName: string
  sid: number
  standardTime: string
  tcaEndTime: string
  tcaStartTime: string
  tcaTime: string
  __v: number
  _id: string
}

export type PPDBResponseDataType = {
  totalcount: number
  conjunctions: ConjunctionsDataType[]
}

export type PPDBQueryKeyType = 'sort' | 'dec' | 'satellite'
export type SortType = 'tcaTime' | 'dca' | 'probability'

export type PPDBSearchParamsType = {
  limit: number
  page: number
  sort?: SortType
  dec?: '-'
  id?: string
  satellite?: number | string
}
