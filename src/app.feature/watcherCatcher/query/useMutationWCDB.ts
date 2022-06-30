import api from '@app.modules/api'
import { API_WCDB } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'
import { WCDBRequestType } from '../types/watcherCatcher'
import { useQueryClient } from 'react-query'

export const useMutationPostWCDB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestBody: WCDBRequestType) => {
      return api.POST({
        url: process.env.SPACEMAP_PLATFORM_API_URI + API_WCDB,
        data: requestBody,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API_WCDB])
      },
    }
  )
}

export const useMutationDeleteWCDB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => {
      return api.DELETE({ url: process.env.SPACEMAP_PLATFORM_API_URI + API_WCDB + `/${id}` })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API_WCDB])
      },
    }
  )
}
