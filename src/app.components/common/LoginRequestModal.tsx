import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ModalWrapper from '@app.components/common/ModalWrapper'

type ModalProps = {
  handleRequestModalCancel: () => void
}

const LoginRequestModal = ({ handleRequestModalCancel }: ModalProps) => {
  return (
    <>
      <ModalWrapper>
        <Modal>
          <div className="modal-content-container">
            <img className="alert-sign" src="/svg/alert.svg" alt="alert" />
            <p>Login first to use our service</p>
            <button className="confirm-button" onClick={handleRequestModalCancel}>
              ok
            </button>
          </div>
        </Modal>
      </ModalWrapper>
    </>
  )
}

export default LoginRequestModal

const Modal = styled.div`
  position: relative;
  background-color: white;
  width: 24rem;
  height: 18rem;
  padding: 3rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  .modal-content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .alert-sign {
      width: 50px;
    }
    p {
      color: #c9c9c9;
      font-size: 20px;
    }
  }

  .confirm-button {
    width: 120px;
    height: 40px;
    font-size: 1rem;
    cursor: pointer;
    background-color: rgba(124, 124, 124, 0.4);
    color: #e2e2e2;
    z-index: 4;
    border-radius: 8px;
    transition: all 0.3s ease-in;
    :hover {
      background-color: rgba(255, 255, 255, 0.18);
    }
  }
`
