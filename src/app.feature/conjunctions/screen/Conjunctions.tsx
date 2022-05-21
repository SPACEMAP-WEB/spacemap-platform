import React, { useEffect, useRef, useState } from 'react'
import { PPDBSearchParamsType, SortType } from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useModal } from '@app.modules/hooks/useModal'
import Search from '@app.components/common/Search'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import ConjuctionsFavorite from '../../favorite/screen/ConjuctionsFavorite'
import ConjuctionsTabs from '../component/ConjuctionsTabs'
import FilterSelect from '@app.components/common/FilterSelect'
import { FilterSelectType } from '@app.modules/types'
import ConjuctionsTable from '../component/ConjuctionsTable'
import { winodwHeightFn } from '@app.modules/util/windowHeightFn'

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

const Conjunctions = ({ cesiumModule }) => {
  const size = winodwHeightFn(window.innerHeight)
  const conjuctionsRef = useRef<HTMLDivElement>(null)
  const favoriteConjuctionsRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [searchValue, setSearchValue] = useState<string>('')
  const [toggle, setToggle] = useState(0)
  const [close, setClose] = useState(false)
  const [favoriteData, setFavoriteData] = useState<FilterSelectType[]>([])
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  const handleToggle = (index: number) => {
    setToggle(index)
    setQueryParams({ ...queryParams, page: 0, limit: 5 })
  }

  const handleSearch = async () => {
    setQueryParams({
      ...queryParams,
      page: 0,
      satellite: searchValue,
    })
  }

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams({
      ...queryParams,
      sort: e.target.value as SortType,
    })
  }

  const handleFavoriteIdChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    delete queryParams.satellite
    setQueryParams({
      ...queryParams,
      ...(id !== 'ALL' ? { satellite: e.target.value } : {}),
    })
  }

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) {
      console.log('not')
      return
    }

    console.log(tableContainerRef.current.style.visibility)

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '40rem'
    })`
  })

  useEffect(() => {
    conjuctionsRef.current.style.display = close ? 'none' : 'block'
    favoriteConjuctionsRef.current.style.display = close ? 'none' : 'block'
  }, [close])

  return (
    <>
      {isConjunctionsClicked && (
        <ConjunctionsWrapper ref={tableContainerRef}>
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : <div style={{ color: 'white' }}>+</div>}
          </button>
          <section className="conjuctions-wrapper" ref={conjuctionsRef}>
            <h1 className="title conjuctions">Conjuctions</h1>
            <div className="header-group">
              <Search
                handleSearch={handleSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <FilterSelect filterOptions={filterOptions} onChange={handleFilterChange} />
            </div>
            {toggle === 1 && (
              <div className="favorite-filter">
                <FilterSelect filterOptions={favoriteData} onChange={handleFavoriteIdChange} />
              </div>
            )}
            <ConjuctionsTabs toggle={toggle} onClick={handleToggle} login={login} />
            <ConjuctionsTable
              toggle={toggle}
              setFavoriteData={setFavoriteData}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              cesiumModule={cesiumModule}
              size={size}
            />
          </section>
          <section className="bookmark-wrapper" ref={favoriteConjuctionsRef}>
            <h1 className="title bookmark">Favorites</h1>
            <div className="bookmark-table-wrapper">
              <ConjuctionsFavorite login={login} />
            </div>
          </section>
        </ConjunctionsWrapper>
      )}
    </>
  )
}

export default Conjunctions

const ConjunctionsWrapper = styled.div`
  visibility: hidden;
  width: 740px;
  padding: 1rem 2rem;
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
  .title {
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .conjuctions-wrapper {
    /* width: 100%; */
  }
  .bookmark-wrapper {
    /* width: 100%; */
    display: flex;
    .bookmark-table-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .btn-close {
    position: absolute;
    right: 10px;
    top: 8px;
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
    margin-bottom: 10px;
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
