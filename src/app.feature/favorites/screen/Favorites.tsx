import FilterSelect from '@app.components/FilterSelect'
import Search from '@app.components/Search'
import { slideIn, slideOut } from 'src/app.styled/keyFrames'
import { PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'
import { useModal } from '@app.modules/hooks/useModal'
import { FilterSelectType } from '@app.modules/types'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import FavoriteSubscription from '../component/FavoritesSubscription'
import FavoritesTable from '../component/FavoritesTable'
import { MainTitle, SubTitle } from '@app.components/title/Title'
import WarningModal from '@app.components/modal/WarningModal'
import useFavoritesEventHandler from '../hooks/useFavoritesEventHandler'

const filterOptions: FilterSelectType[] = [
  {
    label: 'tca',
    value: 'tcaTime',
  },
  {
    label: 'dca',
    value: 'dca',
  },
]

const Favorites = () => {
  const size = responsiveCellSizeHandler(window.innerHeight)
  const conjunctionsRef = useRef<HTMLDivElement>(null)
  const favoriteConjunctionsRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [close, setClose] = useState(false)
  const [favoriteData, setFavoriteData] = useState<FilterSelectType[]>([])
  const { isVisible, handleCloseModal } = useModal('FAVORITES')
  const {
    searchValue,
    handleFavoriteSearch,
    handleSearchValueChange,
    handleSortFilterChange,
    handleFavoriteIdChange,
  } = useFavoritesEventHandler({ queryParams, setQueryParams })

  useEffect(() => {
    if (!conjunctionsRef.current || !favoriteConjunctionsRef.current) return

    conjunctionsRef.current.style.display = close ? 'none' : 'block'
    favoriteConjunctionsRef.current.style.display = close ? 'none' : 'block'
  }, [close, conjunctionsRef.current])

  return (
    <>
      {!login && isVisible && (
        <WarningModal
          handleRequestModalCancel={handleCloseModal}
          message={'Login first to use our service'}
        />
      )}
      {login && isVisible && (
        <FavoritesWrapper isConjunctionsClicked={isVisible}>
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : <div style={{ color: 'white' }}>+</div>}
          </button>
          <section className="favorites-ppdb-container" ref={conjunctionsRef}>
            <MainTitle>Favorites</MainTitle>
            <div className="header-group">
              <Search
                handleSearch={handleFavoriteSearch}
                searchValue={searchValue}
                handleValueChange={handleSearchValueChange}
              />
              <FilterSelect filterOptions={filterOptions} onChange={handleSortFilterChange} />
            </div>
            <div className="favorite-filter">
              <FilterSelect filterOptions={favoriteData} onChange={handleFavoriteIdChange} />
            </div>
            <FavoritesTable
              setFavoriteData={setFavoriteData}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              size={size}
            />
          </section>

          <section className="bookmark-wrapper" ref={favoriteConjunctionsRef}>
            <SubTitle>Subscribe New Satellites!</SubTitle>
            <div className="bookmark-table-wrapper">
              <FavoriteSubscription login={login} />
            </div>
          </section>
        </FavoritesWrapper>
      )}
    </>
  )
}

export default Favorites

type TConjunctions = {
  isConjunctionsClicked: boolean
}

const FavoritesWrapper = styled.div<TConjunctions>`
  width: 500px;
  padding: 1.5rem 2rem;
  background-color: rgba(84, 84, 84, 0.4);
  border-radius: 15px;
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${(props) => (props.isConjunctionsClicked ? slideIn : slideOut)} 1s;
  .favorites-ppdb-container {
    margin-bottom: 20px;
  }
  .bookmark-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
  }
  .btn-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    height: 18px;
    background-color: rgba(149, 149, 149, 0.4);
    border-radius: 3px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    .close {
      width: 8px;
      border-top: 3px solid white;
    }
  }
  .header-group {
    display: flex;
    margin-bottom: 15px;
  }

  .favorite-filter {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .sort-container {
    width: 80%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`
