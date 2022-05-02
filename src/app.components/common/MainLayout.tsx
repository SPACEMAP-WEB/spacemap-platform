import ConjunctionsTable from '@app.components/conjunctions/ConjunctionsTable'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import Button from './Button'
import Logo from './Logo'
import SideMenu from './SideMenu'

const MainLayout = () => {
  const { login } = useSelector((state: RootState) => state.login)

  return (
    <MainLayoutWrapper>
      <Logo />
      <SideMenu />
      <Button login={login} />
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
