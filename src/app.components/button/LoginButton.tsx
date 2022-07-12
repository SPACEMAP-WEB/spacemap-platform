import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'src/app.store/config/configureStore'
import { requestCheckLogin, requestLogout } from 'src/app.store/loginStore/loginUser'
import { setModal } from 'src/app.store/modalStore/store.modalApp'
import styled from 'styled-components'
import { PrimaryButton } from './Button'

const Button = () => {
  const dispatch = useAppDispatch()
  const { user, login } = useSelector((state: RootState) => state.login)

  const handleSnsLogin = () => {
    login
      ? dispatch(requestLogout())
          .then(unwrapResult)
          .then(() => dispatch(requestCheckLogin()))
      : dispatch(setModal({ type: 'LOGIN' }))
  }

  return (
    <ButtonWrapper>
      {login && <div className="login-user">{`${user.nickname}`}</div>}
      <PrimaryButton borderWeight={1} className="login-button" onClick={handleSnsLogin}>
        {login ? 'Sign Out' : 'Sign In'}
      </PrimaryButton>
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
    @media screen and (min-width: 1920px) {
      width: 150px;
    }
  }
`
