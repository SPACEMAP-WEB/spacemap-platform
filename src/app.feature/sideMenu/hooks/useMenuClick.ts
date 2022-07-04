import { useModal } from '@app.modules/hooks/useModal'
import { ModalType } from '@app.modules/types/modal'
import { unwrapResult } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'src/app.store/config/configureStore'
import { requestCheckLogin } from 'src/app.store/loginStore/loginUser'
import { setModal } from 'src/app.store/modalStore/store.modalApp'

const useMenuClick = () => {
  const dispatch = useAppDispatch()
  const { login } = useSelector((state: RootState) => state.login)
  const { modalVisible, modalType, handleCloseModal } = useModal(null)

  const checkModalVisible = (type: ModalType) =>
    modalVisible && modalType === type ? handleCloseModal() : dispatch(setModal({ type }))

  const handleMenuClick = useCallback((type: ModalType) => {
    checkModalVisible(type)
  }, [])

  const handleLoginMenuClick = useCallback((type: ModalType) => {
    dispatch(requestCheckLogin())
      .then(unwrapResult)
      .then(() => login && checkModalVisible(type))
      .catch(() => checkModalVisible(type))
  }, [])

  return { handleMenuClick, handleLoginMenuClick }
}

export default useMenuClick
