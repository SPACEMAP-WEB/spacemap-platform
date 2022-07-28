import {
  COLADBDetailResponseDataType,
  COLADBResponseDataType,
} from '@app.feature/collisionAvoidance/types/collisionAvoidance'
import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { DataResponseType } from '@app.modules/types'
import { useQuery } from 'react-query'

export const requestAPiGetCOLADB = async () => {
  const response = await api.GET<null, DataResponseType<COLADBResponseDataType[]>>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB
  )
  return response.data
}

export const useQueryGetCOLADB = (email) => {
  return useQuery([API_LPDB], () => requestAPiGetCOLADB(), {
    keepPreviousData: true,
    enabled: !!email,
    refetchInterval: 60000,
    refetchOnMount: 'always',
  })
}

export const useQueryGetCOLADBDetail = (id: string) => {
  return useQuery([API_LPDB, id], async () => {
    try {
      const response = await api.GET<null, DataResponseType<COLADBDetailResponseDataType>>(
        process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}`
      )
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  })
}

export const useQueryGetCOLADBSampleDownload = () => {
  return useQuery(
    [API_LPDB, 'download'],
    () => {
      return api.GET<null, string>(
        'https://platformapi.spacemap42.com/public/samples/bocachica_J2000_converted.txt'
      )
    },
    {
      enabled: false,
    }
  )
}

export const useQueryGetCOLADBDownload = (filePath: string) => {
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
      return api.GET<string, string>(`${filePath}`)
    },
    {
      enabled: !!filePath,
    }
  )
}
