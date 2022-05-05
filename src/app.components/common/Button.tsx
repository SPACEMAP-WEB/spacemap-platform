import React from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

type TProps = {
  login: boolean
}

const Button = ({ login }: TProps) => {
  const dispatch = useDispatch()

  const handleSnsLogin = () => {
    !login && dispatch(setModal())
  }

  return (
    <ButtonWrapper>
      {login && <div className="login-user">{`name님`}</div>}
      <button className="login-button" onClick={handleSnsLogin}>
        {login ? 'Sign Out' : 'Sign In'}
      </button>
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
  .login-user {
    font-size: 1rem;
    color: white;
    margin-right: 10px;
  }
  .login-button {
    width: 120px;
    height: 40px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(6px);
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
  }
`
