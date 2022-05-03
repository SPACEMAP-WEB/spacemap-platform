import React from 'react'
import styled from 'styled-components'

const Button = () => {
  return (
    <ButtonWrapper>
      <button className="login-button">Sign In</button>
    </ButtonWrapper>
  )
}

export default Button

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border: 0.8px solid #fccb16;
  z-index: 4;
  border-top-left-radius: 1rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 0.3rem;
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: #fccb16;
  }
  .login-button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    color: white;
    font-size: 1rem;
  }
`
