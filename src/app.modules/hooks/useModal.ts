import { ModalType } from '@app.modules/types/modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { closeModal, setModal } from 'src/app.store/modalStore/store.modalApp'

export const useModal = (type: ModalType) => {
  const dispatch = useDispatch()
  const { modalType, modalVisible } = useSelector((state: RootState) => state.modal)

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleSetModal = () => {
    dispatch(setModal({ type }))
  }

  const isVisible = modalType === type && modalVisible

  return { modalType, modalVisible, handleCloseModal, handleSetModal, isVisible }
}
