import FilterSelect from '@app.components/FilterSelect'
import Search from '@app.components/Search'
import { PPDBSearchParamsType, SortType } from '@app.feature/conjunctions/types/conjunctions'
import { useModal } from '@app.modules/hooks/useModal'
import { FilterSelectType } from '@app.modules/types'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ConjunctionsTable from '../component/ConjunctionsTable'
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
  const size = responsiveCellSizeHandler(window.innerHeight)
  const conjunctionsRef = useRef<HTMLDivElement>(null)
  const favoriteConjunctionsRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const [conjunctionsVisible, setConjunctionsVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [close, setClose] = useState(false)
  const { isVisible: isConjunctionsClicked } = useModal('CONJUNCTIONS')

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
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
                handleValueChange={handleSearchValueChange}
              />
              <FilterSelect filterOptions={filterOptions} onChange={handleFilterChange} />
            </div>
            <ConjunctionsTable
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              cesiumModule={cesiumModule}
              size={size}
            />
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
