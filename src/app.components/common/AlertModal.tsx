import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type ModalProps = {
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ModalStyleProps = {
  isTimeFinished: boolean
}

const AlertModal = ({ setIsSuccessModalOpen }: ModalProps) => {
  const [isTimeFinished, setIsTimeFinished] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsTimeFinished(true)
      setIsSuccessModalOpen(false)
    }, 4000)
  }, [])

  return (
    <ModalWrapper isTimeFinished={isTimeFinished}>
      <div className="modal-container">
        <p className="alert-text">Your trajectory is being calculated in the server!</p>
        <p className="alert-text">Check the status in your table :)</p>
      </div>
    </ModalWrapper>
  )
}

export default AlertModal

const ModalWrapper = styled.div<ModalStyleProps>`
  position: fixed;
  right: ${(props) => (props.isTimeFinished ? '-50rem' : '1rem')};
  bottom: 3rem;
  z-index: 200;
  animation-duration: 1.5s;
  animation-name: ${(props) => (props.isTimeFinished ? 'slideout' : 'slidein')};
  .modal-container {
    width: 24rem;
    height: 6rem;
    padding: 1.2rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .alert-text {
    color: #c9c9c9;
  }

  @keyframes slidein {
    from {
      right: -50rem;
    }

    to {
      right: 1rem;
    }
  }

  @keyframes slideout {
    from {
      right: 1rem;
    }

    to {
      right: -50rem;
    }
  }
`
