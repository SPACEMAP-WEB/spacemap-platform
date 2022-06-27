import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { MenuType } from '@app.modules/types/sideMenu'

type MenuIconProps = {
  path: string
  alt: string
  width?: number
  height?: number
  menuDescription: MenuType
  onClick: React.MouseEventHandler<HTMLDivElement>
}

type IconWrapperStyleProps = {
  isMouseHover: boolean
}

const MenuIcon = ({ path, alt, width, height, menuDescription, onClick }: MenuIconProps) => {
  const [isMouseHover, setIsMouseHover] = useState<boolean>(false)

  const handleHover = () => {
    setIsMouseHover(true)
  }

  const handleLeave = () => {
    setIsMouseHover(false)
  }

  return (
    <IconWrapper isMouseHover={isMouseHover}>
      <div
        role="button"
        className="menu-icon-wrapper"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        <Image src={path} alt={alt} width={width ?? 30} height={height ?? 30} />
      </div>
      {isMouseHover && (
        <div className="menu-description-wrapper">
          <p className="menu-description-text">{menuDescription}</p>
        </div>
      )}
    </IconWrapper>
  )
}

export default MenuIcon

const IconWrapper = styled.div<IconWrapperStyleProps>`
  display: flex;
  position: relative;
  .menu-icon-wrapper {
    cursor: pointer;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ isMouseHover }) =>
      isMouseHover
        ? `
        width: 3rem;
        height: 3rem;
        background-color: rgba(252, 203, 22, 0.5);
        border-radius: 50px;
        transition: background-color 0.5s ease;
        
        `
        : null}
  }
  .menu-description-wrapper {
    height: 3rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 4.5rem;
    .menu-description-text {
      color: white;
    }
  }
`
