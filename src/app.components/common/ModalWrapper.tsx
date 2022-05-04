import React from 'react'
import styled from 'styled-components'

const ModalWrapper = ({ children, onClick }) => {
  return <StyledWrapper onClick={onClick}>{children}</StyledWrapper>
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
