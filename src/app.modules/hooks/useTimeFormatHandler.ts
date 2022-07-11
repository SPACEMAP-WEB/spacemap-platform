import { TimeFormatType } from '@app.modules/types/time'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { setTimeFormat } from 'src/app.store/timeFormatStore/store.timeFormatApp'

export const useTimeFormatHandler = () => {
  const dispatch = useDispatch()
  const { timeFormat } = useSelector((state: RootState) => state.timeFormat)

  const handleSetTimeFormat = (time: TimeFormatType) => {
    dispatch(setTimeFormat({ timeFormat: time }))
  }

  return { timeFormat, handleSetTimeFormat }
}
