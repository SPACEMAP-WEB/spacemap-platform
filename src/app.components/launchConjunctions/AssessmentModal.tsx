import React from 'react'
import { useMenuContext } from 'src/hooks/useMenuContext'
import styled from 'styled-components'

const AssessmentModal = () => {
  const { state } = useMenuContext()
  const { isLaunchConjunctionsClicked } = state
  return (
    <>
      {isLaunchConjunctionsClicked && (
        <ModalWrapper>
          <div className="modal-content-container"></div>
        </ModalWrapper>
      )}
    </>
  )
}

export default AssessmentModal

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
    width: 55rem;
    height: 45rem;
    border-radius: 0.5rem;
  }
`
