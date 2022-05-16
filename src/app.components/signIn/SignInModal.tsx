import ModalWrapper from '@app.components/common/ModalWrapper'
import { useModal } from '@app.modules/hooks/useModal'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import styled from 'styled-components'

const SignInModal = () => {
  const router = useRouter()
  const { modalType, modalVisible, handleCloseModal } = useModal('LOGIN')
  const modalEl = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    handleCloseModal()
  }

  const handleClickLogin = (sns: string) => {
    router.push(`${process.env.SPACEMAP_PLATFORM_API_URI}/oauth/google`)
  }

  return (
    <>
      {modalType === 'LOGIN' && modalVisible && (
        <ModalWrapper visible={modalVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
          <Modal ref={modalEl}>
            <img src="/svg/close-black.svg" className="modal-close" onClick={handleClose} />
            <button className="google-login" onClick={() => handleClickLogin('google')}>
              <img src="/image/icon/ico-google.png" />
              <p>Sign In with Google</p>
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
