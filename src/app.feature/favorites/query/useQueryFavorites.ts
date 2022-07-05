
import { API_FAVORITE_CONJUNCTIONS } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import {
  PPDBResponseType,
} from '@app.feature/conjunctions/types/conjunctions'
import api from '@app.modules/api'
import { API_FAVORITE, API_FAVORITE_FIND } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { FavoriteFindResponseType, FavoriteResponseType } from '../../favorites/types/favorite'


export const requestApiGetFavorite = async (query) => {
  const response = await api.GET<null, PPDBResponseType>(
    API_FAVORITE_CONJUNCTIONS + objectToURL(query)
  )
  const result = response.data.data
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
  }
}

export const useQueryGetFavoritePPDB = ({ query, isConjunctionsClicked }) => {
  const queryKey = API_FAVORITE_CONJUNCTIONS
  const apiMethod = requestApiGetFavorite
  return useQuery([queryKey, query], () => apiMethod(query), {
    keepPreviousData: true,
    enabled: isConjunctionsClicked,
  })
}


const requestApiFavorite = async () => {
  const res = await api.GET<null, FavoriteResponseType>(API_FAVORITE)
  return res.data.data
}

const requestApiSearchFavorite = async (inputValue) => {
  const res = await api.GET<null, FavoriteFindResponseType>(API_FAVORITE_FIND + `/${inputValue}`)
  return res.data.data
}

// 구독하고 있는 위성 데이터 GET
export const useQueryFavorite = (inputValue) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)
  return useQuery([API_FAVORITE], () => requestApiFavorite(), {
    enabled: !!email,
    keepPreviousData: true,
  })
}

// 구독하고 싶은 위성 데이터 찾기
export const useQuerySearchFavorite = (inputValue) => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.login)

  return useQuery([API_FAVORITE_FIND, inputValue], () => requestApiSearchFavorite(inputValue), {
    enabled: !!email && !!inputValue.trim(),
    keepPreviousData: true,
  })
}
