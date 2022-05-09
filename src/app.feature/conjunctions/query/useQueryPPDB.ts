import { useInfiniteQuery } from 'react-query'
import api from '@app.modules/api'
import { API_PPDB } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import { PPDBResponseType, PPDBSearchParamsType } from '@app.modules/types/conjunctions'

export const requestAPiGetPPDB = async (query: PPDBSearchParamsType) => {
  const response = await api.GET<null, PPDBResponseType>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_PPDB + objectToURL(query)
  )
  const result = response.data.data
  return {
    result: result.conjunctions,
    totalCount: result.totalcount,
    nextPage: query.page + 1,
    isLast: query.page === Math.ceil(result.totalcount / query.limit),
  }
}

export const useQueryGetInfinitePPDB = ({ query, isConjunctionsClicked }) => {
  return useInfiniteQuery([API_PPDB], () => requestAPiGetPPDB(query), {
    keepPreviousData: true,
    enabled: isConjunctionsClicked,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
  })
}
