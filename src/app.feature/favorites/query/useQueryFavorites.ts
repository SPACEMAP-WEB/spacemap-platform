import { API_FAVORITE_CONJUNCTIONS } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import { PPDBResponseDataType } from '@app.feature/conjunctions/types/conjunctions'
import api from '@app.modules/api'
import { API_FAVORITE, API_FAVORITE_FIND } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { FavoriteDataType, FavoriteFindDataType } from '../../favorites/types/favorite'
import { DataResponseType } from '@app.modules/types'

export const requestApiGetFavorite = async (query) => {
  const response = await api.GET<null, DataResponseType<PPDBResponseDataType>>(
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
  const res = await api.GET<null, DataResponseType<FavoriteDataType>>(API_FAVORITE)
  return res.data.data
}

const requestApiSearchFavorite = async (inputValue) => {
  const res = await api.GET<null, DataResponseType<FavoriteFindDataType[]>>(
    API_FAVORITE_FIND + `/${inputValue}`
  )
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
