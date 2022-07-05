import styled from 'styled-components'

type MainTitleProps = {
  color?: string
  fontSize?: number
  marginBottom?: number
}

export const MainTitle = styled.h1<MainTitleProps>`
  color: ${({color}) => (color ?? 'white')};
  font-size: ${({fontSize}) => ( fontSize ? `${fontSize}px` : '20px')};
  margin-bottom: ${({marginBottom}) => ( marginBottom ? `${marginBottom}px` : '15px')};
`

type SubTitleProps = {
  color?: string
  fontSize?: number
  marginBottom?: number
}

export const SubTitle = styled.h1<SubTitleProps>`
  color: ${({color}) => (color ?? 'white')};
  font-size: ${({fontSize}) => ( fontSize ? `${fontSize}px` : '16.5px')};
  margin-bottom: ${({marginBottom}) => ( marginBottom ? `${marginBottom}px` : '15px')};
`

export default { MainTitle }