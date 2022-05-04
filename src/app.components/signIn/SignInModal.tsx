import ModalWrapper from '@app.components/common/ModalWrapper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { closeModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const SignInModal = () => {
  const { visible } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const handleClose = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault()
    dispatch(closeModal())
  }

  return (
    <>
      {visible && (
        <ModalWrapper>
          <Modal className="modal-content-container">
            <img src="/svg/close-black.svg" className="modal-close" onClick={handleClose} />
            <button className="google-login">
              <img src="/image/icon/ico-google.png" />
              <span>SignIn with Google</span>
            </button>
          </Modal>
        </ModalWrapper>
      )}
    </>
  )
}

export default SignInModal

const Modal = styled.div`
  position: relative;
  background-color: white;
  width: 30rem;
  height: 15rem;
  padding: 5rem;
  border-radius: 0.5rem;
  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 25px;
    cursor: pointer;
  }
`
