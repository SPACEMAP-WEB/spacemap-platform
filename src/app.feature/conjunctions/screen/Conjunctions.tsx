import Search from '@app.components/Search'
import { PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'
import { useModal } from '@app.modules/hooks/useModal'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useConjunctionsEventHandler from '../hooks/useConjunctionsEventHandler'
import { slideIn, slideOut } from '../../../app.styled/keyFrames'
import ConfigBox, { ConfigBoxProps } from '@app.components/ConfigBox'
import ConjunctionsTable from '../component/ConjunctionsTable'

const Conjunctions = () => {
  const size = responsiveCellSizeHandler(window.innerHeight)
  const conjunctionsRef = useRef<HTMLDivElement>(null)
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: size,
    page: 0,
  })
  const [close, setClose] = useState(false)
  const { isVisible: isConjunctionsClicked } = useModal('CONJUNCTIONS')

  const {
    searchValue,
    handleFavoriteSearch,
    handleSearchValueChange,
    handleSortFilterChange,
    handleTimeChange,
  } = useConjunctionsEventHandler({ queryParams, setQueryParams })

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

  useEffect(() => {
    let abortController = new AbortController()
    if (!conjunctionsRef.current) return

    conjunctionsRef.current.style.display = close ? 'none' : 'block'
    return () => {
      abortController.abort()
    }
  }, [close, conjunctionsRef.current])

  return (
    <>
      {isConjunctionsClicked && (
        <ConjunctionsWrapper isConjunctionsClicked={isConjunctionsClicked}>
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : <div style={{ color: 'white' }}>+</div>}
          </button>
          <section className="conjunctions-wrapper" ref={conjunctionsRef}>
            <h1 className="title conjunctions">Conjunctions</h1>
            <div className="header-group">
              <Search
                handleSearch={handleFavoriteSearch}
                searchValue={searchValue}
                handleValueChange={handleSearchValueChange}
              />
            </div>
            <ConfigBox sortList={sortList} />
            <ConjunctionsTable
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              size={size}
            />
          </section>
        </ConjunctionsWrapper>
      )}
    </>
  )
}

export default Conjunctions

type ConjunctionsProps = {
  isConjunctionsClicked: boolean
}

const ConjunctionsWrapper = styled.div<ConjunctionsProps>`
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
