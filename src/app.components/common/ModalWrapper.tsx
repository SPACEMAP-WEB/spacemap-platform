import React, { MouseEvent } from 'react'
import styled from 'styled-components'

type TProps = {
  children: JSX.Element
  visible: boolean
  modalEl: React.MutableRefObject<HTMLDivElement>
  handleCloseModal: () => void
}

const ModalWrapper = ({ children, visible, modalEl, handleCloseModal }: TProps) => {
  const handleCloseExternalClickModal = (event: MouseEvent<HTMLElement>) => {
    if (visible && !modalEl?.current?.contains(event.target as Node)) handleCloseModal()
  }

  return <StyledWrapper onClick={handleCloseExternalClickModal}>{children}</StyledWrapper>
}

export default ModalWrapper

const StyledWrapper = styled.div`
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
`
