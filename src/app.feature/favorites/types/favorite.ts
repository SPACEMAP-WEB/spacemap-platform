export type FavoriteDataType = {
  _id?: string
  email?: string
  __v?: number
  interestedArray: { id: number; name: string }[]
}

export type FavoriteColumnType = {
  noradId: string
  satName: string
  isInterested: boolean
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
