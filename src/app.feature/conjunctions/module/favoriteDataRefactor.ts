import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'

export const favoriteDataRefactor = (
  data: FavoriteDataType | FavoriteFindDataType
): FavoriteColumnType[] => {
  if (!Object.keys(data).length) return []
}

export const favoriteFindDataRefactor = (
  data: FavoriteDataType | FavoriteFindDataType
): FavoriteColumnType[] => {
  return []
}
