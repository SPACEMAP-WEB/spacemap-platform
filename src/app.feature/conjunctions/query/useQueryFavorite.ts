import api from '@app.modules/api'
import { API_FAVORITE } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'

export const useQueryFavorite = () => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)
  return useQuery([API_FAVORITE, email], async () => {
    const res = await api.GET(API_FAVORITE)
    console.log(res)
    return res
  })
}
