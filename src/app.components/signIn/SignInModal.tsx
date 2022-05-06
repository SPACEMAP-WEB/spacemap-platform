import ModalWrapper from '@app.components/common/ModalWrapper'
import { useRouter } from 'next/router'
import React, { MouseEvent, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { closeModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const SignInModal = () => {
  const router = useRouter()
  const { visible, type } = useSelector((state: RootState) => state.modal)
  const modalEl = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleClose = (event: React.MouseEvent<HTMLImageElement>) => {
    dispatch(closeModal())
  }

  const handleCloseExternalClickModal = (event: MouseEvent<HTMLElement>) => {
    if (visible && !modalEl?.current?.contains(event.target as Node)) dispatch(closeModal())
  }

  const handleClickLogin = (sns: string) => {
    router.push('http://localhost:4033/oauth/google')
  }

  return (
    <>
      {type === 'LOGIN' && visible && (
        <ModalWrapper onClick={handleCloseExternalClickModal}>
          <Modal ref={modalEl}>
            <img src="/svg/close-black.svg" className="modal-close" onClick={handleClose} />
            <button className="google-login" onClick={() => handleClickLogin('google')}>
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
