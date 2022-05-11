import ConjunctionsTable from '@app.components/conjunctions/ConjunctionsTable'
import AssessmentModal from '@app.components/launchConjunctions/AssessmentModal'
import SignInModal from '@app.components/signIn/SignInModal'
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
      <ConjunctionsTable />
      <AssessmentModal />
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
