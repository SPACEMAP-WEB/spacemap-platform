import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'
import {
  COLADBPostResponseDataType,
  COLADBRequestType,
} from '@app.feature/collisionAvoidance/types/collisionAvoidance'
import { useQueryClient } from 'react-query'
import { DataResponseType } from '@app.modules/types'

export const useMutationPostCOLADB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (requestForm: COLADBRequestType) => {
      const formData = new FormData()
      const { threshold, trajectory } = requestForm
      formData.append('threshold', threshold)
      formData.append('trajectory', trajectory)
      return api.POST<FormData, DataResponseType<COLADBPostResponseDataType>>({
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

export const useMutationDeleteCOLADB = () => {
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
