import api from '@app.modules/api'
import { API_FAVORITE } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'

export const useQueryFavorite = () => {
  return useQuery([API_FAVORITE], async () => {
    const res = await api.GET(API_FAVORITE)
    return res
  })
}
