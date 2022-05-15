import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable, usePagination } from 'react-table'
import {
  FavoriteResponseType,
  PPDBDataType,
  PPDBSearchParamsType,
  PPDBTableColumnType,
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  SortType,
} from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useQueryGetPPDB } from '@app.feature/conjunctions/query/useQueryPPDB'
import { useModal } from '@app.modules/hooks/useModal'
import Search from '@app.components/common/Search'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import ConjuctionsFavorite from './ConjuctionsFavorite'
import ConjuctionsTabs from './ConjuctionsTabs'
import { ppdbDataRefactor } from '@app.feature/conjunctions/module/ppdbDataRefactor'
import ConjunctionsPagination from './ConjunctionsPagination'
import FilterSelect from '@app.components/common/FilterSelect'
import { FilterSelectType } from '@app.modules/types'
import { API_FAVORITE } from '@app.modules/keyFactory'
import api from '@app.modules/api'

const borderStyle = {
  border: '1px solid gray',
}

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

const COLUMNS: Column<PPDBTableColumnType>[] = [
  {
    Header: 'Primary',
    accessor: (row) => {
      return Object.values(row.primary)
    },
  },
  {
    Header: 'Secondary',
    accessor: (row) => {
      return Object.values(row.secondary)
    },
  },
  {
    Header: 'TCA/DCA',
    accessor: (row) => {
      return Object.values(row['tca/dca'])
    },
  },
]

const ConjunctionsTable = () => {
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: 5,
    page: 0,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [searchValue, setSearchValue] = useState<string>('')
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [customPageSize, setCustomPageSize] = useState(5)
  const [toggle, setToggle] = useState(0)
  const [close, setClose] = useState(false)
  const [favoriteData, setFavoriteData] = useState<{ label: string; value: string }[]>([])
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  const {
    data: fetchedPPDBData,
    isLoading,
    isSuccess,
  } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
    toggle,
  })

  function useInstance(instance) {
    const { allColumns } = instance

    let rowSpanHeaders = []

    allColumns.forEach((column, i) => {
      const { id, enableRowSpan } = column

      if (enableRowSpan !== undefined) {
        rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }]
      }
    })

    Object.assign(instance, { rowSpanHeaders })
  }

  const requestFavoriteData = async () => {
    const res = await api.GET<null, FavoriteResponseType>(API_FAVORITE)
    setFavoriteData([
      { label: 'ALL', value: 'ALL' },
      ...res.data.data.satellitesIds.map((id) => ({ label: String(id), value: String(id) })),
    ])
  }

  useEffect(() => {
    toggle && requestFavoriteData()
  }, [toggle])

  useEffect(() => {
    if (fetchedPPDBData) {
      const newData = ppdbDataRefactor(fetchedPPDBData.result)
      setTableData(newData)
    }
  }, [fetchedPPDBData])

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
    rowSpanHeaders,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: Math.ceil(fetchedPPDBData?.totalCount / customPageSize),
    },
    usePagination,
    (hooks) => {
      hooks.useInstance.push(useInstance)
    }
  )

  useEffect(() => {
    setQueryParams({ ...queryParams, page: pageIndex })
  }, [pageIndex])

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '40rem'
    })`
  })

  const handleToggle = (index: number) => {
    setToggle(index)
    setQueryParams({ ...queryParams, page: 0, limit: 5 })
  }

  const handlePage = async (callback) => {
    callback()
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
    setQueryParams({
      ...queryParams,
      id: e.target.value,
    })
  }

  const paginationProps = {
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    handlePage,
    setPageSize,
    pageSize,
    setCustomPageSize,
    setQueryParams,
    queryParams,
  }

  if (isLoading) return <div>Loading</div>

  return (
    <>
      {/* FIXME: change loading page into proper one */}
      {isSuccess && (
        <ConjunctionsWrapper ref={tableContainerRef}>
          <button className="btn-close" onClick={() => setClose(!close)}>
            {!close ? <div className="close" /> : '+'}
          </button>
          {!close && (
            <>
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
              <ConjuctionsTabs toggle={toggle} onClick={handleToggle} />
              <section className="table-wrapper">
                <Table className="table" {...getTableProps()} ref={tableRef}>
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
                        {page.map((row, i) => {
                          prepareRow(row)
                          for (let j = 0; j < row.allCells.length; j++) {
                            let cell = row.allCells[j]
                            let rowSpanHeader = rowSpanHeaders.find((x) => x.id === cell.column.id)

                            if (rowSpanHeader !== undefined) {
                              if (i % 2 !== 1) {
                                cell.rowSpan = 2
                                cell.isRowSpanned = false
                              } else {
                                cell.isRowSpan = 1
                                cell.isRowSpanned = true
                              }
                            }
                          }
                          return null
                        })}
                        {page.map((row) => {
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                if (cell.isRowSpanned) return null
                                else {
                                  return (
                                    <td
                                      rowSpan={cell.rowSpan}
                                      {...cell.getCellProps()}
                                      style={borderStyle}
                                    >
                                      {cell.render('Cell')}
                                    </td>
                                  )
                                }
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </>
                  )}
                </Table>
                <ConjunctionsPagination {...paginationProps} />
              </section>
            </>
          )}
          {login && <ConjuctionsFavorite />}
        </ConjunctionsWrapper>
      )}
    </>
  )
}

export default ConjunctionsTable

const ConjunctionsWrapper = styled.div`
  width: 450px;
  padding: 1rem 0;
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
  .btn-close {
    position: absolute;
    right: 10px;
    top: 23px;
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
    top: 65px;
    right: 20px;
  }

  .sort-container {
    width: 80%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .table-wrapper {
    width: 400px;
    border-radius: 10px;
    .table {
      font-size: 11px;
    }
    @media screen and (min-width: 1920px) {
      .table {
        font-size: 13px;
      }
    }
    .pagination {
      margin-top: 10px;
      .pagination-count {
        color: white;
        font-weight: bold;
      }
    }
  }
`
