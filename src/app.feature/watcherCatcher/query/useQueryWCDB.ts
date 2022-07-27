import api from '@app.modules/api'
import { API_WCDB } from '@app.modules/keyFactory'
import { DataResponseType } from '@app.modules/types'
import { useQuery } from 'react-query'
import { WCDBDetailDataType, WCDBResponseDataType } from '../types/watcherCatcher'

export const requestAPiGetWCDB = async () => {
  const response = await api.GET<null, DataResponseType<WCDBResponseDataType[]>>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_WCDB
  )
  return response.data
}

export const useQueryGetWCDB = (email: string) => {
  return useQuery([API_WCDB], () => requestAPiGetWCDB(), {
    keepPreviousData: true,
    enabled: !!email,
    refetchInterval: 60000,
    refetchOnMount: 'always',
  })
}

export const useQueryGetWCDBDetail = (id: string) => {
  return useQuery([API_WCDB, id], async () => {
    const response = await api.GET<null, DataResponseType<WCDBDetailDataType>>(
      process.env.SPACEMAP_PLATFORM_API_URI + API_WCDB + `/${id}`
    )
    return response.data.data
  })
}

export const useQueryGetWCDBDownload = (filePath: string) => {
  return useQuery(
    [API_WCDB, filePath],
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
    [API_WCDB, filePath],
    () => {
      return api.GET<string, string>(process.env.SPACEMAP_PLATFORM_API_URI + `/${filePath}`)
    },
    {
      enabled: !!filePath,
    }
  )
}
