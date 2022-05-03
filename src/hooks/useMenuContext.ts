import { useContext } from 'react'
import { MenuContext } from 'src/providers/MenuProvider'

export const useMenuContext = () => {
  const { state, dispatch } = useContext(MenuContext)
  return { state, dispatch }
}
