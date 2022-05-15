import api from '@app.modules/api'
import { API_FAVORITE, API_FAVORITE_FIND } from '@app.modules/keyFactory'
import { FavoriteFindResponseType, FavoriteResponseType } from '@app.modules/types/conjunctions'
import { objectToURL } from '@app.modules/util'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'

const requestApiFavorite = (email, queryParams) => {
  return useQuery(
    [API_FAVORITE, email],
    async () => {
      const res = await api.GET<null, FavoriteResponseType>(API_FAVORITE + objectToURL(queryParams))
      return res.data.data
    },
    {
      enabled: !!email,
      keepPreviousData: true,
      staleTime: Infinity,
    }
  )
}

const requestApiFindFavorite = (inputValue, email, queryParams) => {
  return useQuery(
    [API_FAVORITE_FIND, email, inputValue],
    async () => {
      const res = await api.GET<null, FavoriteFindResponseType>(
        API_FAVORITE_FIND + `/${inputValue}` + objectToURL(queryParams)
      )
      return res.data.data
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  )
}

export const useQueryFavorite = (inputValue, queryParams) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)

  return inputValue
    ? requestApiFindFavorite(inputValue, email, queryParams)
    : requestApiFavorite(email, queryParams)
}
