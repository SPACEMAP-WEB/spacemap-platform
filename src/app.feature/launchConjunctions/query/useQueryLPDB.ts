import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { LPDBResponseType } from '@app.modules/types/launchConjunctions'

export const requestAPiGetLPDB = async () => {
  const response = await api.GET<null, LPDBResponseType>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB
  )

  return response.data
}

export const useQueryGetLPDB = () => {
  return useQuery([API_LPDB], () => requestAPiGetLPDB(), {
    keepPreviousData: true,
  })
}

export const useQueryGetLPDBDetail = (id: string) => {
  return useQuery([API_LPDB, id], () => {
    return api.GET(process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}`)
  })
}
