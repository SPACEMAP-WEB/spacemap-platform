import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useState } from 'react'
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
import { ppdbDataRefactor } from '@app.feature/conjunctions/module/ppdbDataRefactor'
import ConjunctionsPagination from './ConjunctionsPagination'
import { useInstance } from '../module/useInstance'
import { FilterSelectType } from '@app.modules/types'
import { useQueryFavorite } from '@app.feature/favorite/query/useQueryFavorite'
import { winodwHeightFn } from '@app.modules/util/windowHeightFn'

type TProps = {
  toggle: number
  setFavoriteData: React.Dispatch<React.SetStateAction<FilterSelectType[]>>
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
  cesiumModule
  size: number
}

const borderStyle = {
  border: '1px solid gray',
}

const ConjuctionsTable = ({
  toggle,
  setFavoriteData,
  queryParams,
  setQueryParams,
  cesiumModule,
  size,
}: TProps) => {
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [customPageSize, setCustomPageSize] = useState(size)
  const [timer, setTimer] = useState(null)
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  const { data: fetchedPPDBData, isLoading } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
    toggle,
  })

  const { data: queryFavorite, isSuccess } = useQueryFavorite('')

  const COLUMNS: Column<PPDBTableColumnType>[] = [
    {
      Header: 'Index',
      accessor: (row) => {
        const page = queryParams.page
        return row.index + page * customPageSize
      },
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
    {
      Header: 'View',
      accessor: (row) => {
        return (
          <img
            style={{
              width: '15px',
              cursor: 'pointer',
            }}
            // onClick={handleVisibility(cesiumModule)}
            onClick={() => {
              cesiumModule.drawConjunctions(row.primary, row.secondary, row.start, row.tca, row.end)
            }}
            // onClick={() => console.log(row)}
            src={'/svg/open-eye.svg'}
            alt="View"
          />
        )
      },
      enableRowSpan: true,
    },
  ]

  const columns = useMemo(() => COLUMNS, [queryParams])
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
      initialState: { pageIndex: 0, pageSize: size },
      manualPagination: true,
      pageCount: Math.ceil(fetchedPPDBData?.totalCount / customPageSize),
    },
    usePagination,
    (hooks) => {
      hooks.useInstance.push(useInstance)
    }
  )

  const requestFavoriteData = async () => {
    if (isSuccess)
      setFavoriteData([
        { label: 'All', value: 'ALL' },
        ...queryFavorite?.interestedArray?.map((sat) => ({
          label: String(sat.id),
          value: String(sat.id),
        })),
      ])
  }

  useEffect(() => {
    setQueryParams({ ...queryParams, page: pageIndex })
  }, [pageIndex])

  useEffect(() => {
    toggle && requestFavoriteData()
  }, [toggle, queryFavorite])

  useEffect(() => {
    if (fetchedPPDBData) {
      const newData = ppdbDataRefactor(fetchedPPDBData.result)
      setTableData(newData)
    }
  }, [fetchedPPDBData])

  const handlePage = async (callback) => {
    callback()
  }

  const sizeFunction = () => {
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      const size = winodwHeightFn(window.innerHeight)
      setCustomPageSize(size)
      setPageSize(size)
      setQueryParams({ ...queryParams, limit: size })
    }, 800)
    setTimer(newTimer)
  }

  useEffect(() => {
    window.addEventListener('resize', sizeFunction)
  }, [])

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
    <StyledTable>
      <Table className="table" {...getTableProps()} css={tableWidthStyle}>
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
                          <td rowSpan={cell.rowSpan} {...cell.getCellProps()} style={borderStyle}>
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
    </StyledTable>
  )
}

export default ConjuctionsTable

const StyledTable = styled.div`
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
`

const tableWidthStyle = `
th:nth-of-type(1) { width: 50px; padding:10px}
th:nth-of-type(2) { width: 140px; }
th:nth-of-type(3) { width: 140px; }
th:nth-of-type(4) { width: 150px; }
th:nth-of-type(5) { width: 40px; padding:10px}
@media screen and (min-width: 1920px) {
  th:nth-of-type(1) { width: 60px; padding:10px}
  th:nth-of-type(2) { width: 280px; }
  th:nth-of-type(3) { width: 280px; }
  th:nth-of-type(4) { width: 160px; }
  th:nth-of-type(5) { width: 50px; padding:10px}
}
`
