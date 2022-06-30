import api from '@app.modules/api'
import { API_FAVORITE } from '@app.modules/keyFactory'
import { useMutation } from 'react-query'

export const usePostMutationFavorite = () => {
  // const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      await api.POST({ url: API_FAVORITE + `/${id}` })
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

export const useDeleteMutationFavorite = () => {
  // const queryClient = useQueryClient()
  return useMutation(
    async (id: string) => {
      // console.log('delete')
      await api.DELETE({ url: API_FAVORITE + `/${id}` })
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
