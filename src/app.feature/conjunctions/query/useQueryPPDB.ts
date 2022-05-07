import React from 'react'
import { useQuery } from 'react-query'
import api from '@app.modules/api'
import { API_PPDB } from '@app.modules/keyFactory'
import { objectToURL } from '@app.modules/util'
import { PPDBSearchParamsType } from '@app.modules/types/conjunctions'

export const requestAPiGetPPDB = async (query: PPDBSearchParamsType) => {
  const response = await api.GET(`http://localhost:4033/ppdbs/conjunctions` + objectToURL(query))
  return response.data
}

export const useQueryGetPPDB = (query) => {
  return useQuery([API_PPDB], () => requestAPiGetPPDB(query), {
    keepPreviousData: true,
  })
}
