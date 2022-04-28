import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Main = () => {
  const router = useRouter()
  const onClick = async () => {
    router.push('http://localhost:4034/oauth/google')
  }
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        google
      </button>
    </StyledWrapper>
  )
}

export default Main

const StyledWrapper = styled.div`
  .button {
    border: 3px solid black;
    cursor: pointer;
  }
`
