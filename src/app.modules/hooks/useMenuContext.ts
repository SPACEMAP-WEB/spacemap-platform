import { useContext } from 'react'
import { MenuContext } from '@app.modules/providers/MenuProvider'

export const useMenuContext = () => {
  const { state, dispatch } = useContext(MenuContext)
  return { state, dispatch }
}
