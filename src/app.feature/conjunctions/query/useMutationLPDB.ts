import api from '@app.modules/api'
import { API_LPDB } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'
import { LPDBRequestType, LPDBResponseType } from '@app.modules/types/launchConjunctions'

export const useMutationPostLPDB = () => {
  return useMutation((requestForm: LPDBRequestType) => {
    const formData = new FormData()
    const { threshold, trajectory } = requestForm
    formData.append('threshold', threshold)
    formData.append('trajectory', trajectory)
    return api.POST({
      url: process.env.SPACEMAP_PLATFORM_API_URI + API_LPDB,
      data: formData,
    })
  })
}
