import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { requestLogout } from 'src/app.store/loginStore/loginUser'
import { setModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'

const Button = () => {
  const dispatch = useDispatch()
  const { user, login } = useSelector((state: RootState) => state.login)

  const handleSnsLogin = () => {
    login ? dispatch(requestLogout()) : dispatch(setModal({ type: 'LOGIN' }))
  }

  return (
    <ButtonWrapper>
      {login && <div className="login-user">{`${user.nickname}님`}</div>}
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
    background-color: rgba(124, 124, 124, 0.4);
    color: #e2e2e2;
    z-index: 4;
    border-radius: 10px;
    transition: all 0.3s ease-in;
    &:hover {
      background-color: #fccb16;
      color: #7a7a7a;
    }
  }
`
