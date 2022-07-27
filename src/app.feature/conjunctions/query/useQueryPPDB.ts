import api from '@app.modules/api'
import { API_FAVORITE_CONJUNCTIONS, API_PPDB } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import {
  PPDBResponseDataType,
  PPDBSearchParamsType,
} from '@app.feature/conjunctions/types/conjunctions'
import { useQuery } from 'react-query'
import { DataResponseType } from '@app.modules/types'

export const requestAPiGetPPDB = async (query: PPDBSearchParamsType) => {
  const response = await api.GET<null, DataResponseType<PPDBResponseDataType>>(
    API_PPDB + objectToURL(query)
  )
  const result = response.data.data
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
  }
}

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

export const useQueryGetPPDB = ({ query, isConjunctionsClicked }) => {
  const queryKey = API_PPDB
  const apiMethod = requestAPiGetPPDB
  return useQuery([queryKey, query], () => apiMethod(query), {
    keepPreviousData: true,
    enabled: isConjunctionsClicked,
  })
}
