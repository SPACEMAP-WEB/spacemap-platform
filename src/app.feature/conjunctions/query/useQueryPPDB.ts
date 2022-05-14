import api from '@app.modules/api'
import { API_FAVORITE_CONJUCTIONS, API_PPDB } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import { PPDBResponseType, PPDBSearchParamsType } from '@app.modules/types/conjunctions'
import { useQuery } from 'react-query'

export const requestAPiGetPPDB = async (query: PPDBSearchParamsType) => {
  const response = await api.GET<null, PPDBResponseType>(API_PPDB + objectToURL(query))
  const result = response.data.data
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
  }
}

export const requestApiGetFavorite = async (query) => {
  const response = await api.GET<null, PPDBResponseType>(
    API_FAVORITE_CONJUCTIONS + objectToURL(query)
  )
  const result = response.data.data
  console.log(result)
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
  }
}

export const useQueryGetPPDB = ({ query, isConjunctionsClicked, toggle }) => {
  const queryKey = toggle === 0 ? API_PPDB : API_FAVORITE_CONJUCTIONS
  const apiMethod = toggle === 0 ? requestAPiGetPPDB : requestApiGetFavorite
  return useQuery([queryKey, query], () => apiMethod(query), {
    keepPreviousData: true,
    enabled: isConjunctionsClicked,
  })
}
