import LaunchConjunctions from '@app.feature/launchConjunctions'
import SignInModal from '@app.components/signIn/SignInModal'
import Conjunctions from '@app.feature/conjunctions/screen/Conjunctions'
import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from './Logo'
import SideMenu from './SideMenu'

const MainLayout = () => {
  return (
    <MainLayoutWrapper>
      <Logo />
      <SideMenu />
      <Button />
      <Conjunctions />
      <LaunchConjunctions />
      <SignInModal />
    </MainLayoutWrapper>
  )
}

export default MainLayout

const MainLayoutWrapper = styled.div`
  padding: 1.25rem 1.25rem;
  position: fixed;
  z-index: 4;
`
