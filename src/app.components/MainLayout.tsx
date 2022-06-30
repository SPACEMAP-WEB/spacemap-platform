import SignInModal from '@app.components/modal/SignInModal'
import Conjunctions from '@app.feature/conjunctions/screen/Conjunctions'
import LaunchConjunctions from '@app.feature/launchConjunctions/screen/LaunchConjunctions'
import WatcherCatcher from '@app.feature/watcherCatcher/screen/WatcherCatcher'
import React from 'react'
import styled from 'styled-components'
import Button from './button/Button'
import Logo from './Logo'
import SideMenu from './SideMenu'

const MainLayout = ({ cesiumModule }) => {
  console.log('MAIN')
  return (
    <MainLayoutWrapper>
      <Logo />
      <SideMenu />
      <Button />
      <Conjunctions cesiumModule={cesiumModule} />
      <LaunchConjunctions cesiumModule={cesiumModule} />
      <WatcherCatcher cesiumModule={cesiumModule} />
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
