import { createSlice } from '@reduxjs/toolkit'

type modalType = {
  visible: boolean
}

const initialState: modalType = {
  visible: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => {
      state.visible = !state.visible
    },
  },
})
