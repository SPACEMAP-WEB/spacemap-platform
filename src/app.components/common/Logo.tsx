import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Logo = () => {
  return (
    <LogoWrapper>
      <Image src="/logo-white.svg" alt="logo" width={250} height={40} />
    </LogoWrapper>
  )
}

export default Logo

const LogoWrapper = styled.div`
  position: fixed;
`
