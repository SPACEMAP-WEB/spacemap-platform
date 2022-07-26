import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'
import {
  LPDBPostResponseDataType,
  LPDBRequestType,
  ResponseDataType,
} from '@app.feature/launchConjunctions/types/launchConjunctions'
import { useQueryClient } from 'react-query'

export const useMutationPostLPDB = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (requestForm: LPDBRequestType) => {
      const formData = new FormData()
      const { threshold, trajectory } = requestForm
      formData.append('threshold', threshold)
      formData.append('trajectory', trajectory)
      return api.POST<FormData, ResponseDataType<LPDBPostResponseDataType>>({
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

export const useMutationDeleteLPDB = () => {
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
