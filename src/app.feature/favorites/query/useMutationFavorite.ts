import api from '@app.modules/api'
import { API_FAVORITE } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'

export const usePostMutationFavorite = () => {
  return useMutation(
    async (id: string) => {
      const res = await api.POST({ url: API_FAVORITE + `/${id}` })
      return res.data
    },
    {
      onError: (error) => {
        console.error(error)
      },
    }
  )
}

export const useDeleteMutationFavorite = () => {
  // const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      const res = await api.DELETE({ url: API_FAVORITE + `/${id}` })
      return res.data
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries([API_FAVORITE])
      },
      onError: (error) => {
        console.error(error)
      },
    }
  )
}

export const usePostMutationFavoriteMailService = () => {
  return useMutation(
    async (isMailServiceSelected: boolean) => {
      const res = await api.POST({
        url: API_FAVORITE + `/settings/subscribe?subscribe=${isMailServiceSelected}`,
      })
      return res.data
    },
    {
      onError: (error) => {
        console.error(error)
      },
    }
  )
}
