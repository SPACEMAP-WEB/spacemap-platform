import { modalType } from '@app.modules/types/modal'
import { createSlice } from '@reduxjs/toolkit'

type TModal = {
  modalVisible: boolean
  modalType: modalType
}

const initialState: TModal = {
  modalVisible: false,
  modalType: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload: { type } }: { payload: { type: modalType } }) => {
      state.modalVisible = true
      state.modalType = type
    },
    closeModal: (state) => {
      state.modalVisible = false
      state.modalType = null
    },
  },
})

export const { setModal, closeModal } = modalSlice.actions
