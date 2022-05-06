import { createSlice } from '@reduxjs/toolkit'

const modalType = ['LOGIN', 'LAUNCHCONJUCTIONS']

type modalType = {
  visible: boolean
  type: {
    sign: { LOGIN: boolean }
    conjunction: { CONJUCTIONS: boolean; LAUNCHCONJUCTIONS: boolean }
  }
}

const initialState: modalType = {
  visible: false,
  type: { sign: { LOGIN: false }, conjunction: { CONJUCTIONS: false, LAUNCHCONJUCTIONS: false } },
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload: { type } }) => {
      state.visible = true
      state.type = { ...state.type }
    },
    closeModal: (state) => {
      state.visible = false
      state.type = { ...state.type }
    },
  },
})

export const { setModal, closeModal } = modalSlice.actions
