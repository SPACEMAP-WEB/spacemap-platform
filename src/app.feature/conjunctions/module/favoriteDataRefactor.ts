/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.feature/conjunctions/types/conjunctions'

export const favoriteDataRefactor = (data: FavoriteDataType): FavoriteColumnType[] => {
  if (!Object.keys(data).length) return []
  const { interestedArray } = data
  let refactorArr = []
  for (let i = 0; i < interestedArray.length; i++) {
    refactorArr.push({
      noradId: interestedArray[i].id,
      satName: interestedArray[i].name,
      isInterested: true,
    })
  }
  return refactorArr
}

export const favoriteFindDataRefactor = (data: FavoriteFindDataType[]): FavoriteColumnType[] => {
  if (!data.length) return []
  return data.map((sat) => ({ noradId: sat.id, satName: sat.name, isInterested: sat.isInterested }))
}
