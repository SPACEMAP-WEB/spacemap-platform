import { ModalType } from '@app.modules/types/modal'
import { createSlice } from '@reduxjs/toolkit'

type TModal = {
  modalVisible: boolean
  modalType: ModalType
}

const initialState: TModal = {
  modalVisible: false,
  modalType: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload: { type } }: { payload: { type: ModalType } }) => {
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
