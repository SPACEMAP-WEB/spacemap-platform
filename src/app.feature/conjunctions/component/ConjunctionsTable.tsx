import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { PPDBDataType, PPDBSearchParamsType } from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useQueryGetPPDB } from '@app.feature/conjunctions/query/useQueryPPDB'
import { useModal } from '@app.modules/hooks/useModal'
import { ppdbDataRefactor } from '@app.feature/conjunctions/module/ppdbDataRefactor'
import ConjunctionsPagination from './ConjunctionsPagination'
import { useInstance } from '../module/useInstance'
import { FilterSelectType } from '@app.modules/types'
import { useQueryFavorite } from '@app.feature/favorite/query/useQueryFavorite'
import { winodwHeightFn } from '@app.modules/util/windowHeightFn'
import { tableWidthStyle } from '../style/tableStyle'
import { COLUMNS } from './TableColumns'
import { useDebounce } from '@app.modules/hooks/useDebounce'

type TableProps = {
  toggle: number
  setFavoriteData: React.Dispatch<React.SetStateAction<FilterSelectType[]>>
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
  cesiumModule
  size: number
}

const ConjunctionsTable = ({
  toggle,
  setFavoriteData,
  queryParams,
  setQueryParams,
  cesiumModule,
  size,
}: TableProps) => {
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [customPageSize, setCustomPageSize] = useState(size)
  const { isVisible } = useModal('CONJUNCTIONS')
  const isConjunctionsClicked = isVisible
  const debounceFn = useDebounce(() => {
    const size = winodwHeightFn(window.innerHeight)
    setCustomPageSize(size)
    setPageSize(size)
    setQueryParams({ ...queryParams, limit: size })
  }, 800)

  const { data: fetchedPPDBData, isLoading } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
    toggle,
  })

  const { data: queryFavorite, isSuccess } = useQueryFavorite('')

  const columns = useMemo(
    () => COLUMNS({ queryParams, customPageSize, cesiumModule }),
    [queryParams]
  )
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
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<PPDBDataType>(
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

  useEffect(() => {
    window.addEventListener('resize', debounceFn)
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
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                console.log(row)
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          rowSpan={cell.column.id === 'Index' && index % 2 === 0 ? 2 : 1}
                          style={{
                            display: cell.column.id === 'Index' && index % 2 === 1 ? 'none' : null,
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
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

export default ConjunctionsTable

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
