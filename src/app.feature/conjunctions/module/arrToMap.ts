import { FavoriteColumnType } from '@app.feature/favorites/types/favorite'


export const arrToMap = (arr: FavoriteColumnType[]): Map<string, FavoriteColumnType> => {
  return arr.reduce((map, obj) => {
    map.set(obj.noradId, obj)
    return map
  }, new Map<string, FavoriteColumnType>())
}
