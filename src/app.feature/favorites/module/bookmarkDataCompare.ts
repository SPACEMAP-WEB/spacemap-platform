
import { FavoriteColumnType } from '../types/favorite'
import { arrToMap } from './arrToMap'

const compareData = ({
  target,
  update,
}: {
  target: FavoriteColumnType[]
  update: FavoriteColumnType[]
}) => {
  const bookmarkMap: Map<string, FavoriteColumnType> = arrToMap(target)
  return update.filter((data) => !bookmarkMap.has(data.noradId))
}

export const updateBookmarkData = (
  prevData: FavoriteColumnType[],
  newData: FavoriteColumnType[]
) => {
  const prevLength = prevData.length
  const newLength = newData.length

  if (prevLength <= newLength) {
    return {
      state: 'post',
      data: compareData({ target: prevData, update: newData }),
    }
  } else {
    return {
      state: 'delete',
      data: compareData({ target: newData, update: prevData }),
    }
  }
}
