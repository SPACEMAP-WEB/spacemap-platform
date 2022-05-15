/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'

export const favoriteDataRefactor = (data: FavoriteDataType): FavoriteColumnType[] => {
  if (!Object.keys(data).length) return []
  const { satellitesIds, satellitesNames } = data
  let refactorArr = []
  for (let i = 0; i < satellitesIds.length; i++) {
    refactorArr.push({ noradId: satellitesIds[i], satName: satellitesNames[i], isInterested: true })
  }
  return refactorArr
}

export const favoriteFindDataRefactor = (data: FavoriteFindDataType[]): FavoriteColumnType[] => {
  if (!data.length) return []
  return data.map((sat) => ({ noradId: sat.id, satName: sat.name, isInterested: sat.isInterested }))
}
