import api from '@app.modules/api'
import { API_FAVORITE, API_FAVORITE_FIND } from '@app.modules/keyFactory'
import {
  FavoriteFindResponseType,
  FavoriteResponseType,
} from '@app.feature/conjunctions/types/conjunctions'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'

const requestApiFavorite = async () => {
  const res = await api.GET<null, FavoriteResponseType>(API_FAVORITE)
  return res.data.data
}

const requestApiFindFavorite = async (inputValue) => {
  const res = await api.GET<null, FavoriteFindResponseType>(API_FAVORITE_FIND + `/${inputValue}`)
  return res.data.data
}

export const useQueryFavorite = (inputValue) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)
  return useQuery([API_FAVORITE], () => requestApiFavorite(), {
    enabled: !!email,
    keepPreviousData: true,
  })
}

export const useQueryFindFavorite = (inputValue) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)

  return useQuery([API_FAVORITE_FIND, inputValue], () => requestApiFindFavorite(inputValue), {
    enabled: !!email && !!inputValue.trim(),
    keepPreviousData: true,
  })
}
