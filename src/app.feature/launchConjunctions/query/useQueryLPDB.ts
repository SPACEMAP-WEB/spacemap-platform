import {
  LPDBDetailResponseType,
  LPDBResponseDataType,
  ResponseDataType,
} from '@app.feature/launchConjunctions/types/launchConjunctions'
import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useQuery } from 'react-query'

export const requestAPiGetLPDB = async () => {
  const response = await api.GET<null, ResponseDataType<LPDBResponseDataType[]>>(
    process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB
  )
  return response.data
}

export const useQueryGetLPDB = (email) => {
  return useQuery([API_LPDB], () => requestAPiGetLPDB(), {
    keepPreviousData: true,
    enabled: !!email,
    refetchInterval: 60000,
    refetchOnMount: 'always',
  })
}

export const useQueryGetLPDBDetail = (id: string) => {
  return useQuery([API_LPDB, id], async () => {
    try {
      const response = await api.GET<null, LPDBDetailResponseType>(
        process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}`
      )
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  })
}

export const useQueryGetLPDBSampleDownload = () => {
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
