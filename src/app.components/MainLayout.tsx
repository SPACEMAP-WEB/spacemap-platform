import SignInModal from '@app.components/modal/SignInModal'
import Conjunctions from '@app.feature/conjunctions/screen/Conjunctions'
import LaunchConjunctions from '@app.feature/launchConjunctions/screen/LaunchConjunctions'
import WatcherCatcher from '@app.feature/watcherCatcher/screen/WatcherCatcher'
import React from 'react'
import styled from 'styled-components'
import LoginButton from './button/LoginButton'

import Logo from './Logo'
import SideMenu from '../app.feature/sideMenu/screen/SideMenu'
import Favorites from '@app.feature/favorites/screen/Favorites'

const MainLayout = ({ cesiumModule }) => {
  return (
    <MainLayoutWrapper>
      <Logo />
      <SideMenu />
      <LoginButton />
      <Conjunctions cesiumModule={cesiumModule} />
      <LaunchConjunctions cesiumModule={cesiumModule} />
      <WatcherCatcher cesiumModule={cesiumModule} />
      <Favorites cesiumModule={cesiumModule} />
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
