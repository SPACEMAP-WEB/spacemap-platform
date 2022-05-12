/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'

export const favoriteDataRefactor = (data: FavoriteDataType): FavoriteColumnType[] => {
  if (!Object.keys(data).length) return []
}

export const favoriteFindDataRefactor = (data: FavoriteFindDataType[]): FavoriteColumnType[] => {
  if (!data.length) return []
  return data.map((sat) => ({ noradId: sat.id, satName: sat.name }))
}
