import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'
import { WCDBDetailResponseType, WCDBResponseType } from '../types/watcherCatcher'

export const requestAPiGetWCDB = async () => {
  const response = await api.GET<null, WCDBResponseType>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB
  )
  return response.data
}

export const useQueryGetWCDB = (email) => {
  return useQuery([API_LPDB], () => requestAPiGetWCDB(), {
    keepPreviousData: true,
    enabled: !!email,
    refetchInterval: 60000,
    refetchOnMount: 'always',
  })
}

export const useQueryGetWCDBDetail = (id: string) => {
  return useQuery([API_LPDB, id], async () => {
    const response = await api.GET<null, WCDBDetailResponseType>(
      process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}`
    )
    return response.data.data
  })
}

export const useQueryGetWCDBDownload = (filePath: string) => {
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
  return useQuery(
    [API_LPDB, filePath],
    () => {
      return api.GET<string, string>(process.env.SPACEMAP_PLATFORM_API_URI + `/${filePath}`)
    },
    {
      enabled: !!filePath,
    }
  )
}
