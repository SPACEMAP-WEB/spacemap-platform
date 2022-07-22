import SignInModal from '@app.components/modal/SignInModal'
import Conjunctions from '@app.feature/conjunctions/screen/Conjunctions'
import LaunchConjunctions from '@app.feature/launchConjunctions/screen/LaunchConjunctions'
import WatcherCatcher from '@app.feature/watcherCatcher/screen/WatcherCatcher'
import React from 'react'
import styled from 'styled-components'
import LoginButton from '../../app.components/button/LoginButton'

import Logo from '../../app.components/Logo'
import SideMenu from '../../app.feature/sideMenu/screen/SideMenu'
import Favorites from '@app.feature/favorites/screen/Favorites'

const MainLayout = () => {
  return (
    <MainLayoutWrapper>
      <Logo />
      <SideMenu />
      <LoginButton />
      <Conjunctions />
      <LaunchConjunctions />
      <WatcherCatcher />
      <Favorites />
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
