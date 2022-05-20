import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { LPDBDetailResponseDataType, LPDBResponseType } from '@app.modules/types/launchConjunctions'

export const requestAPiGetLPDB = async () => {
  const response = await api.GET<null, LPDBResponseType>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB
  )
  return response.data
}

export const useQueryGetLPDB = (email) => {
  return useQuery([API_LPDB], () => requestAPiGetLPDB(), {
    keepPreviousData: true,
    enabled: !!email,
  })
}

export const useQueryGetLPDBDetail = (id: string) => {
  return useQuery([API_LPDB, id], () => {
    return api.GET<null, LPDBDetailResponseDataType>(
      process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}`
    )
  })
}

export const useQueryGetLPDBDownload = (filePath: string) => {
  return useQuery(
    [API_LPDB, filePath],
    () => {
      return api.GET<string, string>(process.env.SPACEMAP_PLATFORM_API_URI + `/${filePath}`)
    },
    {
      enabled: false,
    }
  )
}

export const useQueryGetTrajectory = (filePath: string) => {
  return useQuery([API_LPDB, filePath], () => {
    return api.GET<string, string>(process.env.SPACEMAP_PLATFORM_API_URI + `/${filePath}`)
  })
}
