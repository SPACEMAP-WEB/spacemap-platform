import ModalWrapper from '@app.components/common/ModalWrapper'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { closeModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const SignInModal = () => {
  const { visible } = useSelector((state: RootState) => state.modal)
  const modalEl = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleClose = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault()
    dispatch(closeModal())
  }

  const handleCloseExternalClickModal = (event: MouseEvent) => {
    if (visible && modalEl && !modalEl?.current?.contains(event.target as Node))
      dispatch(closeModal())
  }

  return (
    <>
      {visible && (
        <ModalWrapper onClick={handleCloseExternalClickModal}>
          <Modal ref={modalEl} className="modal-content-container">
            <img src="/svg/close-black.svg" className="modal-close" onClick={handleClose} />
            <button className="google-login">
              <img src="/image/icon/ico-google.png" />
              <p>SignIn with Google</p>
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
  width: 26rem;
  height: 10rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 25px;
    cursor: pointer;
  }
  .google-login {
    width: 300px;
    padding: 5px 20px;
    background-color: white;
    border: 3px solid black;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      padding-right: 5px;
    }
  }
`
