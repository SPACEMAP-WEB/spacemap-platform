import ModalWrapper from '@app.components/common/ModalWrapper'
import { useModal } from '@app.modules/hooks/useModal'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import styled from 'styled-components'

const SignInModal = () => {
  const router = useRouter()
  const { isVisible, handleCloseModal } = useModal('LOGIN')
  const modalEl = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    handleCloseModal()
  }

  const handleClickLogin = (sns: string) => {
    router.push(`${process.env.SPACEMAP_PLATFORM_API_URI}/oauth/google`)
  }

  return (
    <>
      {isVisible && (
        <ModalWrapper visible={isVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
          <Modal ref={modalEl}>
            <img src="/svg/close-white.svg" className="modal-close" onClick={handleClose} />
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
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
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
    background-color: rgba(255, 255, 255, 0.13);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #c9c9c9;
    :hover {
      background-color: rgba(255, 255, 255, 0.18);
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
    p {
      font-size: 18px;
      padding-right: 5px;
    }
  }
`
