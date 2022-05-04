import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const handleBlur = () => {
    dispatch(closeModal())
  }
  return <StyledWrapper onClick={handleBlur}>{children}</StyledWrapper>
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
