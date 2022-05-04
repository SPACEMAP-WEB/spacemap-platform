import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { setModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const SignInModal = () => {
  const { visible } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setModal())
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    console.log('blur')
  }

  return (
    <>
      {visible && (
        <ModalWrapper onBlur={handleBlur}>
          <div className="modal-content-container">
            <img src="/svg/close-black.svg" className="modal-close" onClick={handleClose} />
            <button className="google-login">
              <img src="/image/icon/ico-google.png" />
              <span>SignIn with Google</span>
            </button>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}

export default SignInModal

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  & > .modal-content-container {
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
  }
`
