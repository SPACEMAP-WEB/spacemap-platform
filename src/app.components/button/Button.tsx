import styled from 'styled-components'

type PrimaryButtonProps = {
  width?: number
  height?: number
  fontSize?: number
  isDisabled?: boolean
}

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  width: ${({ width }) => (width ? `${width}px` : '120px')};
  height: ${({ height }) => (height ? `${height}px` : '40px')};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '1rem')};
  cursor: pointer;
  background-color: rgba(124, 124, 124, 0.4);
  color: ${({ isDisabled }) => (isDisabled ? '#7a7a7a' : '#e2e2e2')};
  z-index: 4;
  border-radius: 10px;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${({ isDisabled }) => (isDisabled ? 'rgba(124, 124, 124, 0.4)' : '#fccb16')};
    color: #7a7a7a;
  }
`

type SecondaryButtonProps = {
  width?: number
  height?: number
  fontSize?: number
}

export const SecondaryButton = styled.button<SecondaryButtonProps>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '36px')};
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.13);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  :hover {
    background-color: rgba(255, 255, 255, 0.18);
  }
`
