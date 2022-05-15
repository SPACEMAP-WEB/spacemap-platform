/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'

export const favoriteDataRefactor = (data: FavoriteDataType): FavoriteColumnType[] => {
  if (!data) return []
  if (!Object.keys(data).length) return []
  const { interestedArray } = data
  const refactorArr = interestedArray.map((sat) => ({
    noradId: String(sat.id),
    satName: sat.name,
    isInterested: true,
  }))
  return refactorArr
}

export const favoriteFindDataRefactor = (data: FavoriteFindDataType[]): FavoriteColumnType[] => {
  if (!data.length) return []
  return data.map((sat) => ({ noradId: sat.id, satName: sat.name, isInterested: sat.isInterested }))
}
