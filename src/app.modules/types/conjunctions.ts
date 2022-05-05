export type PPDBDataType = {
  index: number
  primary: number
  secondary: number
  dca: number
  start: string
  tca: string
  end: string
  probability: string
}

export type PPDBTableColumnType = {
  primary: number
  secondary: number
  dca: number
  tca: string
}

export type PPDBSearchParamsType = {
  limit: number
  page: number
  sort: 'tcaTime' | 'dca' | 'probability'
  dec: '-'
  satelite: number | string
}
