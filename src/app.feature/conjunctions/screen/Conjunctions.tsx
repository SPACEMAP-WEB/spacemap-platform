import React, { useEffect, useRef, useState } from 'react'
import { PPDBSearchParamsType, SortType } from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useModal } from '@app.modules/hooks/useModal'
import Search from '@app.components/common/Search'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import ConjunctionsFavorite from '../../favorite/screen/ConjunctionsFavorite'
import ConjunctionsTabs from '../component/ConjunctionsTabs'
import FilterSelect from '@app.components/common/FilterSelect'
import { FilterSelectType } from '@app.modules/types'
import ConjunctionsTable from '../component/ConjunctionsTable'
import { winodwHeightFn } from '@app.modules/util/windowHeightFn'
import { slideIn, slideOut } from '../module/keyFrames'

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
  const conjunctionsRef = useRef<HTMLDivElement>(null)
  const favoriteConjunctionsRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [conjunctionsVisible, setConjunctionsVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [toggle, setToggle] = useState(0)
  const [close, setClose] = useState(false)
  const [favoriteData, setFavoriteData] = useState<FilterSelectType[]>([])
  const { isVisible } = useModal('CONJUNCTIONS')
  const isConjunctionsClicked = isVisible

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

  const conjunctionsUnmount = () => {
    !isConjunctionsClicked && setConjunctionsVisible(false)
  }

  useEffect(() => {
    isConjunctionsClicked && setConjunctionsVisible(true)
  }, [isConjunctionsClicked])

  useEffect(() => {
    if (!conjunctionsRef.current || !favoriteConjunctionsRef.current) return

    conjunctionsRef.current.style.display = close ? 'none' : 'block'
    favoriteConjunctionsRef.current.style.display = close ? 'none' : 'block'
  }, [close, conjunctionsRef.current])

  return (
    <>
      {conjunctionsVisible && (
        <ConjunctionsWrapper
          onAnimationEnd={conjunctionsUnmount}
          isConjunctionsClicked={isConjunctionsClicked}
        >
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : <div style={{ color: 'white' }}>+</div>}
          </button>
          <section className="conjunctions-wrapper" ref={conjunctionsRef}>
            <h1 className="title conjunctions">Conjunctions</h1>
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
            <ConjunctionsTabs toggle={toggle} onClick={handleToggle} login={login} />
            <ConjunctionsTable
              toggle={toggle}
              setFavoriteData={setFavoriteData}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              cesiumModule={cesiumModule}
              size={size}
            />
          </section>
          <section className="bookmark-wrapper" ref={favoriteConjunctionsRef}>
            <h1 className="title bookmark">Favorites</h1>
            <div className="bookmark-table-wrapper">
              <ConjunctionsFavorite login={login} />
            </div>
          </section>
        </ConjunctionsWrapper>
      )}
    </>
  )
}

export default Conjunctions

type TConjunctions = {
  isConjunctionsClicked: boolean
}

const ConjunctionsWrapper = styled.div<TConjunctions>`
  width: 500px;
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
  animation: ${(props) => (props.isConjunctionsClicked ? slideIn : slideOut)} 1s;
  .title {
    color: white;
    font-size: 20px;
    margin-bottom: 15px;
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
