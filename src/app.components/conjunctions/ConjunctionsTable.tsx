import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable, usePagination } from 'react-table'
import {
  PPDBDataType,
  PPDBSearchParamsType,
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  PPDBTableColumnType,
} from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useQueryGetPPDB } from '@app.feature/conjunctions/query/useQueryPPDB'
import { useModal } from '@app.modules/hooks/useModal'
import Search from '@app.components/common/Search'
// import IndeterminateCheckbox from '@app.components/common/IndeterminateCheckbox'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import ConjuctionsFavorite from './ConjuctionsFavorite'
import ConjuctionsTabs from './ConjuctionsTabs'

const COLUMNS: Column<PPDBTableColumnType>[] = [
  {
    Header: 'Primary',
    accessor: 'primary',
  },
  {
    Header: 'Secondary',
    accessor: 'secondary',
  },
  {
    Header: 'DCA',
    accessor: 'dca',
  },
  {
    Header: 'TCA',
    accessor: 'tca',
  },
]

const ConjunctionsTable = () => {
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: 10,
    page: 1,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false)
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  const {
    data: fetchedPPDBData,
    isLoading,
    refetch,
  } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
  })

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    pageCount,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: isLoading ? 0 : fetchedPPDBData?.totalCount,
    },
    usePagination
  )

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '40rem'
    })`
  })

  const handlePage = (callback) => {
    callback()
    setQueryParams({ ...queryParams, page: pageIndex })
  }

  useEffect(() => {
    if (fetchedPPDBData) {
      const { result } = fetchedPPDBData
      const newData = result.map((item, index) => {
        const { _id, pid, sid, dca, tcaStartTime, tcaEndTime, tcaTime, probability } = item
        return {
          index,
          id: _id,
          primary: pid,
          secondary: sid,
          dca,
          start: tcaStartTime,
          tca: tcaTime,
          end: tcaEndTime,
          probability,
        }
      })
      setTableData(newData)
    }
  }, [fetchedPPDBData])

  useEffect(() => {
    setIsSearchClick(false)
  }, [queryParams])

  useEffect(() => {
    if (isSearchClick) {
      refetch()
    }
  }, [isSearchClick, refetch])

  const handleSearch = () => {
    setQueryParams({
      ...queryParams,
      satelite: searchValue,
    })
    setIsSearchClick(true)
  }

  return (
    <>
      {/* FIXME: change loading page into proper one */}
      {isLoading && <div>loading</div>}
      {data && (
        <ConjunctionsTableWrapper ref={tableContainerRef}>
          <Search
            handleSearch={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ConjuctionsTabs />
          <section className="table-wrapper">
            <Table {...getTableProps()} ref={tableRef}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              {!!tableData.length && (
                <>
                  <tbody {...getTableBodyProps()} style={{ overflowY: 'scroll' }}>
                    {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </>
              )}
            </Table>
            <div className="pagination">
              <button onClick={() => handlePage(() => gotoPage(0))} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              <button onClick={() => handlePage(() => previousPage())} disabled={!canPreviousPage}>
                {'<'}
              </button>{' '}
              <button onClick={() => handlePage(() => nextPage())} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              <button
                onClick={() => handlePage(() => gotoPage(pageCount - 1))}
                disabled={!canNextPage}
              >
                {'>>'}
              </button>{' '}
              <span className="pagination-count">
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <span>
                | Go to page:{' '}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                  }}
                  style={{ width: '100px' }}
                />
              </span>
            </div>
          </section>
          {true && <ConjuctionsFavorite />}
        </ConjunctionsTableWrapper>
      )}
    </>
  )
}

export default ConjunctionsTable

const ConjunctionsTableWrapper = styled.div`
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .table-wrapper {
  }
  .pagination {
    .pagination-count {
      color: white;
      font-weight: bold;
    }
  }
`
