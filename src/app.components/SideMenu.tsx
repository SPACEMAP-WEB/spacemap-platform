import React from 'react'
import styled from 'styled-components'
import MenuIcon from './MenuIcon'
import { useSelector } from 'react-redux'
import { setModal } from 'src/app.store/modalStore/store.modalApp'
import { useModal } from '@app.modules/hooks/useModal'
import { requestCheckLogin } from 'src/app.store/loginStore/loginUser'
import { RootState, useAppDispatch } from 'src/app.store/config/configureStore'
import { unwrapResult } from '@reduxjs/toolkit'
import { modalTypeData } from '@app.modules/types/modal'

const conjunctionsPath = '/sideMenu/conjunction.svg'
const launchConjunctionPath = '/sideMenu/launch-conjunction.svg'

const SideMenu = () => {
  const dispatch = useAppDispatch()
  const { login } = useSelector((state: RootState) => state.login)
  const { modalVisible, modalType, handleCloseModal } = useModal(null)

  const checkModalVisible = (type) =>
    modalVisible && modalType === type ? handleCloseModal() : dispatch(setModal({ type }))

  const handleConjunctionClick = () => checkModalVisible(modalTypeData.CONJUNCTIONS)

  const handleLaunchConjunctionClick = () => {
    dispatch(requestCheckLogin())
      .then(unwrapResult)
      .then(() => login && checkModalVisible(modalTypeData.LAUNCHCONJUNCTIONS))
      .catch(() => checkModalVisible(modalTypeData.LAUNCHCONJUNCTIONS))
  }

  return (
    <SideMenuWrapper>
      <MenuIcon
        path={conjunctionsPath}
        alt={'conjunctions'}
        menuDescription={'Conjunctions'}
        onClick={handleConjunctionClick}
      />
      <MenuIcon
        path={launchConjunctionPath}
        alt={'launch-conjunctions'}
        width={35}
        height={35}
        menuDescription={'Launch Conjunctions'}
        onClick={handleLaunchConjunctionClick}
      />
    </SideMenuWrapper>
  )
}

export default SideMenu

const SideMenuWrapper = styled.div`
  position: fixed;
  top: 5.5rem;
  width: 3.2rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  border: 0.3px solid rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
`
