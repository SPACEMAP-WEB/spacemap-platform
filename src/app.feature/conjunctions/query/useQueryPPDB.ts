import api from '@app.modules/api'
import { API_PPDB } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import { PPDBResponseType, PPDBSearchParamsType } from '@app.modules/types/conjunctions'
import { useQuery } from 'react-query'

export const requestAPiGetPPDB = async (query: PPDBSearchParamsType) => {
  const response = await api.GET<null, PPDBResponseType>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_PPDB + objectToURL(query)
  )
  const result = response.data.data
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
  }
}

export const useQueryGetPPDB = ({ query, isConjunctionsClicked }) => {
  return useQuery([API_PPDB, query], () => requestAPiGetPPDB(query), {
    keepPreviousData: true,
    enabled: isConjunctionsClicked,
  })
}
