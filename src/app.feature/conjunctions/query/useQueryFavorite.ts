import api from '@app.modules/api'
import { API_FAVORITE, API_FAVORITE_FIND } from '@app.modules/keyFactory'
import { FavoriteFindResponseType, FavoriteResponseType } from '@app.modules/types/conjunctions'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'

const requestApiFavorite = (email) => {
  return useQuery(
    [API_FAVORITE, email],
    async () => {
      const res = await api.GET<null, FavoriteResponseType>(API_FAVORITE)
      return res.data.data
    },
    {
      enabled: !!email,
      keepPreviousData: true,
    }
  )
}

const requestApiFindFavorite = (inputValue, email) => {
  return useQuery(
    [API_FAVORITE_FIND, email, inputValue],
    async () => {
      const res = await api.GET<null, FavoriteFindResponseType>(
        API_FAVORITE_FIND + `/${inputValue}`
      )
      return res.data.data
    },
    {
      keepPreviousData: true,
    }
  )
}

export const useQueryFavorite = (inputValue) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)

  return inputValue ? requestApiFindFavorite(inputValue, email) : requestApiFavorite(email)
}
