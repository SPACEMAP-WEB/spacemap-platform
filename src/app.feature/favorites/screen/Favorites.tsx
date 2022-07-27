import FilterSelect from '@app.components/FilterSelect'
import Search from '@app.components/Search'
import { slideIn, slideOut } from 'src/app.styled/keyFrames'
import { PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'
import { useModal } from '@app.modules/hooks/useModal'
import { FilterSelectType } from '@app.modules/types'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled, { css } from 'styled-components'
import FavoriteSubscription from '../component/FavoritesSubscription'
import FavoritesTable from '../component/FavoritesTable'
import { MainTitle, SubTitle } from '@app.components/title/Title'
import WarningModal from '@app.components/modal/WarningModal'
import useFavoritesEventHandler from '../hooks/useFavoritesEventHandler'
import { usePostMutationFavoriteMailService } from '../query/useMutationFavorite'
import ConfigBox, { ConfigBoxProps } from '@app.components/ConfigBox'
import tableHeightHandler, { SizeType } from '../module/tableHeightHandler'

const Favorites = () => {
  const size = responsiveCellSizeHandler(window.innerHeight)
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const scrollDetecterRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [close, setClose] = useState(false)
  const [favoriteData, setFavoriteData] = useState<FilterSelectType[]>([])
  const [isMailServiceSelected, setIsMailServiceSelected] = useState<boolean>(false)
  const { isVisible, handleCloseModal } = useModal('FAVORITES')
  const usePostFavoriteMailService = usePostMutationFavoriteMailService()
  const {
    inputRef,
    handleKeyPress,
    handleFavoriteSearch,
    handleSortFilterChange,
    handleFavoriteIdChange,
    handleTimeChange,
  } = useFavoritesEventHandler({ queryParams, setQueryParams })

  const scrollTrack = () => {
    if (!scrollWrapperRef.current || !scrollDetecterRef.current) return

    const scrollWrapper = scrollWrapperRef.current
    const scrollDetecter = scrollDetecterRef.current
    const { scrollTop, scrollHeight, clientHeight } = scrollWrapper
    const isScrollOnTheBottom = scrollTop + clientHeight === scrollHeight
    scrollDetecter.style.visibility = isScrollOnTheBottom ? 'hidden' : 'visible'
  }

  const handleMailService = () => {
    usePostFavoriteMailService.mutate(!isMailServiceSelected)
    setIsMailServiceSelected(!isMailServiceSelected)
  }

  const sortList: ConfigBoxProps[] = [
    {
      title: 'Time Format',
      name: 'time',
      handleChange: handleTimeChange,
      itemValue: [
        {
          label: 'UTC',
          value: 'UTC',
        },
        {
          label: 'Local',
          value: 'LOCAL',
        },
        {
          label: 'Remaining',
          value: 'REMAINING',
        },
      ],
    },
    {
      title: 'Sort By',
      name: 'sort',
      handleChange: handleSortFilterChange,
      itemValue: [
        {
          label: 'TCA',
          value: 'tcaTime',
        },
        {
          label: 'DCA',
          value: 'dca',
        },
      ],
    },
  ]

  return (
    <>
      {!login && isVisible && (
        <WarningModal
          handleRequestModalCancel={handleCloseModal}
          message={'Login first to use our service'}
        />
      )}
      {login && isVisible && (
        <FavoritesWrapper close={close} size={size} isConjunctionsClicked={isVisible}>
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : <div style={{ color: 'white' }}>+</div>}
          </button>
          <div className="ppdb-container">
            <section className="favorites-ppdb-container">
              <MainTitle>Favorites</MainTitle>
              <div className="header-group">
                <Search
                  handleSearch={handleFavoriteSearch}
                  inputRef={inputRef}
                  handleKeyPress={handleKeyPress}
                />
              </div>
              <div className="favorite-filter">
                <FilterSelect filterOptions={favoriteData} onChange={handleFavoriteIdChange} />
              </div>

              <ConfigBox sortList={sortList} />
            </section>

            <div className="scroll-wrapper" onScroll={scrollTrack} ref={scrollWrapperRef}>
              <FavoritesTable
                setFavoriteData={setFavoriteData}
                setIsMailServiceSelected={setIsMailServiceSelected}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                size={size}
              />
              <section className="bookmark-wrapper">
                <SubTitle>Subscribe New Assets!</SubTitle>
                <div className="bookmark-table-wrapper">
                  <FavoriteSubscription login={login} />
                </div>
              </section>
              <div className="scroll-detecter" ref={scrollDetecterRef} />
            </div>

            <div className="mail-service-wrapper">
              <input type="checkbox" checked={isMailServiceSelected} onChange={handleMailService} />
              <p>Receive mail about your favorite assets?</p>
            </div>
          </div>
        </FavoritesWrapper>
      )}
    </>
  )
}

export default Favorites

type FavoriteStyleProps = {
  isConjunctionsClicked: boolean
  size: number
  close: boolean
}

const FavoritesWrapper = styled.div<FavoriteStyleProps>`
  ${({ close, size, isConjunctionsClicked }) => css`
    width: ${close ? '50px' : '500px'};
    padding: 1.5rem 2rem;
    background-color: rgba(84, 84, 84, 0.4);
    border-radius: 15px;
    position: fixed;
    z-index: 4;
    right: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    animation: ${isConjunctionsClicked ? slideIn : slideOut} 1s;
    .ppdb-container {
      display: ${close ? 'none' : 'block'};
    }
    .favorites-ppdb-container {
      width: 100%;
      margin-bottom: 20px;
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
      width: 100%;
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

    .scroll-wrapper {
      height: ${tableHeightHandler(size as SizeType)};
      overflow-y: scroll;
      position: relative;
      ::-webkit-scrollbar {
        width: 12px;
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border: 3px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        background-color: #8d8d8d77;
        border-radius: 50px;
      }
      .bookmark-wrapper {
        width: 100%;
        display: ${close ? 'none' : 'flex'};
        flex-direction: column;
        justify-content: left;
        margin-top: 1rem;
      }
      .scroll-detecter {
        position: sticky;
        bottom: 0;
        z-index: 5;
        background: linear-gradient(to bottom, rgba(84, 84, 84, 0), rgba(73, 73, 73, 0.8));
        width: 100%;
        height: 32px;
      }
    }

    .mail-service-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 1rem;
      p {
        color: #e7e7e7;
        font-size: 0.95rem;
        font-weight: 300;
      }
    }
  `}
`
