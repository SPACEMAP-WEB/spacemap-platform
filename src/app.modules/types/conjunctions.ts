export type ResponseType = {
  message: string
  success: boolean
}

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

export type PPDBResponseType = ResponseType & {
  data: PPDBResponseDataType
}

export type PPDBTableColumnType = {
  primary: number
  secondary: number
  dca: number
  tca: string
}

export type PPDBQueryKeyType = 'sort' | 'dec' | 'satellite'
export type SortType = 'tcaTime' | 'dca' | 'probability'

// use it when it is necessary
export type QueryValueType = {
  sort?: SortType
  dec: '-'
  satelite: number | string
}

export type PPDBSearchParamsType = {
  limit: number
  page: number
  sort?: SortType
  dec?: '-'
  satellite?: number | string
}

export type FavoriteDataType = {
  _id?: string
  email?: string
  __v?: number
  satellitesIds?: number[]
  satellitesNames?: string[]
}

export type FavoriteColumnType = {
  noradId: string
  satName: string
}

export type FavoriteFindDataType = {
  id: string
  name: string
  isInterested: boolean
}

export type FavoriteResponseType = ResponseType & {
  data: FavoriteDataType
}

export type FavoriteFindResponseType = ResponseType & {
  data: FavoriteFindDataType[]
}
