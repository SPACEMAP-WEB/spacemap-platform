import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable, usePagination } from 'react-table'
import {
  PPDBDataType,
  PPDBSearchParamsType,
  PPDBTableColumnType,
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
    Header: 'Index',
    accessor: 'index',
    enableRowSpan: true,
  },
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
    page: 1,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [searchValue, setSearchValue] = useState<string>('')
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [customPageSize, setCustomPageSize] = useState(10)
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  const {
    data: fetchedPPDBData,
    isLoading,
    isSuccess,
    refetch,
  } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
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
    pageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: isLoading ? 0 : fetchedPPDBData?.totalCount / customPageSize - 1,
    },
    usePagination,
    (hooks) => {
      hooks.useInstance.push(useInstance)
    }
  )

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '40rem'
    })`
  })

  useEffect(() => {
    if (fetchedPPDBData) {
      const newData = ppdbDataRefactor(fetchedPPDBData.result)
      setTableData(newData)
    }
  }, [fetchedPPDBData])

  const handlePage = (callback) => {
    callback()
    setQueryParams({ ...queryParams, page: pageIndex })
  }

  const handleSearch = () => {
    setQueryParams({
      ...queryParams,
      satelite: searchValue,
    })
  }

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams({
      ...queryParams,
      sort: e.target.value as SortType,
    })
    await refetch()
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
        <ConjunctionsTableWrapper ref={tableContainerRef}>
          <Search
            handleSearch={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <FilterSelect filterOptions={filterOptions} onChange={handleFilterChange} />
          <ConjuctionsTabs />
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
          {login && <ConjuctionsFavorite />}
        </ConjunctionsTableWrapper>
      )}
      )
    </>
  )
}

export default ConjunctionsTable

const ConjunctionsTableWrapper = styled.div`
  width: 500px;
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .table-wrapper {
    .table {
      font-size: 12px;
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
