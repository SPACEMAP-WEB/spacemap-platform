import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useAppDispatch } from 'src/app.store/config/configureStore'
import { drawRsos } from 'src/app.store/cesium/cesiumReducer'
import moment from 'moment'

const Logo = () => {
  const dispatch = useAppDispatch()
  const viewRsos = () => {
    const today = moment()
    dispatch(drawRsos({ initialTime: today }))
  }

  return (
    <LogoWrapper onClick={viewRsos} id="Logo">
      <Image src="/logo-white.svg" alt="logo" width={250} height={40} />
    </LogoWrapper>
  )
}

export default Logo

const LogoWrapper = styled.div`
  position: fixed;
  cursor: pointer;
`
