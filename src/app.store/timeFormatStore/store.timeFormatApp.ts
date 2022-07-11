import { TimeFormatType } from '@app.modules/types/time'
import { createSlice } from '@reduxjs/toolkit'

type TimeStateType = {
  timeFormat: TimeFormatType
}

const initialState: TimeStateType = {
  timeFormat: 'UTC',
}

export const timeFormatSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setTimeFormat: (
      state,
      { payload: { timeFormat } }: { payload: { timeFormat: TimeFormatType } }
    ) => {
      state.timeFormat = timeFormat
    },
  },
})

export const { setTimeFormat } = timeFormatSlice.actions
