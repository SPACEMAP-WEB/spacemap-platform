import ConjunctionsTable from '@app.components/conjunctions/ConjunctionsTable'
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
    </MainLayoutWrapper>
  )
}

export default MainLayout

const MainLayoutWrapper = styled.div`
  padding: 1.25rem 1.25rem;
  position: fixed;
  z-index: 4;
`
