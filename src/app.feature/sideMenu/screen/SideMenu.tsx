import React from 'react'
import styled from 'styled-components'
import MenuIcon from '../components/MenuIcon'
import useMenuClick from '../hooks/useMenuClick'

const conjunctionsPath = '/sideMenu/conjunction.svg'
const launchConjunctionPath = '/sideMenu/launch-conjunction.svg'
const watcherCatcherPath = '/sideMenu/watcher-catcher.svg'
const FavoritePath = '/sideMenu/favorites.svg'

const SideMenu = () => {
  const { handleLoginMenuClick, handleMenuClick } = useMenuClick()

  return (
    <SideMenuWrapper>
      <MenuIcon
        path={conjunctionsPath}
        alt={'conjunctions'}
        menuDescription={'Conjunctions'}
        onClick={() => handleMenuClick('CONJUNCTIONS')}
      />
      <MenuIcon
        path={launchConjunctionPath}
        alt={'launch-conjunctions'}
        width={35}
        height={35}
        menuDescription={'Launch Conjunctions'}
        onClick={() => handleLoginMenuClick('LAUNCHCONJUNCTIONS')}
      />
      <MenuIcon
        path={watcherCatcherPath}
        alt={'watcher-catcher'}
        menuDescription={'Watcher Catcher'}
        onClick={() => handleLoginMenuClick('WATCHERCATCHER')}
      />
      <MenuIcon
        path={FavoritePath}
        alt={'favorite'}
        menuDescription={'Favorites'}
        onClick={() => handleLoginMenuClick('FAVORITES')}
      />
    </SideMenuWrapper>
  )
}

export default SideMenu

const SideMenuWrapper = styled.div`
  position: fixed;
  top: 5.5rem;
  width: 3.2rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  border: 0.3px solid rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  @media screen and (min-width: 1920px) {
    width: 3.8rem;
  }
`
