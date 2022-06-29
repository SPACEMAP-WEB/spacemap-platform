import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'
import { WCDBRequestType } from '../types/watcherCatcher'
import { useQueryClient } from 'react-query'

export const useMutationPostWCDB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestForm: WCDBRequestType) => {
      const formData = new FormData()
      const { threshold, trajectory } = requestForm
      formData.append('threshold', threshold)
      formData.append('trajectory', trajectory)
      return api.POST({
        url: process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB,
        data: formData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API_LPDB])
      },
    }
  )
}

export const useMutationDeleteWCDB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => {
      return api.DELETE({ url: process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB + `/${id}` })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API_LPDB])
      },
    }
  )
}
