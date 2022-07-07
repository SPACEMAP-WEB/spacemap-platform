import { keyframes } from 'styled-components'

export const slideIn = keyframes`
  from {
    transform:translateX(100%);
  }
  to {
    transform:translateX(0%);
  }
`

export const slideOut = keyframes`
  from {
    transform:translateX(0%);
  }
  to {
    transform:translateX(110%);
  }
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`
