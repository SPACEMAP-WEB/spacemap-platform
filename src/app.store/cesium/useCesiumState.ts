import { useSelector } from 'react-redux'
import { RootState } from '../config/configureStore'

export const useCesiumState = () => {
  const state = useSelector((state: RootState) => state.viewer)
  return state
}
