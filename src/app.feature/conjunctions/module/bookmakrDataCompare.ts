import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import { arrToMap } from './arrToMap'

type TCompare = {
  target: FavoriteColumnType[]
  update: FavoriteColumnType[]
}

const compareData = ({ target, update }: TCompare) => {
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
